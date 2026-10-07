import { PharmacyPartner } from '../types/medication';

export const PHARMACY_PARTNERS: PharmacyPartner[] = [
  {
    id: 'tata1mg',
    name: 'Tata 1mg',
    logo: '🔴',
    badge: 'Official Partner · Best Prices',
    deliveryTime: 'Same Day Delivery',
    discountRate: 18,
    rating: 4.8,
    verified: true,
    getSearchUrl: (query: string) => `https://www.1mg.com/search/all?name=${encodeURIComponent(query)}`,
  },
  {
    id: 'apollo',
    name: 'Apollo Pharmacy',
    logo: '🟢',
    badge: 'Express 2-Hr Delivery · 5000+ Stores',
    deliveryTime: '2-4 Hours Express',
    discountRate: 15,
    rating: 4.9,
    verified: true,
    getSearchUrl: (query: string) => `https://www.apollopharmacy.in/search-medicines/${encodeURIComponent(query)}`,
  },
  {
    id: 'netmeds',
    name: 'Netmeds',
    logo: '🔵',
    badge: 'India Ki Pharmacy · Trusted Since 1914',
    deliveryTime: '24-48 Hours',
    discountRate: 20,
    rating: 4.7,
    verified: true,
    getSearchUrl: (query: string) => `https://www.netmeds.com/catalogsearch/result/${encodeURIComponent(query)}/all`,
  },
  {
    id: 'pharmeasy',
    name: 'PharmEasy',
    logo: '🟡',
    badge: 'Fast Delivery & Cashback',
    deliveryTime: 'Next Day Delivery',
    discountRate: 22,
    rating: 4.7,
    verified: true,
    getSearchUrl: (query: string) => `https://pharmeasy.in/search/all?name=${encodeURIComponent(query)}`,
  },
  {
    id: 'amazon',
    name: 'Amazon Pharmacy',
    logo: '📦',
    badge: 'Prime Delivery & Refills',
    deliveryTime: '1-2 Days',
    discountRate: 12,
    rating: 4.8,
    verified: true,
    getSearchUrl: (query: string) => `https://www.amazon.com/s?k=${encodeURIComponent(query + ' medicine')}`,
  },
  {
    id: 'cvs',
    name: 'CVS Pharmacy',
    logo: '❤️',
    badge: 'US Prescription Care',
    deliveryTime: 'Same Day Pickup / Delivery',
    discountRate: 10,
    rating: 4.6,
    verified: true,
    getSearchUrl: (query: string) => `https://www.cvs.com/shop/search?q=${encodeURIComponent(query)}`,
  },
];

