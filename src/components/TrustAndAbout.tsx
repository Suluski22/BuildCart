import React from 'react';
import { Shield, CheckCircle, Target, Users, Clock, FileCheck } from 'lucide-react';
import { BuildCartLogo } from './BuildCartLogo';

export const TrustAndAbout: React.FC<{ onExploreShop: () => void }> = ({ onExploreShop }) => {
  return (
    <div className="py-10 sm:py-16 bg-[#F1F4FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Exact Trust Section */}
        <section className="bg-white rounded-3xl p-5 sm:p-10 lg:p-12 border border-slate-200 shadow-sm">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <span className="text-[11px] sm:text-xs font-bold text-[#FFC30B] uppercase tracking-wider bg-[#001440] px-3 py-1 rounded inline-block mb-2.5">
              Integrity in Construction
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#001440] font-['Cabinet_Grotesk'] tracking-tight text-balance">
              “We’re building BuildCart around trust.”
            </h2>
            <p className="mt-2 text-xs sm:text-sm lg:text-base text-slate-700 leading-relaxed text-balance">
              Construction in Kenya has suffered for too long from lack of accountability: mismatched dye lots, substandard adhesives, absentee artisans, and unexpected cost ballooning. BuildCart was created to replace uncertainty with structure, clarity, and dependable standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="p-5 sm:p-6 rounded-2xl bg-[#F1F4FA] border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-[#001440] text-[#FFC30B] flex items-center justify-center mb-3.5">
                <CheckCircle className="w-5 h-5" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#001440] mb-1.5">
                Verified Product Origins
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every tile, paint drum, board and fitting listed is sourced directly from certified manufacturers or authorized national distributors. No counterfeit or adulterated batches.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-[#F1F4FA] border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-[#001440] text-[#FFC30B] flex items-center justify-center mb-3.5">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#001440] mb-1.5">
                Trade-Tested Professionals
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our Supply &amp; Fix specialists are not random directory listings. They undergo practical skill evaluation, site reference checks, and adhere to strict workmanship checklists.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-[#F1F4FA] border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-[#001440] text-[#FFC30B] flex items-center justify-center mb-3.5">
                <FileCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#001440] mb-1.5">
                Transparent Pricing
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Clear prices in Kenyan Shillings with per-sqm or per-linear meter breakdowns. You know what materials cost and what installation labor costs before a hammer is lifted.
              </p>
            </div>
          </div>
        </section>

        {/* About / Why BuildCart / Our Promise Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
          <div className="lg:col-span-6 space-y-5">
            <div>
              <span className="text-[11px] sm:text-xs font-bold text-[#001440] uppercase tracking-wider block mb-1">
                About BuildCart
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#001440] font-['Cabinet_Grotesk'] tracking-tight">
                From Foundation to Finish, We’ve Got You.
              </h2>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <p>
                BuildCart is a Kenyan construction and home-improvement marketplace connecting property owners, contractors, and suppliers. Our initial focus is tackling the most critical and visual stage of any building project: <span className="font-semibold text-[#001440]">interior fittings and finishing works</span>.
              </p>
              <p>
                Finishing is where most budgets overrun and where poor execution is most visible. By coupling high-specification materials with certified Supply &amp; Fix installation, we remove the friction of having to bridge the gap between procurement and craftsmanship.
              </p>
            </div>

            {/* Why BuildCart Bullet Points */}
            <div className="space-y-2.5 pt-1">
              <h3 className="text-sm sm:text-base font-bold text-[#001440]">Our Promise to Every Client</h3>
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span><strong className="text-slate-900">Accountability:</strong> One unified platform coordinating materials delivery and installation.</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span><strong className="text-slate-900">Speed:</strong> Reduced site downtime with scheduled delivery and pre-briefed specialist crews.</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span><strong className="text-slate-900">Fairness:</strong> Transparent quotes for homeowners and guaranteed, timely payment for tradespeople.</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-[#001440] text-white p-6 sm:p-10 rounded-3xl shadow-xl space-y-5">
              <div className="overflow-x-auto py-1">
                <BuildCartLogo variant="dark" size="md" showTagline={true} />
              </div>

              <div className="border-t border-white/10 pt-5 space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <p>
                  “We built BuildCart because we experienced the pain of building firsthand in Nairobi. Running around hardware yards, praying that the tiler doesn’t ruin imported tiles, and managing multiple fragmented contacts shouldn’t be normal.”
                </p>
                <div className="pt-1 text-white font-semibold text-xs sm:text-sm">
                  The BuildCart Operations Team · Nairobi, Kenya
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onExploreShop}
                  className="w-full sm:w-auto px-6 py-3.5 text-xs sm:text-sm font-bold text-[#001440] bg-[#FFC30B] hover:bg-[#e8b209] rounded-xl transition-all cursor-pointer text-center min-h-[44px]"
                >
                  Shop Materials Now
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
