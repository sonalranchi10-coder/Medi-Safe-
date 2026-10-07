import React, { useState } from 'react';
import {
  Stethoscope,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  FileCheck2,
  FileEdit,
  Phone,
  Printer,
  Sparkles,
  GitBranch,
  Activity,
  Layers,
  ChevronRight,
  CheckCircle2,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { Interaction, Medication } from '../types/medication';

interface DoctorViewProps {
  interactions: Interaction[];
  medications: Medication[];
  onApprovePrescription: () => void;
  onRequestModification: () => void;
  onContactPatient: () => void;
  onPrintReport: () => void;
  onOpenPharmacy?: () => void;
  patientName?: string;
  patientAge?: number;
  diagnosis?: string;
}

export const DoctorView: React.FC<DoctorViewProps> = ({
  interactions,
  medications,
  onApprovePrescription,
  onRequestModification,
  onContactPatient,
  onPrintReport,
  onOpenPharmacy,
  patientName = 'Senior Patient (Polypharmacy)',
  patientAge = 74,
  diagnosis = 'Cardiovascular & Metabolic Polypharmacy',
}) => {
  const [isAiReviewing, setIsAiReviewing] = useState<boolean>(false);
  const [aiReviewData, setAiReviewData] = useState<any | null>(null);

  const severeInteractions = interactions.filter((i) => i.severity === 'SEVERE');
  const moderateInteractions = interactions.filter((i) => i.severity === 'MODERATE');
  const safeToDispense = severeInteractions.length === 0;

  const handleRunAiClinicalReview = async () => {
    setIsAiReviewing(true);
    try {
      const res = await fetch('/api/clinical-ai-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          medications,
          patientAge,
          conditions: diagnosis,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.review) {
          setAiReviewData(data.review);
        }
      }
    } catch (e) {
      console.warn('AI review call failed:', e);
    } finally {
      setIsAiReviewing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Clinical Risk Summary & Dispensing Clearance Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Clinical Pharmacological Assessment
              </span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs text-slate-500 font-medium">Patient: {patientName} ({patientAge}yo)</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Stethoscope className="h-6 w-6 text-teal-700" />
              <span>Multi-Drug Interaction & Dispense Decision Console</span>
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Indications: <strong className="text-slate-800">{diagnosis}</strong>
            </p>
          </div>

          {/* Safety badge */}
          <div className="flex items-center gap-3">
            <div
              className={`p-3 rounded-xl flex items-center gap-3 border ${
                safeToDispense
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : 'bg-rose-50 border-rose-200 text-rose-900'
              }`}
            >
              {safeToDispense ? (
                <ShieldCheck className="h-6 w-6 text-emerald-600 flex-shrink-0" />
              ) : (
                <ShieldAlert className="h-6 w-6 text-rose-600 flex-shrink-0" />
              )}
              <div>
                <div className="text-xs font-bold tracking-wide uppercase">
                  {safeToDispense ? 'CLEAR TO DISPENSE' : 'DISPENSING BLOCKED / HOLD'}
                </div>
                <div className="text-[11px] text-slate-600 font-medium">
                  {safeToDispense
                    ? 'No severe contraindicated interactions flagged'
                    : `${severeInteractions.length} severe pharmacological conflict(s) require resolution`}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <div className="text-[11px] font-semibold text-slate-500">Active Regimen</div>
            <div className="text-xl font-bold text-slate-900">{medications.filter((m) => m.active).length} Drugs</div>
            <div className="text-[10px] text-slate-400">Polypharmacy tier</div>
          </div>

          <div className={`p-3 rounded-xl border ${severeInteractions.length > 0 ? 'bg-rose-50 border-rose-200' : 'bg-slate-50 border-slate-100'}`}>
            <div className="text-[11px] font-semibold text-rose-700">Severe Conflicts</div>
            <div className={`text-xl font-bold ${severeInteractions.length > 0 ? 'text-rose-800' : 'text-slate-900'}`}>
              {severeInteractions.length}
            </div>
            <div className="text-[10px] text-slate-500">Physician override required</div>
          </div>

          <div className={`p-3 rounded-xl border ${moderateInteractions.length > 0 ? 'bg-amber-50 border-amber-200' : 'bg-slate-50 border-slate-100'}`}>
            <div className="text-[11px] font-semibold text-amber-700">Moderate / Food</div>
            <div className="text-xl font-bold text-slate-900">{moderateInteractions.length}</div>
            <div className="text-[10px] text-slate-500">Dose spacing / monitor</div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <div className="text-[11px] font-semibold text-slate-500">CYP / Renal Pathways</div>
            <div className="text-xl font-bold text-teal-800 font-mono">
              {severeInteractions.length > 0 ? 'CYP2C9/3A4' : 'Normal'}
            </div>
            <div className="text-[10px] text-slate-400">Hepato-renal clearance</div>
          </div>
        </div>
      </div>

      {/* Deep AI Clinical Review Action */}
      <div className="bg-gradient-to-r from-teal-900 to-slate-900 rounded-2xl p-5 text-white shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-teal-300 text-xs font-semibold uppercase tracking-wider mb-1">
              <Sparkles className="h-4 w-4" />
              <span>Gemini 3.8 Flash Clinical Pharmacology Review</span>
            </div>
            <h3 className="text-base font-bold text-white">
              Generate Deep Pharmacokinetic & Alternative Drug Analysis
            </h3>
            <p className="text-xs text-teal-100/80 mt-0.5">
              Evaluates additive organ burdens, cytochrome P450 pathway collisions, and recommends evidence-based replacements.
            </p>
          </div>

          <button
            onClick={handleRunAiClinicalReview}
            disabled={isAiReviewing}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-xs hover:shadow transition-all disabled:opacity-50 flex-shrink-0 cursor-pointer"
          >
            {isAiReviewing ? (
              <>
                <Activity className="h-4 w-4 animate-spin" />
                <span>Analyzing Regimen...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                <span>Run AI Clinical Consultation</span>
              </>
            )}
          </button>
        </div>

        {/* AI Review Results if available */}
        {aiReviewData && (
          <div className="mt-4 pt-4 border-t border-white/10 space-y-3 text-xs">
            <div className="bg-white/10 p-3.5 rounded-xl backdrop-blur-xs">
              <span className="font-bold text-teal-200">Pharmacist Summary: </span>
              <span className="text-white">{aiReviewData.pharmacistOverview}</span>
            </div>

            {aiReviewData.cypMechanisms?.length > 0 && (
              <div className="bg-white/10 p-3.5 rounded-xl backdrop-blur-xs">
                <span className="font-bold text-teal-200">Enzyme Pathway Findings:</span>
                <ul className="list-disc list-inside mt-1 space-y-1 text-slate-200">
                  {aiReviewData.cypMechanisms.map((m: string, i: number) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
              </div>
            )}

            {aiReviewData.saferReplacements?.length > 0 && (
              <div className="bg-emerald-950/60 border border-emerald-500/30 p-3.5 rounded-xl">
                <span className="font-bold text-emerald-300">Evidence-Based Safer Drug Substitutions:</span>
                <ul className="list-disc list-inside mt-1 space-y-1 text-emerald-100">
                  {aiReviewData.saferReplacements.map((r: string, i: number) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Clinical Interactions Details */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Layers className="h-5 w-5 text-teal-700" />
            <span>Detected Pharmacological Interactions & Mechanisms ({interactions.length})</span>
          </h3>
          <span className="text-xs text-slate-500">Hierarchical clinical evidence</span>
        </div>

        {interactions.length === 0 ? (
          <div className="p-8 bg-white rounded-2xl border border-slate-200 text-center text-slate-500 text-sm">
            No active drug-drug or drug-food conflicts identified in the current selection.
          </div>
        ) : (
          interactions.map((interaction) => {
            const isSevere = interaction.severity === 'SEVERE';

            return (
              <div
                key={interaction.id}
                className={`bg-white rounded-2xl border p-5 sm:p-6 shadow-xs transition-all ${
                  isSevere ? 'border-rose-300 ring-1 ring-rose-100' : 'border-amber-200'
                }`}
              >
                {/* Header row */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 mb-4">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`text-xs font-black uppercase px-2.5 py-0.5 rounded tracking-wider ${
                        isSevere ? 'bg-rose-600 text-white' : 'bg-amber-500 text-white'
                      }`}
                    >
                      {interaction.severity}
                    </span>
                    <h4 className="text-base font-bold text-slate-900">
                      {interaction.drug1} <span className="text-slate-400 font-normal">↔</span> {interaction.drug2}
                    </h4>
                  </div>

                  {interaction.cypEnzyme && (
                    <span className="text-xs font-mono bg-slate-100 text-slate-700 px-2 py-1 rounded-md border border-slate-200">
                      Mechanism: {interaction.cypEnzyme}
                    </span>
                  )}
                </div>

                {/* Effect & Mechanism */}
                <div className="space-y-3 text-xs sm:text-sm">
                  <div>
                    <span className="font-bold text-slate-800">Clinical Consequence: </span>
                    <span className="text-slate-700">{interaction.effect}</span>
                  </div>

                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 text-xs">
                    <div className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                      <GitBranch className="h-3.5 w-3.5 text-teal-700" />
                      <span>Pharmacological Mechanism of Action:</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed font-sans">{interaction.mechanism}</p>
                    {interaction.clinicalImpact && (
                      <p className="mt-1.5 text-slate-700 font-medium">
                        <strong>Clinical Evidence:</strong> {interaction.clinicalImpact}
                      </p>
                    )}
                  </div>

                  {/* Recommendation */}
                  <div className="bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-200 text-xs">
                    <div className="font-bold text-emerald-950 mb-1 flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4 text-emerald-700" />
                      <span>Clinical Action Plan & Recommendation:</span>
                    </div>
                    <p className="text-emerald-900 leading-relaxed">{interaction.recommendation}</p>

                    {interaction.saferAlternatives && interaction.saferAlternatives.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-emerald-200/60 flex flex-wrap items-center gap-1.5">
                        <span className="font-bold text-emerald-950">Safer Alternatives:</span>
                        {interaction.saferAlternatives.map((alt, idx) => (
                          <span
                            key={idx}
                            className="bg-white text-emerald-800 font-semibold px-2 py-0.5 rounded text-[11px] border border-emerald-300 shadow-2xs"
                          >
                            {alt}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Clinical Action Toolbar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
          Clinical Decision & Physician Actions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <button
            onClick={onApprovePrescription}
            className="flex items-center justify-center gap-2 px-3 py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-xs hover:shadow transition-all cursor-pointer"
          >
            <FileCheck2 className="h-4 w-4" />
            <span>Approve & E-Sign</span>
          </button>

          {onOpenPharmacy && (
            <button
              onClick={onOpenPharmacy}
              className="flex items-center justify-center gap-2 px-3 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs hover:shadow transition-all cursor-pointer"
            >
              <span>🛒 E-Pharmacy Refill</span>
            </button>
          )}

          <button
            onClick={onRequestModification}
            className="flex items-center justify-center gap-2 px-3 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs hover:shadow transition-all cursor-pointer"
          >
            <FileEdit className="h-4 w-4" />
            <span>Request Memo</span>
          </button>

          <button
            onClick={onContactPatient}
            className="flex items-center justify-center gap-2 px-3 py-3 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs shadow-xs hover:shadow transition-all cursor-pointer"
          >
            <Phone className="h-4 w-4 text-emerald-400" />
            <span>Counseling</span>
          </button>

          <button
            onClick={onPrintReport}
            className="flex items-center justify-center gap-2 px-3 py-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-all cursor-pointer"
          >
            <Printer className="h-4 w-4 text-slate-500" />
            <span>Print Report</span>
          </button>
        </div>
      </div>
    </div>
  );
};
