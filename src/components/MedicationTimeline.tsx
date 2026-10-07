import React, { useState, useEffect } from 'react';
import {
  Clock,
  Sun,
  Sunrise,
  Sunset,
  Moon,
  Utensils,
  CheckCircle2,
  Circle,
  Volume2,
  VolumeX,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  ShieldAlert,
  Droplet,
  Info,
  CalendarCheck
} from 'lucide-react';
import { Medication, LanguageCode, Interaction } from '../types/medication';
import { speakAlert, stopSpeaking } from '../utils/speech';

interface MedicationTimelineProps {
  medications: Medication[];
  interactions: Interaction[];
  language: LanguageCode;
  fontSize: 'normal' | 'large' | 'xlarge';
  highContrast: boolean;
}

interface TimeSlotDef {
  id: 'morning' | 'afternoon' | 'evening' | 'bedtime';
  name: string;
  timeRange: string;
  icon: React.ReactNode;
  bgGrad: string;
  borderCol: string;
  activeAccent: string;
  defaultTime: string;
}

const TIME_SLOTS: TimeSlotDef[] = [
  {
    id: 'morning',
    name: 'Morning',
    timeRange: '7:00 AM – 9:00 AM',
    defaultTime: '08:00',
    icon: <Sunrise className="h-5 w-5 text-amber-500" />,
    bgGrad: 'bg-amber-50/60',
    borderCol: 'border-amber-200',
    activeAccent: 'text-amber-800',
  },
  {
    id: 'afternoon',
    name: 'Midday / Lunch',
    timeRange: '12:00 PM – 2:00 PM',
    defaultTime: '13:00',
    icon: <Sun className="h-5 w-5 text-orange-500" />,
    bgGrad: 'bg-orange-50/60',
    borderCol: 'border-orange-200',
    activeAccent: 'text-orange-800',
  },
  {
    id: 'evening',
    name: 'Dinner / PM',
    timeRange: '6:00 PM – 8:00 PM',
    defaultTime: '19:00',
    icon: <Sunset className="h-5 w-5 text-teal-600" />,
    bgGrad: 'bg-teal-50/60',
    borderCol: 'border-teal-200',
    activeAccent: 'text-teal-800',
  },
  {
    id: 'bedtime',
    name: 'Bedtime',
    timeRange: '9:30 PM – 11:00 PM',
    defaultTime: '22:00',
    icon: <Moon className="h-5 w-5 text-indigo-500" />,
    bgGrad: 'bg-indigo-50/60',
    borderCol: 'border-indigo-200',
    activeAccent: 'text-indigo-800',
  },
];

// Helper to provide visual pill characteristics to assist seniors with recognition
function getPillAppearance(genericName: string): { shape: string; color: string; colorName: string } {
  const g = genericName.toLowerCase();
  if (g.includes('warfarin')) return { shape: 'round', color: 'bg-pink-400 border-pink-500', colorName: 'Pink Round' };
  if (g.includes('aspirin')) return { shape: 'round-small', color: 'bg-yellow-200 border-yellow-400', colorName: 'Yellow Oval' };
  if (g.includes('metformin')) return { shape: 'oval-large', color: 'bg-white border-slate-300', colorName: 'White Oblong' };
  if (g.includes('amlodipine')) return { shape: 'octagon', color: 'bg-emerald-200 border-emerald-400', colorName: 'Light Green' };
  if (g.includes('lisinopril')) return { shape: 'oval', color: 'bg-amber-300 border-amber-500', colorName: 'Peach Round' };
  if (g.includes('spironolactone')) return { shape: 'round', color: 'bg-orange-300 border-orange-500', colorName: 'Tan Round' };
  if (g.includes('ibuprofen')) return { shape: 'capsule', color: 'bg-red-400 border-red-600', colorName: 'Brown/Red Capsule' };
  if (g.includes('atorvastatin')) return { shape: 'oval', color: 'bg-blue-100 border-blue-300', colorName: 'White Oval' };
  if (g.includes('clarithromycin')) return { shape: 'capsule', color: 'bg-amber-400 border-amber-600', colorName: 'Yellow Film' };
  if (g.includes('sertraline')) return { shape: 'oval', color: 'bg-sky-200 border-sky-400', colorName: 'Light Blue' };
  if (g.includes('tramadol')) return { shape: 'capsule', color: 'bg-purple-300 border-purple-500', colorName: 'Green/Yellow Cap' };
  if (g.includes('omeprazole')) return { shape: 'capsule', color: 'bg-rose-300 border-rose-500', colorName: 'Purple/Rose Cap' };
  return { shape: 'round', color: 'bg-teal-200 border-teal-400', colorName: 'Standard Tablet' };
}

