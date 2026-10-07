import React, { useState } from 'react';
import {
  AlertTriangle,
  Volume2,
  VolumeX,
  PhoneCall,
  Clock,
  Coffee,
  Sun,
  Moon,
  Utensils,
  ShieldCheck,
  CheckCircle,
  HelpCircle,
  AlertCircle,
  ShoppingBag,
  ExternalLink,
  Share2,
  Copy,
  Check,
  Truck,
  Tag,
  Sparkles
} from 'lucide-react';
import { Interaction, LanguageCode, Medication } from '../types/medication';
import { speakAlert, stopSpeaking } from '../utils/speech';
import { getEstimatedMedicineData } from '../data/pharmacyPartners';

interface PatientViewProps {
  interactions: Interaction[];
  medications: Medication[];
  language: LanguageCode;
  fontSize: 'normal' | 'large' | 'xlarge';
  highContrast: boolean;
  onOpenDoctorContact: () => void;
  onOpenPharmacy?: () => void;
}

export const PatientView: React.FC<PatientViewProps> = ({
  interactions,
  medications,
  language,
  fontSize,
  highContrast,
  onOpenDoctorContact,
  onOpenPharmacy,
}) => {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const handleCopyRxLink = () => {
    const rxUrl = `${window.location.origin}/rx/MDS-2026-RX-749201`;
    navigator.clipboard.writeText(rxUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const textScaleClass =
    fontSize === 'xlarge'
      ? 'text-lg leading-relaxed'
      : fontSize === 'large'
      ? 'text-base leading-normal'
      : 'text-sm';

  const headingScaleClass =
    fontSize === 'xlarge' ? 'text-2xl font-black' : fontSize === 'large' ? 'text-xl font-extrabold' : 'text-lg font-bold';

  const handlePlayVoice = (interaction: Interaction) => {
    if (playingId === interaction.id) {
      stopSpeaking();
      setPlayingId(null);
      return;
    }

    const textToSpeak = interaction.patientAlerts[language] || interaction.patientAlerts.english;
    setPlayingId(interaction.id);

    speakAlert(
      textToSpeak,
      language,
      () => setPlayingId(interaction.id),
      () => setPlayingId(null),
      () => setPlayingId(null)
    );
  };

  const severeInteractions = interactions.filter((i) => i.severity === 'SEVERE');
  const moderateInteractions = interactions.filter((i) => i.severity === 'MODERATE');
  const foodInteractions = interactions.filter((i) => i.type === 'drug-food');

  // Group active meds by timing slot
  const activeMeds = medications.filter((m) => m.active);
  const morningMeds = activeMeds.filter((m) => m.timingSlot === 'morning');
  const afternoonMeds = activeMeds.filter((m) => m.timingSlot === 'afternoon');
  const eveningMeds = activeMeds.filter((m) => m.timingSlot === 'evening');
  const bedtimeMeds = activeMeds.filter((m) => m.timingSlot === 'bedtime');
  const mealMeds = activeMeds.filter((m) => m.timingSlot === 'with-meals');

  return (
    <div className="space-y-6">
      {/* Top Banner for Patient / Caregiver */}
      <div
        id="patient-safety-section"
        className={`p-5 rounded-2xl border transition-all ${
          severeInteractions.length > 0
            ? 'bg-rose-50 border-rose-300 shadow-xs'
            : moderateInteractions.length > 0
            ? 'bg-amber-50 border-amber-200 shadow-xs'
            : 'bg-emerald-50 border-emerald-200'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div
              className={`p-3 rounded-xl flex-shrink-0 ${
                severeInteractions.length > 0
                  ? 'bg-rose-600 text-white'
                  : moderateInteractions.length > 0
                  ? 'bg-amber-500 text-white'
                  : 'bg-emerald-600 text-white'
              }`}
            >
              {severeInteractions.length > 0 ? (
                <AlertTriangle className="h-6 w-6" />
              ) : moderateInteractions.length > 0 ? (
                <AlertCircle className="h-6 w-6" />
              ) : (
                <ShieldCheck className="h-6 w-6" />
              )}
            </div>

            <div>
              <h2 className={`${headingScaleClass} ${severeInteractions.length > 0 ? 'text-rose-950' : 'text-slate-900'}`}>
                {severeInteractions.length > 0
                  ? '⚠️ High Risk Warning: Conflicting Medications Detected'
                  : moderateInteractions.length > 0
                  ? '🔔 Caution: Important Food & Medication Precautions'
                  : '✅ All Active Medications Look Compatible'}
              </h2>
              <p className={`mt-1 text-slate-700 ${textScaleClass}`}>
                {severeInteractions.length > 0
                  ? 'Please listen to the voice alerts below. Do NOT stop taking prescribed heart or blood thinning medications abruptly; speak with your physician or pharmacist.'
                  : 'Review the daily timing schedule and food cautions below to take your pills safely.'}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 flex-shrink-0">
            {onOpenPharmacy && (
              <button
                onClick={onOpenPharmacy}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-xs hover:shadow transition-all cursor-pointer"
              >
                <ShoppingBag className="h-4 w-4" />
                <span>Buy Meds Online</span>
              </button>
            )}

            <button
              onClick={onOpenDoctorContact}
              className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold shadow-xs hover:shadow transition-all cursor-pointer"
            >
              <PhoneCall className="h-4 w-4 text-emerald-400" />
              <span>Call Doctor</span>
            </button>
          </div>
        </div>
      </div>

      {/* Safety Alerts List (Language Specific) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span>🚨 Safety Alerts in Your Language ({language.toUpperCase()})</span>
          </h3>
          <span className="text-xs text-slate-500">Tap audio icon to listen aloud</span>
        </div>

        {interactions.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center">
            <ShieldCheck className="h-12 w-12 text-emerald-600 mx-auto mb-3" />
            <h4 className="text-base font-bold text-slate-800">No Drug Conflicts Detected</h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
              Your active medications currently show no known high-risk pharmacological collisions. Continue following your doctor's exact directions.
            </p>
          </div>
        ) : (
          interactions.map((interaction, index) => {
            const isPlaying = playingId === interaction.id;
            const alertText =
              interaction.patientAlerts[language] || interaction.patientAlerts.english;

            const isSevere = interaction.severity === 'SEVERE';

            return (
              <div
                key={interaction.id}
                className={`p-5 sm:p-6 rounded-2xl border transition-all ${
                  isSevere
                    ? 'bg-rose-50/80 border-rose-300 ring-1 ring-rose-200'
                    : 'bg-amber-50/70 border-amber-300'
                } ${highContrast ? 'border-2' : ''}`}
              >
                {/* Header row with badges */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-black uppercase px-2.5 py-1 rounded-md tracking-wider ${
                        isSevere ? 'bg-rose-600 text-white' : 'bg-amber-500 text-white'
                      }`}
                    >
                      {interaction.severity} ALERT
                    </span>
                    <span className="text-xs font-semibold text-slate-600">
                      {interaction.drug1} + {interaction.drug2}
                    </span>
                  </div>

                  <span className="text-xs text-slate-500 font-medium">
                    {interaction.type === 'drug-food' ? '🥗 Food & Drink Interaction' : '💊 Drug-to-Drug Conflict'}
                  </span>
                </div>

                {/* Main localized text for elderly patient */}
                <p
                  className={`font-semibold mb-4 text-slate-900 ${
                    fontSize === 'xlarge'
                      ? 'text-xl leading-relaxed'
                      : fontSize === 'large'
                      ? 'text-lg leading-snug'
                      : 'text-base leading-snug'
                  }`}
                >
                  {alertText}
                </p>

                {/* Audio Button & Practical Instructions */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200/80">
                  <button
                    onClick={() => handlePlayVoice(interaction)}
                    className={`inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-bold text-sm transition-all shadow-xs cursor-pointer ${
                      isPlaying
                        ? 'bg-rose-700 text-white animate-pulse'
                        : isSevere
                        ? 'bg-rose-600 hover:bg-rose-700 text-white'
                        : 'bg-teal-700 hover:bg-teal-800 text-white'
                    }`}
                  >
                    {isPlaying ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    <span>{isPlaying ? 'Stop Voice Warning' : '🔊 Listen to Warning Aloud'}</span>
                  </button>

                  <div className="text-xs text-slate-600 flex items-center gap-1.5">
                    <HelpCircle className="h-4 w-4 text-teal-600" />
                    <span>
                      <strong>Safe action:</strong> {interaction.saferAlternatives?.[0] || 'Discuss with prescribing doctor.'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Prescribed Medicines Online Purchase & Refill Portal */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                E-Pharmacy Verified Partner Network
              </span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs text-slate-500 font-medium">100% Genuine Certified Stock</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-emerald-600" />
              <span>Prescribed Medicines — Buy & Refill Online</span>
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Compare prices and buy prescribed medicines directly through verified pharmacies (Tata 1mg, Apollo Pharmacy, Netmeds, PharmEasy).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleCopyRxLink}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all shadow-2xs cursor-pointer"
              title="Copy shareable prescription buy link for family or caregiver"
            >
              {copiedLink ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Share2 className="h-3.5 w-3.5 text-slate-500" />}
              <span>{copiedLink ? 'Link Copied!' : '🔗 Share Rx Link'}</span>
            </button>

            {onOpenPharmacy && (
              <button
                onClick={onOpenPharmacy}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs hover:shadow transition-all cursor-pointer"
              >
                <Truck className="h-3.5 w-3.5" />
                <span>🛒 Order All Prescriptions (15% Off)</span>
              </button>
            )}
          </div>
        </div>

        {/* Medicines List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 mt-4">
          {activeMeds.map((med) => {
            const medData = getEstimatedMedicineData(med.name, med.genericName);
            const price = med.estimatedPrice || medData.estimatedPrice;
            const packSize = med.packSize || medData.packSize;
            const schedule = med.scheduleCategory || medData.scheduleCategory;

            return (
              <div
                key={med.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-emerald-300 hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 leading-snug">{med.name}</h4>
                      <p className="text-xs text-teal-700 font-medium">{med.genericName}</p>
                    </div>

                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-slate-600 border border-slate-200 shadow-2xs font-bold whitespace-nowrap">
                      {schedule.includes('OTC') ? 'OTC' : 'Rx Required'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-600 my-2 bg-white/80 p-2 rounded-lg border border-slate-100">
                    <span className="text-slate-500">{packSize}</span>
                    <span className="font-bold text-slate-900 font-mono text-sm">₹{price}</span>
                  </div>

                  <div className="text-[11px] text-slate-500 mb-3 space-y-0.5">
                    <div><strong>Dosage:</strong> {med.dosage} ({med.frequency})</div>
                    <div><strong>Timing:</strong> <span className="capitalize">{med.timingSlot}</span></div>
                  </div>
                </div>

                {/* Direct 1-Click Buy Links for this medicine */}
                <div className="pt-2.5 border-t border-slate-200/80">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Buy Directly Online:
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    <a
                      href={`https://www.1mg.com/search/all?name=${encodeURIComponent(med.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-white hover:bg-rose-50 border border-rose-200 text-rose-800 text-[11px] font-bold transition-colors shadow-2xs"
                    >
                      <span>Tata 1mg</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>

                    <a
                      href={`https://www.apollopharmacy.in/search-medicines/${encodeURIComponent(med.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-white hover:bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold transition-colors shadow-2xs"
                    >
                      <span>Apollo</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>

                    <a
                      href={`https://www.netmeds.com/catalogsearch/result/${encodeURIComponent(med.name)}/all`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-white hover:bg-blue-50 border border-blue-200 text-blue-800 text-[11px] font-bold transition-colors shadow-2xs"
                    >
                      <span>Netmeds</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>

                    <a
                      href={`https://pharmeasy.in/search/all?name=${encodeURIComponent(med.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-white hover:bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-bold transition-colors shadow-2xs"
                    >
                      <span>PharmEasy</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 p-3 bg-emerald-50/70 rounded-xl border border-emerald-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-emerald-900 font-medium">
            <Tag className="h-4 w-4 text-emerald-700 flex-shrink-0" />
            <span>Senior Citizen Coupon <strong>SENIOR15</strong> pre-applied: Save up to 15% on brand-name and generic medicines with free doorstep delivery.</span>
          </div>
          {onOpenPharmacy && (
            <button
              onClick={onOpenPharmacy}
              className="text-xs font-bold text-emerald-800 hover:text-emerald-950 underline whitespace-nowrap cursor-pointer"
            >
              Order with Delivery Guarantee →
            </button>
          )}
        </div>
      </div>

      {/* Daily Pill Timing Schedule (Chronotherapy) */}
      <div id="pill-timing-section" className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-teal-600" />
            <h3 className="text-base font-bold text-slate-900">Daily Pill Timing Organizer</h3>
          </div>
          <span className="text-xs text-slate-500">Separating conflicting medications reduces stomach upset and absorption competition</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Morning */}
          <div className="p-3.5 rounded-xl border border-slate-200 bg-amber-50/40">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 mb-2">
              <Sun className="h-4 w-4 text-amber-600" />
              <span>Morning (8:00 AM)</span>
            </div>
            {morningMeds.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No morning pills scheduled</p>
            ) : (
              <ul className="space-y-1.5">
                {morningMeds.map((m) => (
                  <li key={m.id} className="text-xs bg-white p-2 rounded-lg border border-slate-200 shadow-2xs font-semibold text-slate-800">
                    {m.name} <span className="font-normal text-slate-500">({m.dosage})</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Afternoon / Lunch */}
          <div className="p-3.5 rounded-xl border border-slate-200 bg-orange-50/40">
            <div className="flex items-center gap-1.5 text-xs font-bold text-orange-800 mb-2">
              <Utensils className="h-4 w-4 text-orange-600" />
              <span>Lunch (1:00 PM)</span>
            </div>
            {afternoonMeds.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No afternoon pills scheduled</p>
            ) : (
              <ul className="space-y-1.5">
                {afternoonMeds.map((m) => (
                  <li key={m.id} className="text-xs bg-white p-2 rounded-lg border border-slate-200 shadow-2xs font-semibold text-slate-800">
                    {m.name} <span className="font-normal text-slate-500">({m.dosage})</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Evening / Dinner */}
          <div className="p-3.5 rounded-xl border border-slate-200 bg-teal-50/40">
            <div className="flex items-center gap-1.5 text-xs font-bold text-teal-800 mb-2">
              <Coffee className="h-4 w-4 text-teal-600" />
              <span>Dinner (7:00 PM)</span>
            </div>
            {eveningMeds.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No dinner pills scheduled</p>
            ) : (
              <ul className="space-y-1.5">
                {eveningMeds.map((m) => (
                  <li key={m.id} className="text-xs bg-white p-2 rounded-lg border border-slate-200 shadow-2xs font-semibold text-slate-800">
                    {m.name} <span className="font-normal text-slate-500">({m.dosage})</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Bedtime */}
          <div className="p-3.5 rounded-xl border border-slate-200 bg-indigo-50/40">
            <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-800 mb-2">
              <Moon className="h-4 w-4 text-indigo-600" />
              <span>Bedtime (10:00 PM)</span>
            </div>
            {bedtimeMeds.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No bedtime pills scheduled</p>
            ) : (
              <ul className="space-y-1.5">
                {bedtimeMeds.map((m) => (
                  <li key={m.id} className="text-xs bg-white p-2 rounded-lg border border-slate-200 shadow-2xs font-semibold text-slate-800">
                    {m.name} <span className="font-normal text-slate-500">({m.dosage})</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {mealMeds.length > 0 && (
          <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-700">Pills to take strictly with meals:</span>
            <span className="font-bold text-teal-800">{mealMeds.map((m) => `${m.name} (${m.dosage})`).join(', ')}</span>
          </div>
        )}
      </div>

      {/* Patient Golden Rules Checklist */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-teal-600" />
          <span>Patient & Caregiver Safety Rules for Elderly Polypharmacy</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2">
            <span className="text-teal-700 font-bold text-base leading-none">1.</span>
            <span>
              <strong>Never abruptly stop anticoagulants:</strong> If taking Warfarin, do not stop on your own even if bruises appear. Call your doctor immediately for an INR blood check.
            </span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2">
            <span className="text-teal-700 font-bold text-base leading-none">2.</span>
            <span>
              <strong>Avoid OTC pain pills without asking:</strong> Ibuprofen and Naproxen can cause stomach ulcers and damage kidneys when combined with blood thinners or blood pressure meds. Use Paracetamol instead.
            </span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2">
            <span className="text-teal-700 font-bold text-base leading-none">3.</span>
            <span>
              <strong>No alcohol with diabetes medicine:</strong> Metformin plus alcoholic drinks can lead to lactic acidosis, a dangerous medical emergency.
            </span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2">
            <span className="text-teal-700 font-bold text-base leading-none">4.</span>
            <span>
              <strong>Keep leafy greens intake steady:</strong> If you take Warfarin, do not suddenly eat huge amounts of spinach or broccoli one day and none the next.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
