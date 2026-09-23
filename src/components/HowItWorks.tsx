import React from 'react';
import { Search, ShoppingCart, Truck, Wrench, CheckCircle2 } from 'lucide-react';

interface HowItWorksProps {
  onShopClick: () => void;
  onBookServiceClick: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({
  onShopClick,
  onBookServiceClick,
}) => {
  const steps = [
    {
      num: '01',
      title: 'Find what you need',
      desc: 'Browse 13 curated interior finishing categories or search specifically for porcelain tiles, paints, sanitaryware, countertops, or doors.',
      icon: Search,
    },
    {
      num: '02',
      title: 'Place your order',
      desc: 'Choose your quantities, finishes, and dimensions. Add standard materials to cart or submit custom dimensions for instant quotes.',
      icon: ShoppingCart,
    },
    {
      num: '03',
      title: 'We coordinate',
      desc: 'BuildCart confirms warehouse stock, schedules prompt site delivery, and consolidates supplier invoices for complete clarity.',
      icon: Truck,
    },
    {
      num: '04',
      title: 'Need installation? → Book Supply & Fix',
      desc: 'Easily add vetted installation to your materials order, or book stand-alone tradespeople (tilers, painters, carpenters, fabricators).',
      icon: Wrench,
      highlight: true,
    },
    {
      num: '05',
      title: 'Get the job done',
      desc: 'Work is delivered to your site, installed to high professional standards, inspected, and signed off with zero headache.',
      icon: CheckCircle2,
    },
  ];

  return (
    <section className="py-12 sm:py-18 bg-[#F1F4FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
          <span className="text-[11px] sm:text-xs font-bold text-[#001440] uppercase tracking-wider block mb-2">
            Clear, Predictable Workflow
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#001440] font-['Cabinet_Grotesk'] tracking-tight text-balance">
            How It Works
          </h2>
          <p className="mt-2.5 text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed text-balance">
            Five straightforward steps that take your project from foundation to finish without the traditional chaos.
          </p>
        </div>

        {/* 5-Step Process Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className={`p-5 sm:p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                  step.highlight
                    ? 'bg-[#001440] text-white border-[#001440] shadow-md lg:-translate-y-2'
                    : 'bg-white text-slate-900 border-slate-200/90 shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <span
                      className={`text-xl sm:text-2xl font-black font-['Cabinet_Grotesk'] ${
                        step.highlight ? 'text-[#FFC30B]' : 'text-[#001440]'
                      }`}
                    >
                      {step.num}
                    </span>
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                        step.highlight
                          ? 'bg-[#FFC30B] text-[#001440]'
                          : 'bg-[#F1F4FA] text-[#001440]'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3
                    className={`text-sm sm:text-base font-bold mb-2 leading-snug ${
                      step.highlight ? 'text-white' : 'text-[#001440]'
                    }`}
                  >
                    {step.title}
                  </h3>

                  <p
                    className={`text-xs leading-relaxed ${
                      step.highlight ? 'text-slate-300' : 'text-slate-600'
                    }`}
                  >
                    {step.desc}
                  </p>
                </div>

                <div
                  className={`mt-4 pt-3 text-[11px] font-semibold border-t ${
                    step.highlight ? 'border-white/10 text-[#FFC30B]' : 'border-slate-100 text-slate-500'
                  }`}
                >
                  Step {idx + 1} of 5
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Row */}
        <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-md mx-auto sm:max-w-none">
          <button
            onClick={onShopClick}
            className="w-full sm:w-auto px-6 py-3.5 text-xs sm:text-sm font-bold text-[#001440] bg-[#FFC30B] hover:bg-[#e8b209] rounded-xl shadow-xs transition-colors cursor-pointer text-center min-h-[44px]"
          >
            Shop Materials
          </button>
          <button
            onClick={onBookServiceClick}
            className="w-full sm:w-auto px-6 py-3.5 text-xs sm:text-sm font-bold text-white bg-[#001440] hover:bg-[#001e5c] rounded-xl shadow-xs transition-colors cursor-pointer text-center min-h-[44px]"
          >
            Book a Service
          </button>
        </div>
      </div>
    </section>
  );
};
