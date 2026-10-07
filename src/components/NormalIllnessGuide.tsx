import React, { useState } from 'react';
import {
  ShieldAlert,
  Volume2,
  VolumeX,
  PlusCircle,
  CheckCircle2,
  AlertTriangle,
  AlertOctagon,
  Sparkles,
  HelpCircle,
  Home,
  HeartPulse,
  Search,
  Filter,
  Check,
  Coffee,
  Pill
} from 'lucide-react';
import { NormalIllnessItem, LanguageCode, Medication } from '../types/medication';
import { NORMAL_ILLNESS_GUIDE } from '../data/normalIllnessData';
import { speakAlert, stopSpeaking } from '../utils/speech';

interface NormalIllnessGuideProps {
  language: LanguageCode;
  fontSize: 'normal' | 'large' | 'xlarge';
  highContrast: boolean;
  onAddMedicineToRx: (med: Medication) => void;
  activeMedications: Medication[];
}

export const NormalIllnessGuide: React.FC<NormalIllnessGuideProps> = ({
  language,
  fontSize,
  highContrast,
  onAddMedicineToRx,
  activeMedications,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  const filteredItems = NORMAL_ILLNESS_GUIDE.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.hindiTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.commonMedicines.some((m) =>
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.genericName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  const handlePlayVoice = (item: NormalIllnessItem) => {
    if (playingId === item.id) {
      stopSpeaking();
      setPlayingId(null);
      return;
    }

    const precautionsList = item.precautions[language] || item.precautions.english;
    const textToSpeak = `${item.title}. Important precautions: ${precautionsList.join('. ')}`;

    setPlayingId(item.id);
    speakAlert(
      textToSpeak,
      language,
      () => setPlayingId(item.id),
      () => setPlayingId(null),
      () => setPlayingId(null)
    );
  };

  const handleAddMedicine = (med: NormalIllnessItem['commonMedicines'][0]) => {
    const newMed: Medication = {
      id: `illness-${Date.now()}`,
      name: med.name,
      genericName: med.genericName.split(' ')[0],
      dosage: med.standardDose.split(' ')[0] || 'Standard dose',
      frequency: med.frequency,
      timingSlot: 'morning',
      route: 'Oral',
      purpose: med.purpose,
      active: true,
    };

    onAddMedicineToRx(newMed);
    setAddedNotice(`Added "${med.name}" to your active prescription! Check alerts above.`);
    setTimeout(() => setAddedNotice(null), 4000);
  };

  const textScaleClass =
    fontSize === 'xlarge'
      ? 'text-lg leading-relaxed'
      : fontSize === 'large'
      ? 'text-base leading-normal'
      : 'text-sm';

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white rounded-2xl p-5 sm:p-6 shadow-sm border border-emerald-700">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="h-4 w-4" />
              <span>Geriatric & Everyday Illness Care Guide</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              Common Illnesses, Safe Medicines & Polypharmacy Precautions
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-emerald-100/90 max-w-2xl">
              Everyday colds, fevers, acidity, and diarrhea require extra care in seniors. Learn which over-the-counter pills are safe, which clash with heart or blood thinner medications, and natural home remedies.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/20 text-xs text-emerald-100 max-w-xs flex-shrink-0">
            <span className="font-bold text-white block mb-0.5">💡 Interactive Rx Compatibility:</span>
            Click <strong>"+ Test in Rx Checker"</strong> on any illness medicine to see if it causes a dangerous reaction with your current prescription.
          </div>
        </div>
      </div>

      {/* Added Notification Toast */}
      {addedNotice && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-xl flex items-center justify-between text-xs text-emerald-900 font-semibold shadow-xs animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
            <span>{addedNotice}</span>
          </div>
          <span className="text-emerald-700 text-[11px]">Updated in Real-Time</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {[
            { id: 'all', label: 'All Illnesses (8)' },
            { id: 'cold-flu', label: '🤧 Cold & Flu' },
            { id: 'fever-pain', label: '🌡️ Fever & Body Pain' },
            { id: 'acidity-gas', label: '🔥 Acidity & Heartburn' },
            { id: 'diarrhea-vomiting', label: '💧 Diarrhea & Stools' },
            { id: 'cough-throat', label: '🗣️ Cough & Throat' },
            { id: 'constipation-bowel', label: '🚽 Constipation' },
            { id: 'sleep-insomnia', label: '🌙 Insomnia & Sleep' },
            { id: 'skin-allergy', label: '🩹 Allergy & Skin' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-64">
          <Search className="h-4 w-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search illness or medicine..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 py-1.5 text-xs focus:border-teal-600 focus:bg-white focus:outline-hidden"
          />
        </div>
      </div>

      {/* Illness Cards */}
      <div className="space-y-6">
        {filteredItems.map((item) => {
          const isPlaying = playingId === item.id;
          const localizedPrecautions = item.precautions[language] || item.precautions.english;

          return (
            <div
              key={item.id}
              className={`bg-white rounded-2xl border p-5 sm:p-6 shadow-xs transition-all ${
                highContrast ? 'border-2 border-slate-900' : 'border-slate-200/90'
              }`}
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 mb-5">
                <div className="flex items-start gap-3">
                  <span className="text-3xl p-2 bg-slate-100 rounded-xl flex-shrink-0">{item.icon}</span>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-500 font-medium">
                      <span className="text-teal-800 font-semibold">{item.hindiTitle}</span>
                      <span>·</span>
                      <span className="text-slate-600">{item.tamilTitle}</span>
                    </div>
                  </div>
                </div>

                {/* Voice button */}
                <button
                  onClick={() => handlePlayVoice(item)}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-xs flex-shrink-0 cursor-pointer ${
                    isPlaying
                      ? 'bg-rose-600 text-white animate-pulse'
                      : 'bg-teal-700 hover:bg-teal-800 text-white'
                  }`}
                >
                  {isPlaying ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  <span>{isPlaying ? 'Stop Spoken Guide' : `🔊 Listen in ${language.toUpperCase()}`}</span>
                </button>
              </div>

              {/* Symptoms row */}
              <div className="mb-5 flex flex-wrap items-center gap-1.5 text-xs">
                <span className="font-bold text-slate-700 mr-1">Typical Symptoms:</span>
                {item.symptoms.map((s, idx) => (
                  <span key={idx} className="bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-lg border border-slate-200">
                    {s}
                  </span>
                ))}
              </div>

              {/* Common Medicines Table */}
              <div className="mb-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5 flex items-center gap-1.5">
                  <Pill className="h-4 w-4 text-teal-600" />
                  <span>Common Medicines, Dosages & Geriatric Safety Ratings</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {item.commonMedicines.map((med, mIdx) => {
                    const isAlreadyInRx = activeMedications.some(
                      (m) =>
                        m.name.toLowerCase().includes(med.genericName.toLowerCase()) ||
                        med.name.toLowerCase().includes(m.genericName.toLowerCase())
                    );

                    return (
                      <div
                        key={mIdx}
                        className={`p-3.5 rounded-xl border transition-all ${
                          med.elderlyRating === 'Safe'
                            ? 'bg-emerald-50/50 border-emerald-200'
                            : med.elderlyRating === 'Caution'
                            ? 'bg-amber-50/50 border-amber-200'
                            : 'bg-rose-50/50 border-rose-200'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <div>
                            <h5 className="text-sm font-bold text-slate-900 leading-snug">{med.name}</h5>
                            <span className="text-xs text-slate-500 font-mono">{med.standardDose} · {med.frequency}</span>
                          </div>

                          <span
                            className={`text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-wide ${
                              med.elderlyRating === 'Safe'
                                ? 'bg-emerald-600 text-white'
                                : med.elderlyRating === 'Caution'
                                ? 'bg-amber-500 text-white'
                                : 'bg-rose-600 text-white'
                            }`}
                          >
                            {med.elderlyRating} for Seniors
                          </span>
                        </div>

                        <p className="text-xs text-slate-700 font-medium mb-2">{med.purpose}</p>

                        <div className="bg-white/80 p-2 rounded-lg border border-slate-200 text-[11px] text-slate-600 mb-2 leading-relaxed">
                          <strong>Precaution:</strong> {med.warningNote}
                        </div>

                        {/* Buy Online & Test in Rx Row */}
                        <div className="flex flex-wrap items-center gap-1.5 mb-2">
                          <span className="text-[11px] font-bold text-slate-700">Buy Online:</span>
                          <a
                            href={`https://www.1mg.com/search/all?name=${encodeURIComponent(med.name)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-0.5 text-[10px] font-bold text-rose-700 bg-white hover:bg-rose-50 px-2 py-0.5 rounded border border-rose-200 transition-colors"
                            title={`Buy ${med.name} on Tata 1mg`}
                          >
                            <span>1mg</span>
                            <span className="text-[9px]">↗</span>
                          </a>
                          <a
                            href={`https://www.apollopharmacy.in/search-medicines/${encodeURIComponent(med.name)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-700 bg-white hover:bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 transition-colors"
                            title={`Buy ${med.name} on Apollo Pharmacy`}
                          >
                            <span>Apollo</span>
                            <span className="text-[9px]">↗</span>
                          </a>
                          <a
                            href={`https://www.netmeds.com/catalogsearch/result/${encodeURIComponent(med.name)}/all`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-0.5 text-[10px] font-bold text-blue-700 bg-white hover:bg-blue-50 px-2 py-0.5 rounded border border-blue-200 transition-colors"
                            title={`Buy ${med.name} on Netmeds`}
                          >
                            <span>Netmeds</span>
                            <span className="text-[9px]">↗</span>
                          </a>
                          <a
                            href={`https://pharmeasy.in/search/all?name=${encodeURIComponent(med.name)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-0.5 text-[10px] font-bold text-amber-700 bg-white hover:bg-amber-50 px-2 py-0.5 rounded border border-amber-200 transition-colors"
                            title={`Buy ${med.name} on PharmEasy`}
                          >
                            <span>PharmEasy</span>
                            <span className="text-[9px]">↗</span>
                          </a>
                        </div>

                        {/* Button to test in current Rx */}
                        <button
                          onClick={() => handleAddMedicine(med)}
                          disabled={isAlreadyInRx}
                          className={`w-full py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                            isAlreadyInRx
                              ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                              : 'bg-slate-900 hover:bg-slate-800 text-white shadow-2xs'
                          }`}
                        >
                          {isAlreadyInRx ? (
                            <>
                              <Check className="h-3.5 w-3.5 text-emerald-600" />
                              <span>Already Active in Current Rx</span>
                            </>
                          ) : (
                            <>
                              <PlusCircle className="h-3.5 w-3.5 text-teal-400" />
                              <span>+ Test in Rx Checker with My Current Pills</span>
                            </>
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Crucial Precautions & Polypharmacy Clashes */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                {/* Localized Precautions */}
                <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-2 flex items-center gap-1.5">
                    <ShieldAlert className="h-4 w-4 text-amber-700" />
                    <span>Key Precautions for Seniors ({language.toUpperCase()})</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-800">
                    {localizedPrecautions.map((p, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-1.5">
                        <span className="text-amber-600 font-bold">•</span>
                        <span className={textScaleClass}>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Polypharmacy Clashes */}
                <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-rose-900 mb-2 flex items-center gap-1.5">
                    <AlertOctagon className="h-4 w-4 text-rose-700" />
                    <span>Dangerous Clashes with Chronic Heart/BP/Diabetes Drugs</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-rose-950">
                    {item.polypharmacyClashes.map((c, cIdx) => (
                      <li key={cIdx} className="flex items-start gap-1.5">
                        <span className="text-rose-600 font-bold">⚠️</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Home Remedies & Emergency Warnings */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs">
                {/* Safe Home Remedies */}
                <div className="p-3.5 bg-emerald-50/40 rounded-xl border border-emerald-200">
                  <h5 className="font-bold text-emerald-950 mb-1.5 flex items-center gap-1.5">
                    <Home className="h-3.5 w-3.5 text-emerald-700" />
                    <span>Safe Non-Drug Home Remedies</span>
                  </h5>
                  <ul className="space-y-1 text-slate-700">
                    {item.safeHomeRemedies.map((hr, hrIdx) => (
                      <li key={hrIdx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="h-3 w-3 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{hr}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* When to see doctor */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <h5 className="font-bold text-rose-900 mb-1.5 flex items-center gap-1.5">
                    <HeartPulse className="h-3.5 w-3.5 text-rose-600" />
                    <span>Emergency Red Flags (Seek Immediate Medical Care)</span>
                  </h5>
                  <ul className="space-y-1 text-slate-700">
                    {item.emergencySigns.map((es, esIdx) => (
                      <li key={esIdx} className="flex items-start gap-1.5">
                        <AlertTriangle className="h-3 w-3 text-rose-600 flex-shrink-0 mt-0.5" />
                        <span>{es}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
