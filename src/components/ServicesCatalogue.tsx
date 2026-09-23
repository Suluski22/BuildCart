import React from 'react';
import { Wrench, CheckCircle, Clock, Shield, ArrowRight, Sparkles } from 'lucide-react';
import { SUPPLY_AND_FIX_SERVICES } from '../data/services';
import { SupplyAndFixService } from '../types';

interface ServicesCatalogueProps {
  onBookService: (service?: SupplyAndFixService) => void;
  onShopMaterials: () => void;
}

export const ServicesCatalogue: React.FC<ServicesCatalogueProps> = ({
  onBookService,
  onShopMaterials,
}) => {
  return (
    <div className="py-8 sm:py-16 bg-[#F1F4FA] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mandatory Header Copy */}
        <div className="max-w-3xl mb-10 sm:mb-16">
          <span className="text-[11px] sm:text-xs font-bold text-[#FFC30B] uppercase tracking-wider bg-[#001440] px-3 py-1 rounded inline-block mb-3">
            Supply &amp; Fix Network (Kenya)
          </span>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#001440] font-['Cabinet_Grotesk'] tracking-tight mb-3 sm:mb-4 text-balance">
            “Need it installed? We can help with that too.”
          </h1>

          <p className="text-sm sm:text-lg lg:text-xl text-slate-700 leading-relaxed font-medium text-balance">
            Buying the material is only half the job. BuildCart connects you with vetted professionals who get the work done right the first time.
          </p>

          <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={() => onBookService()}
              className="px-6 py-3.5 text-xs sm:text-sm font-bold text-[#001440] bg-[#FFC30B] hover:bg-[#e8b209] rounded-xl shadow-xs transition-colors cursor-pointer text-center min-h-[44px]"
            >
              Book a Service
            </button>
            <button
              onClick={onShopMaterials}
              className="px-6 py-3.5 text-xs sm:text-sm font-bold text-[#001440] bg-white border border-slate-300 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer text-center min-h-[44px]"
            >
              Shop Materials First
            </button>
          </div>
        </div>

        {/* 8 Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {SUPPLY_AND_FIX_SERVICES.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs hover:shadow-md hover:border-[#001440] transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <span className="text-lg font-black text-slate-400 font-['Cabinet_Grotesk']">
                    {service.index}
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-[#001440] text-[#FFC30B] flex items-center justify-center">
                    <Wrench className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[#001440] mb-1.5 leading-snug">
                  {service.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-2 mb-3.5 leading-relaxed">
                  {service.subtitle}
                </p>

                {/* Scope items bullet points */}
                <div className="space-y-1.5 border-t border-slate-100 pt-3 mb-3.5">
                  <span className="text-[11px] font-bold text-slate-700 block">Scope Highlights:</span>
                  <ul className="text-[11px] text-slate-600 space-y-1">
                    {service.scopeItems.slice(0, 3).map((item, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                        <span className="line-clamp-1">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-3">
                <div className="text-[11px] text-slate-500 mb-2.5">
                  <span className="font-semibold text-slate-900 block">Labor Guide:</span>
                  <span className="text-[#001440] font-bold text-xs">{service.estimatedLaborRate}</span>
                </div>

                <button
                  onClick={() => onBookService(service)}
                  className="w-full py-2.5 px-3 text-xs font-bold text-[#001440] bg-[#FFC30B] hover:bg-[#e8b209] rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5 min-h-[42px] active:scale-[0.98]"
                >
                  <span>Book {service.title.split(' ')[0]}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Quality Assurance Banner */}
        <div className="mt-10 sm:mt-14 bg-[#001440] text-white p-5 sm:p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6 shadow-md">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-bold text-[#FFC30B] uppercase">
              <Shield className="w-4 h-4" />
              <span>BuildCart Quality Promise</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold font-['Cabinet_Grotesk'] text-white">
              Every Supply &amp; Fix booking is backed by verified standards
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Tradespeople are trade-tested, background-verified, and held to transparent checklist milestones before payment is disbursed.
            </p>
          </div>

          <button
            onClick={() => onBookService()}
            className="w-full md:w-auto px-6 py-3.5 text-xs sm:text-sm font-bold text-[#001440] bg-[#FFC30B] hover:bg-[#e8b209] rounded-xl transition-colors cursor-pointer whitespace-nowrap min-h-[44px]"
          >
            Start Service Request
          </button>
        </div>
      </div>
    </div>
  );
};
