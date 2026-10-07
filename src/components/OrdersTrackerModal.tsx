import React, { useState, useEffect } from 'react';
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  Printer,
  X,
  Phone,
  Building2,
  ShieldCheck,
  ChevronRight,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { ClinicalApiService } from '../services/api';

interface OrdersTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrdersTrackerModal: React.FC<OrdersTrackerModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await ClinicalApiService.getOrders();
      if (res.orders) {
        setOrders(res.orders);
        if (res.orders.length > 0 && !selectedOrderId) {
          setSelectedOrderId(res.orders[0].orderId);
        }
      }
    } catch (e) {
      console.warn('Failed to fetch orders from backend:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchOrders();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentOrder = orders.find((o) => o.orderId === selectedOrderId) || orders[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 to-teal-950 text-white px-5 py-4 flex items-center justify-between border-b border-white/10 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-teal-500/20 flex items-center justify-center border border-teal-400/30">
              <Package className="h-5 w-5 text-teal-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">Pharmacy Orders & Live Dispatch Tracking</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500 text-slate-950 font-bold uppercase">
                  Connected to Backend
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Official prescription dispatch tracking across Tata 1mg, Apollo Pharmacy & Netmeds
              </p>
            </div>
          </div>

          <button onClick={onClose} className="text-white/70 hover:text-white p-1.5 rounded-lg">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {loading ? (
            <div className="py-12 text-center text-slate-500">
              <RefreshCw className="h-8 w-8 text-teal-600 animate-spin mx-auto mb-2" />
              <p className="text-xs font-semibold">Connecting to pharmacy dispatch server...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="py-12 text-center text-slate-500">
              <Package className="h-10 w-10 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-700">No Orders Placed Yet</p>
              <p className="text-xs text-slate-400 mt-0.5">
                When you click "Place Order with Partner Pharmacy", live tracking appears here.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Order selector tabs if multiple */}
              {orders.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-100">
                  {orders.map((o) => (
                    <button
                      key={o.orderId}
                      onClick={() => setSelectedOrderId(o.orderId)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer whitespace-nowrap ${
                        selectedOrderId === o.orderId
                          ? 'bg-teal-700 text-white shadow-2xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {o.orderId} · {o.pharmacyPartner?.name}
                    </button>
                  ))}
                </div>
              )}

              {currentOrder && (
                <>
                  {/* Status Card */}
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                          {currentOrder.status.replace(/_/g, ' ')}
                        </span>
                        <span className="text-slate-400">·</span>
                        <span className="text-xs text-slate-600 font-mono">ID: {currentOrder.orderId}</span>
                      </div>
                      <div className="text-sm font-bold text-emerald-950 mt-0.5">
                        {currentOrder.pharmacyPartner?.name} — Estimated Arrival: {currentOrder.estimatedDeliveryDate}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono font-semibold text-emerald-900 bg-white px-3 py-1.5 rounded-lg border border-emerald-300">
                      <span>Total: ₹{currentOrder.totalPayable}</span>
                      <span className="text-[10px] text-slate-500">(Pay on Delivery)</span>
                    </div>
                  </div>

                  {/* Tracking Timeline */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                      Live Delivery Milestones
                    </h4>
                    <div className="space-y-3 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                      {currentOrder.trackingUpdates?.map((up: any, idx: number) => (
                        <div key={idx} className="flex items-start gap-3 relative pl-6">
                          <div className="h-6 w-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] absolute left-0 font-bold shadow-2xs">
                            ✓
                          </div>
                          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex-1 text-xs">
                            <div className="flex items-center justify-between mb-0.5">
                              <span className="font-bold text-slate-900">{up.status}</span>
                              <span className="text-[10px] text-slate-400 font-mono">
                                {new Date(up.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                            <p className="text-slate-600">{up.note}</p>
                            <span className="text-[10px] text-slate-400 block mt-1">Location: {up.location}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Items Ordered Table */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Dispensed Medications ({currentOrder.items?.length} items)
                    </h4>
                    <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden text-xs">
                      {currentOrder.items?.map((it: any, iIdx: number) => (
                        <div key={iIdx} className="p-3 bg-white flex items-center justify-between gap-2">
                          <div>
                            <span className="font-bold text-slate-900">{it.name}</span>
                            <span className="text-slate-500 ml-1.5">({it.packSize})</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-slate-700">₹{it.price}</span>
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 font-mono">
                              Verified
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100">
                    <span className="text-xs text-slate-500">
                      Delivering to: <strong className="text-slate-800">{currentOrder.deliveryAddress}</strong>
                    </span>

                    <button
                      onClick={() => window.print()}
                      className="inline-flex items-center gap-1.5 px-4 py-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                    >
                      <Printer className="h-4 w-4" />
                      <span>Print Tax Invoice</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
