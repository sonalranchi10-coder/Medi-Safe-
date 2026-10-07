export interface OrderPayload {
  rxId?: string;
  patientName?: string;
  patientPhone: string;
  deliveryAddress: string;
  pharmacyPartner: {
    id: string;
    name: string;
    deliveryTime: string;
    discountRate: number;
  };
  items: Array<{
    name: string;
    dosage: string;
    packSize: string;
    price: number;
    schedule: string;
  }>;
  subtotal: number;
  discountAmount: number;
  deliveryFee: number;
  totalPayable: number;
}

export interface DoctorApprovalPayload {
  rxId: string;
  patientName: string;
  doctorName: string;
  medicalLicenseNo: string;
  hospitalName: string;
  clinicalNotes: string;
}

export const ClinicalApiService = {
  // Pharmacy Orders
  async createOrder(payload: OrderPayload) {
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Order submission failed');
    return res.json();
  },

  async getOrders() {
    const res = await fetch('/api/orders');
    if (!res.ok) throw new Error('Failed to fetch orders');
    return res.json();
  },

  async getOrderById(id: string) {
    const res = await fetch(`/api/orders/${id}`);
    if (!res.ok) throw new Error('Order not found');
    return res.json();
  },

  // Prescriptions
  async savePrescription(data: any) {
    const res = await fetch('/api/prescriptions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async getPrescriptions() {
    const res = await fetch('/api/prescriptions');
    return res.json();
  },

  // Doctor Approvals & Audits
  async submitDoctorApproval(payload: DoctorApprovalPayload) {
    const res = await fetch('/api/approvals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Approval registration failed');
    return res.json();
  },

  async verifyPrescription(rxId: string) {
    const res = await fetch(`/api/verify-rx/${rxId}`);
    return res.json();
  },

  // Clinical Memos
  async submitClinicalMemo(data: { rxId: string; attendingDoctor: string; memoText: string }) {
    const res = await fetch('/api/clinical-memos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  // Drug Catalog Search
  async searchDrugs(query: string) {
    const res = await fetch(`/api/drugs/search?q=${encodeURIComponent(query)}`);
    return res.json();
  },
};
