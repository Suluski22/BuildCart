import React from 'react';
import { ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';

export const ProblemSection: React.FC<{ onExploreClick: () => void }> = ({ onExploreClick }) => {
  return (
    <section className="py-12 sm:py-18 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-14">
          <span className="text-[11px] sm:text-xs font-bold text-[#FFC30B] uppercase tracking-wider bg-[#001440] px-3 py-1 rounded inline-block mb-2.5">
            The Reality of Building in Kenya
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#001440] font-['Cabinet_Grotesk'] tracking-tight text-balance">
            “Building shouldn’t be this complicated.”
          </h2>
          <p className="mt-3 text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed text-balance">
            Anyone who has built or renovated knows the friction: you find tiles at one hardware, spend days hunting for a reliable tiler, separately negotiate custom cabinetry, find a stone fabricator for countertops, and pray they all show up on time and don’t blame each other when measurements don’t match.
          </p>
        </div>

        {/* The Two Sides: Problem vs BuildCart Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {/* Fragmented Traditional Way */}
          <div className="bg-[#F1F4FA] p-5 sm:p-8 rounded-2xl border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-rose-700 font-bold text-xs sm:text-sm mb-3">
                <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                <span>The Fragmented Old Way</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3">
                Scattered suppliers &amp; unvetted fundis
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-bold shrink-0 mt-0.5">✕</span>
                  <span>Buying tiles from a yard, then gambling on an unverified tiler whose previous work you cannot verify.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-bold shrink-0 mt-0.5">✕</span>
                  <span>Cabinet maker builds carcass out of level; stone fabricator refuses to template or install the quartz countertop.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-bold shrink-0 mt-0.5">✕</span>
                  <span>Zero accountability for wasted materials, incorrect off-cuts, or shoddy waterproofing failures.</span>
                </li>
              </ul>
            </div>
            <div className="mt-5 pt-3.5 border-t border-slate-300/60 text-xs text-slate-500 font-medium">
              Result: Project delays, blown budgets, and constant site stress.
            </div>
          </div>

          {/* BuildCart Integrated Way */}
          <div className="bg-[#001440] text-white p-5 sm:p-8 rounded-2xl border border-[#001440] flex flex-col justify-between shadow-lg relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-[#FFC30B] font-bold text-xs sm:text-sm mb-3">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                <span>The BuildCart Solution</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2.5">
                “BuildCart brings the two sides together.”
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed">
                We combine vetted materials sourcing with certified professional Supply &amp; Fix services on one single platform.
              </p>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-200">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#FFC30B] font-bold shrink-0 mt-0.5">✓</span>
                  <span>Buy your materials with guaranteed specs, origin, and transparent per-meter or per-drum pricing.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#FFC30B] font-bold shrink-0 mt-0.5">✓</span>
                  <span>Book vetted specialists (tilers, painters, carpenters, gypsum installers, fabricators) in one click.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#FFC30B] font-bold shrink-0 mt-0.5">✓</span>
                  <span>Single point of coordination with verified milestone handovers and transparent workmanship standards.</span>
                </li>
              </ul>
            </div>

            <div className="mt-5 pt-3.5 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-xs text-slate-300 font-medium">Seamless materials + installation</span>
              <button
                onClick={onExploreClick}
                className="text-xs font-bold text-[#FFC30B] hover:underline flex items-center gap-1 cursor-pointer w-fit min-h-[36px]"
              >
                <span>Learn How It Works</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
