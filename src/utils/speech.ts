import { LanguageCode } from '../types/medication';

// Map our language keys to BCP-47 language tags for Web Speech API
const BCP47_LANG_MAP: Record<LanguageCode, string> = {
  english: 'en-US',
  hindi: 'hi-IN',
  tamil: 'ta-IN',
  telugu: 'te-IN',
  bengali: 'bn-IN',
  spanish: 'es-ES',
};

let currentAudio: HTMLAudioElement | null = null;

export async function speakAlert(
  text: string,
  language: LanguageCode = 'english',
  onStart?: () => void,
  onEnd?: () => void,
  onError?: (err: any) => void
): Promise<void> {
  // Stop any currently playing audio
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }

  onStart?.();

  try {
    // 1. Try Gemini 3.8 Flash Lite TTS via our server endpoint
    const response = await fetch('/api/generate-speech', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, language }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.success && data.audioBase64) {
        const audioSrc = `data:${data.mimeType || 'audio/wav'};base64,${data.audioBase64}`;
        const audio = new Audio(audioSrc);
        currentAudio = audio;

        audio.onended = () => {
          currentAudio = null;
          onEnd?.();
        };

        audio.onerror = (err) => {
          console.warn('Audio element error, falling back to Web Speech:', err);
          fallbackWebSpeech(text, language, onEnd, onError);
        };

        await audio.play();
        return;
      }
    }

    // 2. Fallback to Web Speech API
    fallbackWebSpeech(text, language, onEnd, onError);
  } catch (err) {
    console.warn('Server TTS failed, falling back to Web Speech API:', err);
    fallbackWebSpeech(text, language, onEnd, onError);
  }
}

function fallbackWebSpeech(
  text: string,
  language: LanguageCode,
  onEnd?: () => void,
  onError?: (err: any) => void
) {
  if (!('speechSynthesis' in window)) {
    console.warn('SpeechSynthesis not supported in this browser.');
    onEnd?.();
    return;
  }

  // Strip HTML tags if any
  const cleanText = text.replace(/<[^>]*>?/gm, '');
  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.lang = BCP47_LANG_MAP[language] || 'en-US';
  utterance.rate = 0.9; // Slightly slower and clearer for elderly patients
  utterance.pitch = 1.0;

  // Try to find a matching voice if voices are loaded
  const voices = window.speechSynthesis.getVoices();
  const targetPrefix = utterance.lang.split('-')[0];
  const matchedVoice = voices.find((v) => v.lang.startsWith(targetPrefix));
  if (matchedVoice) {
    utterance.voice = matchedVoice;
  }

  utterance.onend = () => {
    onEnd?.();
  };

  utterance.onerror = (e) => {
    console.warn('Web speech error:', e);
    onError?.(e);
    onEnd?.();
  };

  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
