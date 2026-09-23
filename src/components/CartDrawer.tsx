import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, Wrench, ArrowRight, ShieldCheck, CheckCircle2, Truck } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onToggleSupplyAndFix: (id: string) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onToggleSupplyAndFix,
  onRemoveItem,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryEstate, setDeliveryEstate] = useState('');
  const [deliveryZone, setDeliveryZone] = useState<'nairobi' | 'kiambu' | 'upcountry'>('nairobi');
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'card' | 'cod'>('mpesa');
  const [orderRef, setOrderRef] = useState('');

  // Calculations
  const materialsSubtotal = items.reduce((acc, item) => {
    return acc + (item.product.priceKsh || 0) * item.quantity;
  }, 0);

  const installationSubtotal = items.reduce((acc, item) => {
    if (item.includeSupplyAndFix && item.product.supplyAndFixRateKsh) {
      return acc + item.product.supplyAndFixRateKsh * item.quantity;
    }
    return acc;
  }, 0);

  const deliveryFee = items.length === 0 ? 0 : deliveryZone === 'nairobi' ? 1500 : deliveryZone === 'kiambu' ? 2500 : 4500;
  const grandTotal = materialsSubtotal + installationSubtotal + deliveryFee;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = 'BC-' + Math.floor(100000 + Math.random() * 900000);
    setOrderRef(ref);
    setCheckoutStep('success');
  };

  const handleDone = () => {
    onClearCart();
    setCheckoutStep('cart');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-full sm:max-w-md md:max-w-lg bg-white shadow-2xl flex flex-col justify-between h-full">
          {/* Header */}
          <div className="p-4 sm:p-6 bg-[#001440] text-white flex items-center justify-between border-b border-white/10 shrink-0">
            <div>
              <span className="text-[11px] sm:text-xs font-bold text-[#FFC30B] uppercase tracking-wider block">
                Your BuildCart Order
              </span>
              <h2 className="text-lg sm:text-xl font-bold font-['Cabinet_Grotesk'] text-white">
                {checkoutStep === 'cart'
                  ? `Shopping Cart (${items.length} ${items.length === 1 ? 'item' : 'items'})`
                  : checkoutStep === 'checkout'
                  ? 'Delivery & Payment'
                  : 'Order Confirmed'}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-300 hover:text-white rounded-xl bg-white/10 hover:bg-white/20 transition-colors cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6 space-y-5">
            {checkoutStep === 'cart' && (
              <>
                {items.length === 0 ? (
                  <div className="text-center py-16 space-y-4">
                    <p className="text-sm text-slate-500">Your cart is currently empty.</p>
                    <button
                      onClick={onClose}
                      className="px-6 py-3 text-xs sm:text-sm font-bold text-[#001440] bg-[#FFC30B] hover:bg-[#eab309] rounded-xl cursor-pointer min-h-[44px]"
                    >
                      Browse Materials Catalogue
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => {
                      const itemMaterialTotal = (item.product.priceKsh || 0) * item.quantity;

                      return (
                        <div
                          key={item.id}
                          className="bg-[#F1F4FA] p-3.5 sm:p-4 rounded-xl border border-slate-200/90 space-y-3"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex gap-3 min-w-0">
                              <img
                                src={item.product.image}
                                alt={item.product.name}
                                referrerPolicy="no-referrer"
                                className="w-14 h-14 rounded-lg object-cover bg-white shrink-0 border border-slate-200"
                              />
                              <div className="min-w-0">
                                <h4 className="text-xs font-bold text-[#001440] line-clamp-2 leading-snug">
                                  {item.product.name}
                                </h4>
                                <div className="text-[11px] text-slate-500 mt-0.5 truncate">
                                  {item.product.brand} · KSh {item.product.priceKsh?.toLocaleString()} {item.product.unit}
                                </div>
                              </div>
                            </div>

                            <button
                              onClick={() => onRemoveItem(item.id)}
                              className="text-slate-400 hover:text-rose-600 transition-colors p-1.5 min-h-[36px] min-w-[36px] flex items-center justify-center shrink-0"
                              title="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Quantity and Price */}
                          <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                            <div className="flex items-center border border-slate-300 rounded-lg bg-white overflow-hidden h-9">
                              <button
                                onClick={() => onUpdateQuantity(item.id, -1)}
                                className="w-8 h-full flex items-center justify-center hover:bg-slate-100 text-slate-700"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="px-2.5 text-xs font-bold tabular-nums">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(item.id, 1)}
                                className="w-8 h-full flex items-center justify-center hover:bg-slate-100 text-slate-700"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <div className="text-right">
                              <div className="text-xs sm:text-sm font-black text-[#001440] tabular-nums">
                                KSh {itemMaterialTotal.toLocaleString()}
                              </div>
                              <span className="text-[10px] text-slate-500">Materials subtotal</span>
                            </div>
                          </div>

                          {/* Supply & Fix Integration Switch */}
                          {item.product.supplyAndFixAvailable && (
                            <div className="pt-2 border-t border-slate-200/80">
                              <label className="flex items-center justify-between text-xs cursor-pointer bg-white p-2.5 rounded-lg border border-slate-200 min-h-[44px]">
                                <div className="flex items-center gap-2">
                                  <Wrench className="w-3.5 h-3.5 text-[#001440] shrink-0" />
                                  <span className="font-semibold text-[#001440]">
                                    Supply &amp; Fix (+ Install)
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                  <span className="text-[11px] font-bold text-slate-700 tabular-nums">
                                    + KSh {((item.product.supplyAndFixRateKsh || 0) * item.quantity).toLocaleString()}
                                  </span>
                                  <input
                                    type="checkbox"
                                    checked={item.includeSupplyAndFix}
                                    onChange={() => onToggleSupplyAndFix(item.id)}
                                    className="w-4 h-4 rounded text-[#001440] accent-[#001440]"
                                  />
                                </div>
                              </label>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            )}

            {checkoutStep === 'checkout' && (
              <form id="checkout-form" onSubmit={handleCheckoutSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Grace Wanjiku"
                    className="w-full bg-[#F1F4FA] border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-[#001440] outline-none min-h-[44px]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">M-Pesa / Contact Phone *</label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="e.g. 0712 345 678"
                    className="w-full bg-[#F1F4FA] border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-[#001440] outline-none min-h-[44px]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Delivery Destination / Estate *</label>
                  <input
                    type="text"
                    required
                    value={deliveryEstate}
                    onChange={(e) => setDeliveryEstate(e.target.value)}
                    placeholder="e.g. Westlands, General Mathenge Drive"
                    className="w-full bg-[#F1F4FA] border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-[#001440] outline-none min-h-[44px]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Delivery Zone</label>
                  <select
                    value={deliveryZone}
                    onChange={(e) => setDeliveryZone(e.target.value as any)}
                    className="w-full bg-[#F1F4FA] border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-[#001440] outline-none min-h-[44px]"
                  >
                    <option value="nairobi">Nairobi Metro (KSh 1,500)</option>
                    <option value="kiambu">Kiambu / Machakos / Kajiado (KSh 2,500)</option>
                    <option value="upcountry">Upcountry Freight / Regional (KSh 4,500)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">Payment Method</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('mpesa')}
                      className={`p-2.5 rounded-xl border text-xs font-bold text-center cursor-pointer min-h-[44px] ${
                        paymentMethod === 'mpesa'
                          ? 'border-[#001440] bg-[#001440] text-[#FFC30B]'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      Lipa na M-Pesa
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-2.5 rounded-xl border text-xs font-bold text-center cursor-pointer min-h-[44px] ${
                        paymentMethod === 'card'
                          ? 'border-[#001440] bg-[#001440] text-[#FFC30B]'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      Credit / Debit
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cod')}
                      className={`p-2.5 rounded-xl border text-xs font-bold text-center cursor-pointer min-h-[44px] ${
                        paymentMethod === 'cod'
                          ? 'border-[#001440] bg-[#001440] text-[#FFC30B]'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      Pay on Site
                    </button>
                  </div>
                </div>
              </form>
            )}

            {checkoutStep === 'success' && (
              <div className="text-center py-6 sm:py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-[#001440] font-['Cabinet_Grotesk']">
                  Order Successfully Placed!
                </h3>
                <div className="text-sm font-bold text-[#001440] bg-[#F1F4FA] py-2 px-4 rounded-xl inline-block border border-slate-200">
                  Reference: {orderRef}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
                  Thank you, <span className="font-semibold text-slate-900">{customerName}</span>. Your materials &amp; Supply &amp; Fix order has been logged. Our dispatch coordinator is preparing warehouse packing.
                </p>

                <div className="p-3.5 bg-slate-50 rounded-xl text-left text-xs space-y-1.5 text-slate-600 border border-slate-200">
                  <div className="font-bold text-[#001440]">Order Summary:</div>
                  <div>Materials Subtotal: KSh {materialsSubtotal.toLocaleString()}</div>
                  {installationSubtotal > 0 && (
                    <div>Supply &amp; Fix Labor: KSh {installationSubtotal.toLocaleString()}</div>
                  )}
                  <div>Site Delivery: KSh {deliveryFee.toLocaleString()}</div>
                  <div className="font-bold text-slate-900 pt-1.5 border-t border-slate-200">
                    Total: KSh {grandTotal.toLocaleString()}
                  </div>
                </div>

                <div className="text-[11px] text-slate-500">
                  A receipt &amp; M-Pesa prompt have been sent to {customerPhone}.
                </div>

                <button
                  onClick={handleDone}
                  className="w-full py-3.5 px-4 text-xs sm:text-sm font-bold text-[#001440] bg-[#FFC30B] hover:bg-[#e8b209] rounded-xl transition-colors cursor-pointer min-h-[48px]"
                >
                  Done &amp; Continue Shopping
                </button>
              </div>
            )}
          </div>

          {/* Footer Subtotal & Action Bar */}
          {checkoutStep !== 'success' && items.length > 0 && (
            <div className="p-4 sm:p-6 bg-[#F1F4FA] border-t border-slate-200 space-y-3 shrink-0">
              <div className="space-y-1 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Materials Subtotal</span>
                  <span className="font-semibold text-slate-900 tabular-nums">
                    KSh {materialsSubtotal.toLocaleString()}
                  </span>
                </div>

                {installationSubtotal > 0 && (
                  <div className="flex justify-between text-[#001440] font-semibold">
                    <span className="flex items-center gap-1">
                      <Wrench className="w-3.5 h-3.5" />
                      <span>Supply &amp; Fix Labor</span>
                    </span>
                    <span className="tabular-nums">+ KSh {installationSubtotal.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Estimated Delivery</span>
                  <span className="font-semibold text-slate-900 tabular-nums">
                    KSh {deliveryFee.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between text-base font-black text-[#001440] pt-2 border-t border-slate-300/60 font-['Cabinet_Grotesk']">
                  <span>Total (KSh)</span>
                  <span className="tabular-nums">KSh {grandTotal.toLocaleString()}</span>
                </div>
              </div>

              {checkoutStep === 'cart' ? (
                <button
                  onClick={() => setCheckoutStep('checkout')}
                  className="w-full py-3.5 px-4 text-sm font-bold text-[#001440] bg-[#FFC30B] hover:bg-[#e8b209] rounded-xl shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-[0.98] min-h-[48px]"
                >
                  <span>Proceed to Delivery &amp; Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setCheckoutStep('cart')}
                    className="py-3 px-4 text-xs font-bold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 cursor-pointer min-h-[48px]"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    form="checkout-form"
                    className="flex-1 py-3 px-4 text-xs sm:text-sm font-bold text-[#001440] bg-[#FFC30B] hover:bg-[#e8b209] rounded-xl shadow-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-[0.98] min-h-[48px]"
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span className="truncate">Confirm (KSh {grandTotal.toLocaleString()})</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
