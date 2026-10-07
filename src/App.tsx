import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { PrescriptionUpload } from './components/PrescriptionUpload';
import { MedicationManager } from './components/MedicationManager';
import { PatientView } from './components/PatientView';
import { DoctorView } from './components/DoctorView';
import { NormalIllnessGuide } from './components/NormalIllnessGuide';
import { PharmacyOrderModal } from './components/PharmacyOrderModal';
import { OrdersTrackerModal } from './components/OrdersTrackerModal';
import {
  ApprovalModal,
  ModificationModal,
  PatientCounselingModal
} from './components/Modals';
import {
  LanguageCode,
  Medication,
  PrescriptionSample
} from './types/medication';
import { SAMPLE_PRESCRIPTIONS, findInteractionsForMeds } from './data/drugDatabase';
import { ShieldCheck, Heart, Stethoscope, AlertTriangle, Printer, Layers } from 'lucide-react';

export default function App() {
  const [language, setLanguage] = useState<LanguageCode>('english');
  const [viewMode, setViewMode] = useState<'patient' | 'doctor'>('patient');
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'patient' | 'doctor' | 'illness-guide'>('patient');

  // Start with default benchmark polypharmacy prescription from prompt
  const initialSample = SAMPLE_PRESCRIPTIONS[0];
  const [currentSample, setCurrentSample] = useState<PrescriptionSample | null>(initialSample);
  const [medications, setMedications] = useState<Medication[]>(initialSample.medications);
  const [extractedRawText, setExtractedRawText] = useState<string>(initialSample.rawText);
  const [currentRxId, setCurrentRxId] = useState<string>('MDS-2026-RX-749201');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Modals
  const [isApprovalOpen, setIsApprovalOpen] = useState<boolean>(false);
  const [isModificationOpen, setIsModificationOpen] = useState<boolean>(false);
  const [isCounselingOpen, setIsCounselingOpen] = useState<boolean>(false);
  const [isPharmacyOpen, setIsPharmacyOpen] = useState<boolean>(false);
  const [isOrdersTrackerOpen, setIsOrdersTrackerOpen] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('openPharmacy') === '1' || params.get('orderRx')) {
        setIsPharmacyOpen(true);
      }
      if (params.get('openTracker') === '1') {
        setIsOrdersTrackerOpen(true);
      }
    }
  }, []);

  // Re-compute interactions in real-time as medications change or are toggled
  const { interactions, summary } = useMemo(() => {
    return findInteractionsForMeds(medications);
  }, [medications]);

  const handlePrescriptionLoaded = (
    newMeds: Medication[],
    rawText: string,
    sampleInfo?: PrescriptionSample,
    rxId?: string
  ) => {
    setMedications(newMeds);
    setExtractedRawText(rawText);
    setCurrentSample(sampleInfo || null);
    if (rxId) {
      setCurrentRxId(rxId);
    } else if (sampleInfo?.id === 'sample-1') {
      setCurrentRxId('MDS-2026-RX-749201');
    } else if (sampleInfo?.id === 'sample-2') {
      setCurrentRxId('MDS-2026-RX-882194');
    } else {
      setCurrentRxId(`MDS-2026-RX-${Math.floor(100000 + Math.random() * 900000)}`);
    }
  };

  const handleFlowToPharmacy = () => {
    setIsPharmacyOpen(true);
  };

  const handleFlowToSafety = () => {
    setActiveTab('patient');
    setViewMode('patient');
    setTimeout(() => {
      document.getElementById('patient-safety-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleFlowToDoctor = () => {
    setActiveTab('doctor');
    setViewMode('doctor');
  };

  const handleFlowToTimeline = () => {
    setActiveTab('patient');
    setViewMode('patient');
    setTimeout(() => {
      document.getElementById('pill-timing-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleToggleMedication = (id: string) => {
    setMedications((prev) =>
      prev.map((m) => (m.id === id ? { ...m, active: !m.active } : m))
    );
  };

  const handleRemoveMedication = (id: string) => {
    setMedications((prev) => prev.filter((m) => m.id !== id));
  };

  const handleAddMedication = (newMed: Medication) => {
    setMedications((prev) => [...prev, newMed]);
  };

  const handleUpdateTiming = (id: string, timing: Medication['timingSlot']) => {
    setMedications((prev) =>
      prev.map((m) => (m.id === id ? { ...m, timingSlot: timing } : m))
    );
  };

  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div
      className={`min-h-screen bg-slate-100/90 text-slate-900 transition-colors ${
        highContrast ? 'contrast-125' : ''
      }`}
    >
      {/* Header */}
      <Header
        language={language}
        onLanguageChange={setLanguage}
        viewMode={viewMode}
        onViewModeChange={(mode) => {
          setViewMode(mode);
          setActiveTab(mode);
        }}
        fontSize={fontSize}
        onFontSizeChange={setFontSize}
        highContrast={highContrast}
        onHighContrastToggle={() => setHighContrast(!highContrast)}
        hasInteractions={interactions.length > 0}
        severeCount={summary.severeCount}
        onOpenPharmacy={() => setIsPharmacyOpen(true)}
      />

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Prescription Ingestion & OCR Section */}
        <PrescriptionUpload
          onPrescriptionLoaded={handlePrescriptionLoaded}
          isProcessing={isProcessing}
          setIsProcessing={setIsProcessing}
          extractedRawText={extractedRawText}
          activeSampleId={currentSample?.id}
          currentRxId={currentRxId}
          currentSample={currentSample}
          medications={medications}
          onOpenPharmacy={handleFlowToPharmacy}
          onViewSafetyAlerts={handleFlowToSafety}
          onViewDoctorDashboard={handleFlowToDoctor}
          onViewTimeline={handleFlowToTimeline}
          severeInteractionsCount={summary.severeCount}
          totalInteractionsCount={interactions.length}
        />

        {/* Active Medications Management */}
        <MedicationManager
          medications={medications}
          onToggleMedication={handleToggleMedication}
          onRemoveMedication={handleRemoveMedication}
          onAddMedication={handleAddMedication}
          onUpdateTiming={handleUpdateTiming}
          onOpenPharmacy={() => setIsPharmacyOpen(true)}
        />

        {/* E-Pharmacy Order & Refill Banner */}
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-slate-50 border border-emerald-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shadow-xs flex-shrink-0">
              Rx
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Verified E-Pharmacy Partner Network</span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-200 text-emerald-900">15% Senior Discount</span>
              </div>
              <p className="text-xs text-slate-700 font-medium">
                All prescribed medications in stock at <strong>Tata 1mg, Apollo Pharmacy, Netmeds & PharmEasy</strong> with door-step express delivery.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsPharmacyOpen(true)}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs hover:shadow transition-all cursor-pointer"
            >
              <span>🛒 Order Refill / Compare Prices</span>
              <span>↗</span>
            </button>

            <button
              onClick={() => setIsOrdersTrackerOpen(true)}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold shadow-2xs transition-all cursor-pointer"
            >
              <span>📦 Live Order Tracking</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs (Patient Alerts vs Doctor Dashboard vs Normal Illness Guide) */}
        <div className="mb-6 flex flex-wrap border-b border-slate-200 gap-1">
          <button
            onClick={() => {
              setActiveTab('patient');
              setViewMode('patient');
            }}
            className={`flex items-center gap-2 py-3 px-5 text-sm font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'patient'
                ? 'border-teal-700 text-teal-800 bg-white/70 rounded-t-xl shadow-2xs'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span className="text-base">🚨</span>
            <span>Patient Safety Alerts</span>
            {summary.severeCount > 0 && (
              <span className="bg-rose-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                {summary.severeCount}
              </span>
            )}
          </button>

          <button
            onClick={() => {
              setActiveTab('doctor');
              setViewMode('doctor');
            }}
            className={`flex items-center gap-2 py-3 px-5 text-sm font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'doctor'
                ? 'border-teal-700 text-teal-800 bg-white/70 rounded-t-xl shadow-2xs'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Stethoscope className="h-4 w-4 text-teal-700" />
            <span>Doctor & Clinical Pharmacist Dashboard</span>
            <span className="bg-slate-200 text-slate-700 text-[11px] font-mono px-2 py-0.5 rounded-full">
              {interactions.length} total
            </span>
          </button>

          <button
            onClick={() => {
              setActiveTab('illness-guide');
            }}
            className={`flex items-center gap-2 py-3 px-5 text-sm font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'illness-guide'
                ? 'border-emerald-600 text-emerald-800 bg-white/70 rounded-t-xl shadow-2xs'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span className="text-base">🩹</span>
            <span>Normal Illnesses & Precautions Guide</span>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              8 Illness Guides & Precautions
            </span>
          </button>
        </div>

        {/* Dynamic View Display */}
        {activeTab === 'patient' ? (
          <PatientView
            interactions={interactions}
            medications={medications}
            language={language}
            fontSize={fontSize}
            highContrast={highContrast}
            onOpenDoctorContact={() => setIsCounselingOpen(true)}
            onOpenPharmacy={() => setIsPharmacyOpen(true)}
          />
        ) : activeTab === 'doctor' ? (
          <DoctorView
            interactions={interactions}
            medications={medications}
            onApprovePrescription={() => setIsApprovalOpen(true)}
            onRequestModification={() => setIsModificationOpen(true)}
            onContactPatient={() => setIsCounselingOpen(true)}
            onPrintReport={handlePrintReport}
            onOpenPharmacy={() => setIsPharmacyOpen(true)}
            patientName={currentSample?.patientName}
            patientAge={currentSample?.patientAge}
            diagnosis={currentSample?.diagnosis}
          />
        ) : (
          <NormalIllnessGuide
            language={language}
            fontSize={fontSize}
            highContrast={highContrast}
            onAddMedicineToRx={handleAddMedication}
            activeMedications={medications}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-200 bg-white py-8 text-center text-xs text-slate-500">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-700 font-semibold">
            <ShieldCheck className="h-4 w-4 text-teal-600" />
            <span>MediSafe Polypharmacy Interaction Network</span>
          </div>

          <div className="flex items-center gap-4 text-slate-500">
            <span>Powered by Clinical Pharmacology & Gemini Vision Multimodal OCR</span>
            <span>·</span>
            <span>Healthcare Hackathon 2026</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ApprovalModal
        isOpen={isApprovalOpen}
        onClose={() => setIsApprovalOpen(false)}
        medications={medications}
        interactions={interactions}
        rxId={currentSample?.id}
        patientName={currentSample?.patientName}
      />

      <ModificationModal
        isOpen={isModificationOpen}
        onClose={() => setIsModificationOpen(false)}
        interactions={interactions}
        medications={medications}
        rxId={currentSample?.id}
        doctorName={currentSample?.doctorName}
      />

      <PatientCounselingModal
        isOpen={isCounselingOpen}
        onClose={() => setIsCounselingOpen(false)}
        interactions={interactions}
      />

      <PharmacyOrderModal
        isOpen={isPharmacyOpen}
        onClose={() => setIsPharmacyOpen(false)}
        medications={medications}
        prescriptionSample={currentSample}
        hasSevereInteractions={summary.severeCount > 0}
        severeCount={summary.severeCount}
        onOpenTracker={() => {
          setIsPharmacyOpen(false);
          setIsOrdersTrackerOpen(true);
        }}
      />

      <OrdersTrackerModal
        isOpen={isOrdersTrackerOpen}
        onClose={() => setIsOrdersTrackerOpen(false)}
      />
    </div>
  );
}
