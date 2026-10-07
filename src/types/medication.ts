export type SeverityLevel = 'SEVERE' | 'MODERATE' | 'MINOR';

export type InteractionType = 'drug-drug' | 'drug-food' | 'drug-condition';

export type LanguageCode = 'english' | 'hindi' | 'tamil' | 'telugu' | 'bengali' | 'spanish';

export interface Medication {
  id: string;
  name: string;
  genericName: string;
  dosage: string;
  frequency: string;
  timingSlot: 'morning' | 'afternoon' | 'evening' | 'bedtime' | 'with-meals';
  route: string;
  purpose?: string;
  active: boolean;
  estimatedPrice?: number;
  packSize?: string;
  requiresPrescription?: boolean;
  manufacturer?: string;
  scheduleCategory?: 'Schedule H (Rx)' | 'Schedule H1 (Controlled Rx)' | 'OTC (Over The Counter)';
}

export interface PharmacyPartner {
  id: string;
  name: string;
  logo: string;
  badge: string;
  deliveryTime: string;
  discountRate: number;
  rating: number;
  verified: boolean;
  getSearchUrl: (query: string) => string;
}

export interface PatientAlertTranslations {
  english: string;
  hindi: string;
  tamil: string;
  telugu: string;
  bengali: string;
  spanish: string;
}

export interface Interaction {
  id: string;
  drug1: string;
  drug2: string;
  severity: SeverityLevel;
  type: InteractionType;
  effect: string;
  mechanism: string;
  clinicalImpact: string;
  recommendation: string;
  saferAlternatives?: string[];
  cypEnzyme?: string;
  foodOrHerb?: string;
  patientAlerts: PatientAlertTranslations;
}

export interface AnalysisSummary {
  riskScore: 'HIGH' | 'MODERATE' | 'LOW';
  severeCount: number;
  moderateCount: number;
  minorCount: number;
  foodCount: number;
  safeToDispense: boolean;
  clinicalConclusion: string;
  cypPathwaysInvolved: string[];
}

export interface PrescriptionSample {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  patientName: string;
  patientAge: number;
  doctorName: string;
  hospitalName: string;
  date: string;
  diagnosis: string;
  rawText: string;
  medications: Medication[];
  notes: string;
  badge: string;
}

export interface NormalIllnessItem {
  id: string;
  title: string;
  icon: string;
  hindiTitle: string;
  tamilTitle: string;
  category: 'cold-flu' | 'fever-pain' | 'acidity-gas' | 'diarrhea-vomiting' | 'cough-throat' | 'constipation-bowel' | 'sleep-insomnia' | 'skin-allergy';
  symptoms: string[];
  commonMedicines: Array<{
    name: string;
    genericName: string;
    standardDose: string;
    frequency: string;
    purpose: string;
    elderlyRating: 'Safe' | 'Caution' | 'Avoid';
    warningNote: string;
  }>;
  precautions: {
    english: string[];
    hindi: string[];
    tamil: string[];
    telugu: string[];
    bengali: string[];
    spanish: string[];
  };
  polypharmacyClashes: string[];
  foodAndDrinkAdvice: string;
  safeHomeRemedies: string[];
  emergencySigns: string[];
}