export function getEstimatedMedicineData(name: string, genericName: string): {
  estimatedPrice: number;
  packSize: string;
  manufacturer: string;
  requiresPrescription: boolean;
  scheduleCategory: 'Schedule H (Rx)' | 'Schedule H1 (Controlled Rx)' | 'OTC (Over The Counter)';
} {
  const lower = (name + ' ' + genericName).toLowerCase();

  if (lower.includes('warfarin') || lower.includes('coumadin')) {
    return {
      estimatedPrice: 65,
      packSize: 'Strip of 10 Tablets (Blister Pack)',
      manufacturer: 'Cipla Ltd / Abbott',
      requiresPrescription: true,
      scheduleCategory: 'Schedule H (Rx)',
    };
  }
  if (lower.includes('aspirin') || lower.includes('ecosprin')) {
    return {
      estimatedPrice: 18,
      packSize: 'Strip of 14 Tablets (Enteric Coated)',
      manufacturer: 'USV Ltd / Bayer',
      requiresPrescription: false,
      scheduleCategory: 'OTC (Over The Counter)',
    };
  }
  if (lower.includes('metformin') || lower.includes('glucophage')) {
    return {
      estimatedPrice: 38,
      packSize: 'Strip of 15 Tablets (Extended Release)',
      manufacturer: 'Sun Pharmaceutical / Sanofi',
      requiresPrescription: true,
      scheduleCategory: 'Schedule H (Rx)',
    };
  }
  if (lower.includes('amlodipine') || lower.includes('norvasc')) {
    return {
      estimatedPrice: 42,
      packSize: 'Strip of 15 Tablets',
      manufacturer: 'Pfizer / Torrent Pharma',
      requiresPrescription: true,
      scheduleCategory: 'Schedule H (Rx)',
    };
  }
  if (lower.includes('lisinopril')) {
    return {
      estimatedPrice: 85,
      packSize: 'Strip of 10 Tablets',
      manufacturer: 'AstraZeneca / Lupin',
      requiresPrescription: true,
      scheduleCategory: 'Schedule H (Rx)',
    };
  }
  if (lower.includes('atorvastatin') || lower.includes('lipitor')) {
    return {
      estimatedPrice: 110,
      packSize: 'Strip of 10 Tablets',
      manufacturer: 'Zydus Cadila / Viatris',
      requiresPrescription: true,
      scheduleCategory: 'Schedule H (Rx)',
    };
  }
  if (lower.includes('paracetamol') || lower.includes('dolo') || lower.includes('crocin')) {
    return {
      estimatedPrice: 22,
      packSize: 'Strip of 15 Tablets (500mg/650mg)',
      manufacturer: 'Micro Labs / GlaxoSmithKline',
      requiresPrescription: false,
      scheduleCategory: 'OTC (Over The Counter)',
    };
  }
  if (lower.includes('pantoprazole') || lower.includes('pan 40')) {
    return {
      estimatedPrice: 95,
      packSize: 'Strip of 15 Tablets (Delayed Release)',
      manufacturer: 'Alkem Laboratories Ltd',
      requiresPrescription: true,
      scheduleCategory: 'Schedule H (Rx)',
    };
  }
  if (lower.includes('gelusil') || lower.includes('digene') || lower.includes('antacid')) {
    return {
      estimatedPrice: 88,
      packSize: 'Bottle of 200ml Liquid Mint Syrup',
      manufacturer: 'Pfizer / Abbott Healthcare',
      requiresPrescription: false,
      scheduleCategory: 'OTC (Over The Counter)',
    };
  }
  if (lower.includes('cetirizine') || lower.includes('cetzine')) {
    return {
      estimatedPrice: 28,
      packSize: 'Strip of 10 Tablets',
      manufacturer: 'Dr. Reddy\'s Laboratories',
      requiresPrescription: false,
      scheduleCategory: 'OTC (Over The Counter)',
    };
  }
  if (lower.includes('ors') || lower.includes('electral')) {
    return {
      estimatedPrice: 22,
      packSize: 'Box of 4 Sachets (21.8g each)',
      manufacturer: 'FDC Limited',
      requiresPrescription: false,
      scheduleCategory: 'OTC (Over The Counter)',
    };
  }
  if (lower.includes('diclofenac') || lower.includes('volini')) {
    return {
      estimatedPrice: 75,
      packSize: 'Tube of 30g Gel',
      manufacturer: 'Sun Pharma Consumer',
      requiresPrescription: false,
      scheduleCategory: 'OTC (Over The Counter)',
    };
  }
  if (lower.includes('tramadol')) {
    return {
      estimatedPrice: 140,
      packSize: 'Strip of 10 Tablets',
      manufacturer: 'Torrent Pharma',
      requiresPrescription: true,
      scheduleCategory: 'Schedule H1 (Controlled Rx)',
    };
  }
  if (lower.includes('isabgol') || lower.includes('psyllium')) {
    return {
      estimatedPrice: 110,
      packSize: '100g Container (Natural Husk)',
      manufacturer: 'Dabur / Baidyanath',
      requiresPrescription: false,
      scheduleCategory: 'OTC (Over The Counter)',
    };
  }
  if (lower.includes('lactulose') || lower.includes('duphalac')) {
    return {
      estimatedPrice: 160,
      packSize: 'Bottle of 200ml Oral Solution',
      manufacturer: 'Abbott Healthcare',
      requiresPrescription: false,
      scheduleCategory: 'OTC (Over The Counter)',
    };
  }
  if (lower.includes('cremaffin')) {
    return {
      estimatedPrice: 125,
      packSize: 'Bottle of 225ml Emulsion',
      manufacturer: 'Abbott Healthcare',
      requiresPrescription: false,
      scheduleCategory: 'OTC (Over The Counter)',
    };
  }
  if (lower.includes('melatonin')) {
    return {
      estimatedPrice: 180,
      packSize: 'Strip of 10 Tablets (3mg)',
      manufacturer: 'Nutraceuticals / Sun Pharma',
      requiresPrescription: false,
      scheduleCategory: 'OTC (Over The Counter)',
    };
  }
  if (lower.includes('calamine')) {
    return {
      estimatedPrice: 85,
      packSize: 'Bottle of 120ml Soothing Lotion',
      manufacturer: 'Piramal Pharma',
      requiresPrescription: false,
      scheduleCategory: 'OTC (Over The Counter)',
    };
  }

  // Default standard fallback
  return {
    estimatedPrice: 48,
    packSize: 'Standard Strip of 10 Units',
    manufacturer: 'Certified WHO-GMP Pharma',
    requiresPrescription: true,
    scheduleCategory: 'Schedule H (Rx)',
  };
}