// Special instructions based on pharmacokinetics
function getSlotInstructions(genericName: string, slot: string): string[] {
  const g = genericName.toLowerCase();
  const tips: string[] = [];

  if (g.includes('metformin')) {
    tips.push('Take with or immediately after food');
  } else if (g.includes('aspirin')) {
    tips.push('Take with meals to protect stomach lining');
  } else if (g.includes('warfarin')) {
    tips.push('Take at same hour every day with water');
  } else if (g.includes('levothyroxine')) {
    tips.push('Take 30-60 mins before breakfast on empty stomach');
  } else if (g.includes('calcium')) {
    tips.push('Separate by 4 hours from thyroid or antibiotic');
  } else if (g.includes('ciprofloxacin')) {
    tips.push('Avoid milk/dairy within 2 hours of this dose');
  } else if (g.includes('atorvastatin')) {
    tips.push('Best taken at bedtime; avoid grapefruit');
  } else if (g.includes('ibuprofen')) {
    tips.push('Always take with food or milk');
  }

  if (tips.length === 0) {
    tips.push('Take with a full glass of water');
  }
  return tips;
}

export const MedicationTimeline: React.FC<MedicationTimelineProps> = ({
  medications,
  interactions,
  language,
  fontSize,
  highContrast,
}) => {
  // Track checked/taken status for each medication id
  const [takenStatus, setTakenStatus] = useState<Record<string, boolean>>({});
  const [playingSlot, setPlayingSlot] = useState<string | null>(null);

  // Active medications only
  const activeMeds = medications.filter((m) => m.active);

  // Current time slot calculation (for highlighting current period)
  const [currentSlotId, setCurrentSlotId] = useState<'morning' | 'afternoon' | 'evening' | 'bedtime'>('morning');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 11) setCurrentSlotId('morning');
    else if (hour >= 11 && hour < 16) setCurrentSlotId('afternoon');
    else if (hour >= 16 && hour < 21) setCurrentSlotId('evening');
    else setCurrentSlotId('bedtime');
  }, []);

  const toggleTaken = (id: string) => {
    setTakenStatus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleResetDay = () => {
    setTakenStatus({});
  };

  // Group meds into slots; "with-meals" goes to both morning and afternoon or lunch
  const getMedsForSlot = (slotId: 'morning' | 'afternoon' | 'evening' | 'bedtime'): Medication[] => {
    return activeMeds.filter((m) => {
      if (m.timingSlot === slotId) return true;
      if (m.timingSlot === 'with-meals') {
        // Place with meals in morning and evening
        return slotId === 'morning' || slotId === 'evening';
      }
      return false;
    });
  };

  // Calculate adherence progress
  const totalDosesToday = activeMeds.reduce((acc, m) => {
    return acc + (m.timingSlot === 'with-meals' ? 2 : 1);
  }, 0);

  const dosesTaken = Object.keys(takenStatus).filter((k) => takenStatus[k]).length;
  const adherencePercent = totalDosesToday > 0 ? Math.min(100, Math.round((dosesTaken / totalDosesToday) * 100)) : 100;

  // Spacing conflict detection: check if conflicting drugs are scheduled in the same time slot
  const checkSlotConflicts = (slotMeds: Medication[]): Interaction[] => {
    const conflicts: Interaction[] = [];
    for (let i = 0; i < slotMeds.length; i++) {
      for (let j = i + 1; j < slotMeds.length; j++) {
        const g1 = slotMeds[i].genericName.toLowerCase();
        const g2 = slotMeds[j].genericName.toLowerCase();
        interactions.forEach((inter) => {
          if (inter.type === 'drug-drug') {
            const d1 = inter.drug1.toLowerCase();
            const d2 = inter.drug2.toLowerCase();
            if ((g1.includes(d1) && g2.includes(d2)) || (g1.includes(d2) && g2.includes(d1))) {
              if (!conflicts.some((c) => c.id === inter.id)) {
                conflicts.push(inter);
              }
            }
          }
        });
      }
    }
    return conflicts;
  };

  // Read out aloud all meds in a given time slot
  const handleSpeakSlot = (slot: TimeSlotDef, meds: Medication[]) => {
    if (playingSlot === slot.id) {
      stopSpeaking();
      setPlayingSlot(null);
      return;
    }

    if (meds.length === 0) {
      const emptyMsg = `You have no medications scheduled for ${slot.name}.`;
      speakAlert(emptyMsg, language);
      return;
    }

    let speechText = '';
    if (language === 'hindi') {
      const names = meds.map((m) => `${m.name} ${m.dosage}`).join(', ');
      speechText = `${slot.name} का समय। आपको ये दवाइयाँ लेनी हैं: ${names}। कृपया पानी और भोजन के निर्देशों का ध्यान रखें।`;
    } else if (language === 'tamil') {
      const names = meds.map((m) => `${m.name}`).join(', ');
      speechText = `${slot.name} மருந்துகள்: ${names}. மருத்துவர் கூறியபடி சரியாக எடுத்துக் கொள்ளவும்.`;
    } else {
      const names = meds.map((m) => `${m.name} (${m.dosage})`).join(', ');
      speechText = `Time for your ${slot.name} medications: ${names}. Remember to take with a glass of water.`;
    }

    setPlayingSlot(slot.id);
    speakAlert(
      speechText,
      language,
      () => setPlayingSlot(slot.id),
      () => setPlayingSlot(null),
      () => setPlayingSlot(null)
    );
  };

  const textScaleClass =
    fontSize === 'xlarge'
      ? 'text-lg leading-relaxed'
      : fontSize === 'large'
      ? 'text-base leading-normal'
      : 'text-sm';

  return (
    <div className={`bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs ${highContrast ? 'border-2 border-slate-800' : ''}`}>
      {/* Header with Title & Adherence Progress Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-teal-700" />
            <h3 className="text-lg font-bold text-slate-900">
              Interactive Daily Medication Timeline
            </h3>
            <span className="text-xs px-2 py-0.5 rounded bg-teal-100 text-teal-800 font-semibold hidden sm:inline">
              Adherence Companion
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Clear time slots designed for seniors · Tap any pill when taken to track your daily progress
          </p>
        </div>

        {/* Adherence Score & Reset */}
        <div className="flex items-center gap-3">
          <div className="bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 flex items-center gap-3">
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Today's Adherence</div>
              <div className="text-sm font-extrabold text-teal-800 flex items-center gap-1.5">
                <CalendarCheck className="h-4 w-4 text-teal-600" />
                <span>{dosesTaken} of {totalDosesToday} Taken</span>
                <span className="text-xs text-slate-400">({adherencePercent}%)</span>
              </div>
            </div>
            {/* Mini Progress Ring / Bar */}
            <div className="w-12 h-2.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-teal-600 transition-all duration-500 rounded-full"
                style={{ width: `${adherencePercent}%` }}
              />
            </div>
          </div>

          <button
            onClick={handleResetDay}
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors border border-slate-200"
            title="Reset taken status for a new day"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Timeline Slot Cards */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {TIME_SLOTS.map((slot) => {
          const slotMeds = getMedsForSlot(slot.id);
          const isCurrent = currentSlotId === slot.id;
          const isSlotPlaying = playingSlot === slot.id;
          const slotConflicts = checkSlotConflicts(slotMeds);

          const allTakenInSlot = slotMeds.length > 0 && slotMeds.every((m) => takenStatus[`${slot.id}-${m.id}`]);

          return (
            <div
              key={slot.id}
              className={`rounded-2xl border transition-all flex flex-col justify-between ${
                isCurrent
                  ? 'ring-2 ring-teal-600 border-teal-500 shadow-sm'
                  : 'border-slate-200 hover:border-slate-300'
              } ${slot.bgGrad} ${highContrast ? 'border-2' : ''}`}
            >
              {/* Slot Header */}
              <div className="p-4 border-b border-slate-200/60">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    {slot.icon}
                    <h4 className="text-sm font-bold text-slate-900">{slot.name}</h4>
                  </div>

                  {isCurrent && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-700 text-white animate-pulse">
                      Current Slot
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-mono font-medium">{slot.timeRange}</span>
                  <span className="text-[11px] font-semibold text-slate-600">
                    {slotMeds.length} pill{slotMeds.length === 1 ? '' : 's'}
                  </span>
                </div>

                {/* Voice Readout Button for This Slot */}
                <button
                  onClick={() => handleSpeakSlot(slot, slotMeds)}
                  className={`mt-2 w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all shadow-2xs cursor-pointer ${
                    isSlotPlaying
                      ? 'bg-teal-700 text-white animate-pulse'
                      : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
                  }`}
                >
                  {isSlotPlaying ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5 text-teal-600" />}
                  <span>{isSlotPlaying ? 'Stop Audio' : `Read ${slot.name} Pills Aloud`}</span>
                </button>
              </div>

              {/* Slot Conflict Warning Banner if 2 conflicting drugs are in same slot */}
              {slotConflicts.length > 0 && (
                <div className="mx-3 mt-3 p-2.5 rounded-xl bg-rose-100/90 border border-rose-300 text-rose-950 text-xs">
                  <div className="flex items-center gap-1.5 font-bold mb-1">
                    <AlertTriangle className="h-3.5 w-3.5 text-rose-700 flex-shrink-0" />
                    <span>Timing Collision Alert!</span>
                  </div>
                  <p className="text-[11px] leading-snug">
                    {slotConflicts[0].drug1} and {slotConflicts[0].drug2} are taken at the same time. Consider separating by 2-4 hours to prevent stomach irritation or absorption blockage.
                  </p>
                </div>
              )}

              {/* Medications List in Slot */}
              <div className="p-3.5 flex-1 space-y-2.5">
                {slotMeds.length === 0 ? (
                  <div className="text-center py-6 text-slate-400 text-xs italic">
                    No medications scheduled for this time
                  </div>
                ) : (
                  slotMeds.map((med) => {
                    const checkKey = `${slot.id}-${med.id}`;
                    const isTaken = Boolean(takenStatus[checkKey]);
                    const pillVisual = getPillAppearance(med.genericName);
                    const instructions = getSlotInstructions(med.genericName, slot.id);

                    return (
                      <div
                        key={checkKey}
                        onClick={() => toggleTaken(checkKey)}
                        className={`p-3 rounded-xl border transition-all cursor-pointer select-none ${
                          isTaken
                            ? 'bg-emerald-50/70 border-emerald-300 opacity-80'
                            : 'bg-white border-slate-200 hover:border-teal-400 shadow-2xs'
                        }`}
                      >
                        <div className="flex items-start gap-2.5">
                          {/* Interactive Checkbox */}
                          <button
                            type="button"
                            aria-label={`Mark ${med.name} as taken`}
                            className={`mt-0.5 p-0.5 rounded-md transition-colors ${
                              isTaken ? 'text-emerald-600' : 'text-slate-300 hover:text-teal-600'
                            }`}
                          >
                            {isTaken ? (
                              <CheckCircle2 className="h-5 w-5 fill-emerald-100" />
                            ) : (
                              <Circle className="h-5 w-5" />
                            )}
                          </button>

                          {/* Pill Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1">
                              <h5
                                className={`text-xs font-bold truncate ${
                                  isTaken ? 'line-through text-slate-500' : 'text-slate-900'
                                }`}
                              >
                                {med.name}
                              </h5>

                              {/* Visual pill color dot to help seniors recognize the pill */}
                              <span
                                className={`h-3 w-3 rounded-full border flex-shrink-0 ${pillVisual.color}`}
                                title={`Pill appearance: ${pillVisual.colorName}`}
                              />
                            </div>

                            <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                              <span className="font-semibold text-slate-700 font-mono">{med.dosage}</span>
                              <span>·</span>
                              <span className="truncate">{pillVisual.colorName}</span>
                            </div>

                            {/* Food & Water Direction */}
                            <div className="mt-1.5 flex items-center gap-1 text-[11px] text-teal-800 bg-teal-50/70 px-1.5 py-0.5 rounded border border-teal-100">
                              <Droplet className="h-3 w-3 text-teal-600 flex-shrink-0" />
                              <span className="truncate">{instructions[0]}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Slot Footer Summary */}
              <div className="p-3 bg-white/60 border-t border-slate-200/50 rounded-b-2xl text-[11px] flex items-center justify-between text-slate-500">
                <span>{allTakenInSlot ? '✅ All pills taken' : `${slotMeds.length} to take`}</span>
                {allTakenInSlot && <span className="font-bold text-emerald-700">Completed!</span>}
              </div>
            </div>
          );
        })}
      </div>

      {/* Helpful Elderly Chronotherapy Guidance Callout */}
      <div className="mt-5 p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <Info className="h-4 w-4 text-teal-600 flex-shrink-0" />
          <span>
            <strong>Elderly Medication Rule:</strong> Never take all your daily medicines at the exact same hour unless specifically told by your doctor. Spacing morning and evening doses protects your stomach lining and optimizes kidney clearance.
          </span>
        </div>

        <button
          onClick={() => {
            const allKeys: Record<string, boolean> = {};
            TIME_SLOTS.forEach((slot) => {
              getMedsForSlot(slot.id).forEach((m) => {
                allKeys[`${slot.id}-${m.id}`] = true;
              });
            });
            setTakenStatus(allKeys);
          }}
          className="text-xs font-semibold text-teal-800 hover:text-teal-900 whitespace-nowrap self-end sm:self-auto"
        >
          Mark All As Taken Today →
        </button>
      </div>
    </div>
  );
};
