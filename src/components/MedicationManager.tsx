import React, { useState } from 'react';
import { Pill, Plus, Trash2, Power, Clock, Info, Check, Search, ShieldCheck, ShoppingBag, ExternalLink } from 'lucide-react';
import { Medication } from '../types/medication';
import { COMMON_DRUGS_CATALOG } from '../data/drugDatabase';
import { getEstimatedMedicineData } from '../data/pharmacyPartners';

interface MedicationManagerProps {
  medications: Medication[];
  onToggleMedication: (id: string) => void;
  onRemoveMedication: (id: string) => void;
  onAddMedication: (newMed: Medication) => void;
  onUpdateTiming: (id: string, timing: Medication['timingSlot']) => void;
  onOpenPharmacy?: () => void;
}

export const MedicationManager: React.FC<MedicationManagerProps> = ({
  medications,
  onToggleMedication,
  onRemoveMedication,
  onAddMedication,
  onUpdateTiming,
  onOpenPharmacy,
}) => {
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCatalogDrug, setSelectedCatalogDrug] = useState<any>(null);
  const [customName, setCustomName] = useState<string>('');
  const [customDosage, setCustomDosage] = useState<string>('500mg');
  const [customFrequency, setCustomFrequency] = useState<string>('Once daily');
  const [customTiming, setCustomTiming] = useState<Medication['timingSlot']>('morning');

  const filteredCatalog = COMMON_DRUGS_CATALOG.filter(
    (d) =>
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.genericName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.class.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectCatalog = (drug: any) => {
    setSelectedCatalogDrug(drug);
    setCustomName(drug.name);
    setCustomDosage(drug.defaultDose);
    setCustomFrequency(drug.defaultFrequency);
  };

  const handleConfirmAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;

    const newMed: Medication = {
      id: `custom-${Date.now()}`,
      name: customName,
      genericName: selectedCatalogDrug ? selectedCatalogDrug.genericName : customName.split(' ')[0],
      dosage: customDosage || 'Standard dose',
      frequency: customFrequency || 'Once daily',
      timingSlot: customTiming,
      route: 'Oral',
      purpose: selectedCatalogDrug ? selectedCatalogDrug.class : 'Prescribed medicine',
      active: true,
    };

    onAddMedication(newMed);
    setShowAddModal(false);
    setSelectedCatalogDrug(null);
    setCustomName('');
    setSearchQuery('');
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden mb-6">
      <div className="border-b border-slate-100 bg-slate-50/70 px-5 py-3.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Pill className="h-5 w-5 text-teal-600" />
          <h2 className="text-base font-bold text-slate-800">Active Prescription Regimen</h2>
          <span className="text-xs text-slate-500 font-medium">({medications.length} items)</span>
        </div>

        <div className="flex items-center gap-2">
          {onOpenPharmacy && (
            <button
              onClick={onOpenPharmacy}
              className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              <span>🛒 Buy Prescribed Meds Online</span>
            </button>
          )}

          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-1.5 bg-teal-700 hover:bg-teal-800 text-white px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shadow-xs cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add Medicine</span>
          </button>
        </div>
      </div>

      <div className="p-5">
        {medications.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            <Pill className="h-10 w-10 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-medium">No medications added yet.</p>
            <p className="text-xs text-slate-400">Upload a prescription or click "Add Medicine" above.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {medications.map((med) => {
              const medData = getEstimatedMedicineData(med.name, med.genericName);
              const price = med.estimatedPrice || medData.estimatedPrice;
              const packSize = med.packSize || medData.packSize;
              const schedule = med.scheduleCategory || medData.scheduleCategory;

              return (
                <div
                  key={med.id}
                  className={`relative p-3.5 rounded-xl border transition-all ${
                    med.active
                      ? 'border-slate-200 bg-white shadow-xs hover:border-teal-400'
                      : 'border-slate-200/60 bg-slate-50/70 opacity-60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 leading-tight">{med.name}</h4>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-xs text-teal-700 font-medium">{med.genericName}</span>
                        <span className="text-[10px] px-1 py-0.2 rounded bg-slate-100 text-slate-600 font-mono">
                          {schedule.includes('OTC') ? 'OTC' : 'Rx'}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => onToggleMedication(med.id)}
                      className={`p-1 rounded-md transition-colors ${
                        med.active
                          ? 'text-emerald-700 hover:bg-emerald-50'
                          : 'text-slate-400 hover:bg-slate-200'
                      }`}
                      title={med.active ? 'Active (Click to temporarily pause)' : 'Paused (Click to activate)'}
                    >
                      <Power className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="space-y-1 text-xs text-slate-600 mb-2">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Dosage:</span>
                      <span className="font-semibold text-slate-800 font-mono">{med.dosage}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Schedule:</span>
                      <span className="text-slate-700 text-right truncate max-w-[130px]">{med.frequency}</span>
                    </div>
                  </div>

                  {/* Pricing and direct online purchase links */}
                  <div className="p-2 bg-slate-50 rounded-lg border border-slate-100 mb-2 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-900 font-mono">₹{price}</div>
                      <div className="text-[10px] text-slate-400 truncate max-w-[85px]">{packSize}</div>
                    </div>
                    <div className="flex items-center gap-1">
                      <a
                        href={`https://www.1mg.com/search/all?name=${encodeURIComponent(med.name)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 px-1.5 py-0.5 rounded border border-rose-200 transition-colors"
                        title={`Buy ${med.name} on Tata 1mg`}
                      >
                        1mg ↗
                      </a>
                      <a
                        href={`https://www.apollopharmacy.in/search-medicines/${encodeURIComponent(med.name)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-1.5 py-0.5 rounded border border-emerald-200 transition-colors"
                        title={`Buy ${med.name} on Apollo Pharmacy`}
                      >
                        Apollo ↗
                      </a>
                    </div>
                  </div>

                  {/* Timing slot select & remove */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1 text-[11px] text-slate-500">
                      <Clock className="h-3 w-3 text-slate-400" />
                      <select
                        aria-label={`Timing for ${med.name}`}
                        value={med.timingSlot}
                        onChange={(e) => onUpdateTiming(med.id, e.target.value as any)}
                        className="bg-slate-100 rounded px-1.5 py-0.5 text-[11px] font-medium text-slate-700 focus:outline-hidden"
                      >
                        <option value="morning">Morning</option>
                        <option value="afternoon">Lunch/Noon</option>
                        <option value="evening">Dinner/PM</option>
                        <option value="bedtime">Bedtime</option>
                        <option value="with-meals">With Meals</option>
                      </select>
                    </div>

                    <button
                      onClick={() => onRemoveMedication(med.id)}
                      className="text-slate-400 hover:text-rose-600 p-1 rounded transition-colors"
                      title="Remove from regimen"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-3 flex items-center gap-2 text-xs text-slate-500 bg-slate-50 px-3 py-2 rounded-xl border border-slate-100">
          <Info className="h-4 w-4 text-teal-600 flex-shrink-0" />
          <span>
            <strong>Pro Tip:</strong> Click the power button on any medicine to temporarily disable it and see if a dangerous drug interaction warning clears immediately.
          </span>
        </div>
      </div>

      {/* Add Medication Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Pill className="h-5 w-5 text-teal-600" />
                Add Medication to Regimen
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleConfirmAdd} className="space-y-4">
              {/* Quick Search from catalog */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Search Common Drugs Catalog
                </label>
                <div className="relative">
                  <Search className="h-4 w-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search e.g. Warfarin, Aspirin, Lisinopril, Statin..."
                    className="w-full rounded-xl border border-slate-300 pl-9 pr-3 py-2 text-xs focus:border-teal-600 focus:outline-hidden"
                  />
                </div>

                {searchQuery && (
                  <div className="mt-2 max-h-36 overflow-y-auto border border-slate-200 rounded-xl divide-y divide-slate-100 bg-slate-50/50">
                    {filteredCatalog.length === 0 ? (
                      <div className="p-2 text-xs text-slate-500 text-center">No match found. You can enter details manually below.</div>
                    ) : (
                      filteredCatalog.slice(0, 5).map((drug) => (
                        <button
                          key={drug.name}
                          type="button"
                          onClick={() => handleSelectCatalog(drug)}
                          className="w-full text-left p-2 hover:bg-teal-50 flex items-center justify-between text-xs transition-colors"
                        >
                          <div>
                            <span className="font-bold text-slate-800">{drug.name}</span>
                            <span className="text-slate-500 ml-1.5 font-normal">({drug.class})</span>
                          </div>
                          <span className="text-teal-700 font-mono text-[11px]">{drug.defaultDose}</span>
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>

              {/* Drug Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Medicine Name & Strength</label>
                <input
                  type="text"
                  required
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="e.g. Warfarin 5mg or Aspirin 75mg"
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs focus:border-teal-600 focus:outline-hidden"
                />
              </div>

              {/* Dosage & Frequency */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Dosage</label>
                  <input
                    type="text"
                    value={customDosage}
                    onChange={(e) => setCustomDosage(e.target.value)}
                    placeholder="e.g. 5mg, 500mg"
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs focus:border-teal-600 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Frequency</label>
                  <input
                    type="text"
                    value={customFrequency}
                    onChange={(e) => setCustomFrequency(e.target.value)}
                    placeholder="e.g. Once daily, Twice daily"
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs focus:border-teal-600 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Timing Slot */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Time of Day</label>
                <select
                  value={customTiming}
                  onChange={(e) => setCustomTiming(e.target.value as any)}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs focus:border-teal-600 focus:outline-hidden bg-white"
                >
                  <option value="morning">Morning (Breakfast)</option>
                  <option value="afternoon">Afternoon (Lunch)</option>
                  <option value="evening">Evening (Dinner)</option>
                  <option value="bedtime">Bedtime (Night)</option>
                  <option value="with-meals">With Meals</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-teal-700 hover:bg-teal-800 text-white shadow-xs"
                >
                  Add Medicine
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
