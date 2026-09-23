import React from 'react';
import { ShoppingBag, Wrench, Building2, ArrowRight } from 'lucide-react';

interface WhatIsBuildCartProps {
  onShopClick: () => void;
  onFixClick: () => void;
  onBuildClick: () => void;
}

export const WhatIsBuildCart: React.FC<WhatIsBuildCartProps> = ({
  onShopClick,
  onFixClick,
  onBuildClick,
}) => {
  return (
    <section className="py-12 sm:py-18 bg-[#F1F4FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
          <span className="text-[11px] sm:text-xs font-bold text-[#001440] uppercase tracking-wider block mb-2">
            The BuildCart Ecosystem
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#001440] font-['Cabinet_Grotesk'] tracking-tight text-balance">
            “One place for materials. One place for the job.”
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-slate-600 leading-relaxed text-balance">
            We are simplifying the entire Kenya construction and home improvement journey with three clear pillars designed to solve real site headaches.
          </p>
        </div>

        {/* Three Columns: SHOP, FIX, BUILD */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {/* Column 1: SHOP */}
          <div className="bg-white p-5 sm:p-7 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#001440] text-[#FFC30B] flex items-center justify-center mb-5 shadow-sm">
                <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-[#001440] font-['Cabinet_Grotesk'] mb-2.5">
                SHOP
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                Find building and home-improvement materials from trusted suppliers.
              </p>
              <ul className="text-xs text-slate-500 space-y-2 border-t border-slate-100 pt-3.5">
                <li>• 13 curated interior finishing categories</li>
                <li>• Transparent per-sqm &amp; per-unit pricing in KSh</li>
                <li>• Verified manufacturer specs &amp; origin</li>
                <li>• Scheduled delivery to your site or gate</li>
              </ul>
            </div>
            <button
              onClick={onShopClick}
              className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-[#001440] hover:text-[#001440] group cursor-pointer pt-3 border-t border-slate-100 min-h-[40px]"
            >
              <span>Explore Materials Catalogue</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 text-[#FFC30B]" />
            </button>
          </div>

          {/* Column 2: FIX */}
          <div className="bg-white p-5 sm:p-7 rounded-2xl border-2 border-[#FFC30B] shadow-md hover:shadow-lg transition-shadow flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#FFC30B] text-[#001440] text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
              Core Specialty
            </div>
            <div>
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#FFC30B] text-[#001440] flex items-center justify-center mb-5 shadow-sm">
                <Wrench className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-[#001440] font-['Cabinet_Grotesk'] mb-2.5">
                FIX
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                Book professionals for installation, repairs and finishing work.
              </p>
              <ul className="text-xs text-slate-500 space-y-2 border-t border-slate-100 pt-3.5">
                <li>• 8 Supply &amp; Fix service specialisms</li>
                <li>• Master tilers, painters, carpenters &amp; glaziers</li>
                <li>• Transparent labor rates per square or linear meter</li>
                <li>• Structured milestone quality sign-offs</li>
              </ul>
            </div>
            <button
              onClick={onFixClick}
              className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-[#001440] hover:text-[#001440] group cursor-pointer pt-3 border-t border-slate-100 min-h-[40px]"
            >
              <span>Book Supply &amp; Fix Services</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 text-[#001440]" />
            </button>
          </div>

          {/* Column 3: BUILD */}
          <div className="bg-white p-5 sm:p-7 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#001440] text-white flex items-center justify-center mb-5 shadow-sm">
                <Building2 className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-[#001440] font-['Cabinet_Grotesk'] mb-2.5">
                BUILD
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                Full-scope project support from BOQ estimation to site execution.
              </p>
              <ul className="text-xs text-slate-500 space-y-2 border-t border-slate-100 pt-3.5">
                <li>• End-to-end site material logistics</li>
                <li>• Trade discounts for contractors &amp; developers</li>
                <li>• Vetted multi-trade site management</li>
                <li>• Transparent project budgeting assistance</li>
              </ul>
            </div>
            <button
              onClick={onBuildClick}
              className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-[#001440] hover:text-[#001440] group cursor-pointer pt-3 border-t border-slate-100 min-h-[40px]"
            >
              <span>View Contractor Solutions</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 text-[#FFC30B]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
