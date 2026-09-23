import React, { useState } from 'react';
import { X, Check, Wrench, ShieldCheck, Truck, Star, Plus, Minus, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, includeSupplyAndFix: boolean, notes?: string) => void;
  onRequestQuote: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onRequestQuote,
}) => {
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);
  const [includeSupplyAndFix, setIncludeSupplyAndFix] = useState(false);
  const [siteNotes, setSiteNotes] = useState('');
  const isQuote = product.pricingType === 'quote_required';

  const handleAdd = () => {
    onAddToCart(product, quantity, includeSupplyAndFix, siteNotes);
    onClose();
  };

  const handleQuote = () => {
    onRequestQuote(product);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 my-auto max-h-[92vh] flex flex-col md:grid md:grid-cols-2">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 p-2 text-slate-600 hover:text-slate-900 bg-white/90 hover:bg-white rounded-full transition-colors cursor-pointer shadow-xs min-h-[38px] min-w-[38px] flex items-center justify-center"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image & Gallery Column */}
        <div className="relative h-56 sm:h-72 md:h-full bg-slate-100 min-h-[220px] md:min-h-[340px] shrink-0">
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="absolute bottom-3 left-3 right-3 bg-black/75 backdrop-blur-md p-3 rounded-xl text-white text-xs">
            <div className="flex items-center justify-between mb-1 font-semibold text-[#FFC30B]">
              <span>{product.brand}</span>
              <span className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-[#FFC30B] text-[#FFC30B]" />
                <span>{product.rating} ({product.reviewsCount})</span>
              </span>
            </div>
            <p className="text-[11px] text-slate-200 truncate">
              Origin: {product.specs.origin || 'Verified'} · {product.leadTime}
            </p>
          </div>
        </div>

        {/* Details & Purchase Contiguous Column */}
        <div className="p-4 sm:p-6 lg:p-8 flex flex-col justify-between overflow-y-auto overscroll-contain space-y-5">
          <div className="space-y-4">
            <div>
              <span className="text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                {product.categoryId.replace(/-/g, ' ')}
              </span>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#001440] font-['Cabinet_Grotesk'] leading-snug">
                {product.name}
              </h2>
            </div>

            {/* Price / Quote Callout */}
            <div className="border-y border-slate-100 py-3">
              {isQuote ? (
                <div>
                  <span className="text-xs font-bold text-[#001440] uppercase bg-[#001440]/5 px-2.5 py-1 rounded inline-block">
                    Custom Bespoke Order
                  </span>
                  <p className="text-xs text-slate-600 mt-1">
                    Priced according to site measurement, linear meter runs, and custom accessories.
                  </p>
                </div>
              ) : (
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-black text-[#001440] font-['Cabinet_Grotesk'] tabular-nums">
                    KSh {product.priceKsh?.toLocaleString()}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {product.unit}
                  </span>
                </div>
              )}
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {product.description}
            </p>

            {/* Specifications Table */}
            <div className="bg-[#F1F4FA] p-3 rounded-xl text-xs space-y-1.5 border border-slate-200/80">
              <span className="font-bold text-[#001440] block mb-1 text-[11px]">Technical Specifications:</span>
              <div className="grid grid-cols-2 gap-2 text-slate-600 text-[11px]">
                <div><span className="font-medium text-slate-900">Material:</span> {product.specs.material}</div>
                <div><span className="font-medium text-slate-900">Finish:</span> {product.specs.finish}</div>
                {product.specs.size && <div><span className="font-medium text-slate-900">Size:</span> {product.specs.size}</div>}
                {product.specs.colour && <div><span className="font-medium text-slate-900">Colour:</span> {product.specs.colour}</div>}
                <div className="col-span-2"><span className="font-medium text-slate-900">Application:</span> {product.specs.application}</div>
              </div>
            </div>

            {/* Supply & Fix Integration Toggle */}
            {product.supplyAndFixAvailable && (
              <div className="p-3.5 rounded-xl border-2 border-[#FFC30B] bg-[#FFFBEB] space-y-2">
                <label className="flex items-start justify-between cursor-pointer gap-2">
                  <div>
                    <span className="text-xs font-bold text-[#001440] flex items-center gap-1.5">
                      <Wrench className="w-4 h-4 text-[#001440] shrink-0" />
                      <span>Add Supply &amp; Fix (Professional Installation)</span>
                    </span>
                    <p className="text-[11px] text-slate-600 mt-0.5">
                      Includes vetted master tradesperson, precision installation, and workmanship guarantee.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={includeSupplyAndFix}
                    onChange={(e) => setIncludeSupplyAndFix(e.target.checked)}
                    className="w-5 h-5 rounded text-[#001440] accent-[#001440] mt-0.5 shrink-0"
                  />
                </label>
                <div className="text-xs font-bold text-[#001440] pt-1.5 border-t border-[#FFC30B]/40 flex justify-between">
                  <span>Installation Rate:</span>
                  <span>+ KSh {product.supplyAndFixRateKsh?.toLocaleString()} {product.supplyAndFixUnit}</span>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Actions */}
          <div className="space-y-3 pt-3 border-t border-slate-100">
            {isQuote ? (
              <button
                onClick={handleQuote}
                className="w-full py-3.5 px-4 text-sm font-bold text-white bg-[#001440] hover:bg-[#001e5c] rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 min-h-[48px] active:scale-[0.98]"
              >
                <span>Request a Quote for this Material</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {/* Quantity Stepper */}
                <div className="flex items-center justify-between sm:justify-start border border-slate-200 rounded-xl bg-white overflow-hidden shrink-0 h-12 px-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-slate-100 text-slate-700 cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 text-sm font-bold tabular-nums text-slate-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-slate-100 text-slate-700 cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add to Cart button */}
                <button
                  onClick={handleAdd}
                  className="flex-1 py-3.5 px-4 text-xs sm:text-sm font-bold text-[#001440] bg-[#FFC30B] hover:bg-[#e8b209] rounded-xl shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-[0.98] min-h-[48px]"
                >
                  <span className="truncate">
                    Add {quantity} {product.unit.replace('per ', '')} to Cart
                  </span>
                  {includeSupplyAndFix && <span className="text-[11px] font-normal shrink-0">(+ Install)</span>}
                </button>
              </div>
            )}

            {/* Delivery Assurance */}
            <div className="flex items-center justify-center gap-3 text-[11px] text-slate-500 pt-1">
              <span className="flex items-center gap-1">
                <Truck className="w-3 h-3 text-[#001440]" />
                <span>Scheduled delivery</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#001440]" />
                <span>BuildCart guarantee</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
