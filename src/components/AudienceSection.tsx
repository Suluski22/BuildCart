import React, { useState } from 'react';
import { Home, HardHat, Store, Award, ArrowRight, CheckCircle2 } from 'lucide-react';

interface AudienceSectionProps {
  onShopClick: () => void;
  onBookServiceClick: () => void;
  onPartnerModal: (type: 'supplier' | 'professional') => void;
}

export const AudienceSection: React.FC<AudienceSectionProps> = ({
  onShopClick,
  onBookServiceClick,
  onPartnerModal,
}) => {
  const [activeTab, setActiveTab] = useState<'homeowners' | 'contractors' | 'suppliers' | 'professionals'>('homeowners');

  const audiences = [
    {
      id: 'homeowners' as const,
      label: 'Homeowners',
      fullLabel: 'For Homeowners',
      icon: Home,
      title: 'Building, renovating, or finishing your personal home?',
      description: 'Take the mystery out of interior finishing. Browse verified materials with transparent Kenyan pricing and book vetted professionals who deliver quality without corner-cutting.',
      benefits: [
        'Curated selection of high-quality tiles, sanitaryware, paints and cabinetry',
        'Direct access to vetted master tilers, painters, and carpenters',
        'No guesswork: clear per-sqm installation costs before work starts',
        'Milestone-based progress with complete peace of mind'
      ],
      ctaLabel: 'Shop Materials for Your Home',
      ctaAction: onShopClick
    },
    {
      id: 'contractors' as const,
      label: 'Contractors',
      fullLabel: 'For Contractors',
      icon: HardHat,
      title: 'Sourcing materials and specialized trades for client sites?',
      description: 'Streamline your project procurement. Consolidate your Bill of Quantities (BOQ), source guaranteed batches of finishing materials, and deploy vetted sub-contractors on demand.',
      benefits: [
        'Consolidated invoicing for materials and Supply & Fix labor',
        'Predictable batch deliveries scheduled directly to your site coordinates',
        'Reliable capacity: access certified specialists during peak project phases',
        'Trade pricing and bulk volume quotation support'
      ],
      ctaLabel: 'Book Specialists for Your Project',
      ctaAction: onBookServiceClick
    },
    {
      id: 'suppliers' as const,
      label: 'Suppliers',
      fullLabel: 'For Suppliers',
      icon: Store,
      title: 'Hardware stores, distributors, and manufacturers',
      description: 'Expand your distribution footprint across Kenya. BuildCart connects your inventory directly with ready homeowners and active general contractors looking for verified quality.',
      benefits: [
        'Immediate online storefront reach without tech overhead',
        'Direct sales without endless broker chains or delayed settlements',
        'Integrated Supply & Fix network ensures your materials are installed properly',
        'Real-time demand data on fast-moving finishing categories'
      ],
      ctaLabel: 'Become a BuildCart Supplier',
      ctaAction: () => onPartnerModal('supplier')
    },
    {
      id: 'professionals' as const,
      label: 'Tradespeople',
      fullLabel: 'For Professionals',
      icon: Award,
      title: 'Tilers, painters, carpenters, gypsum installers & fabricators',
      description: 'Get steady, high-paying jobs without running around searching for work. BuildCart brings you qualified clients with ready materials and clear project scopes.',
      benefits: [
        'Consistent stream of vetted installation and finishing gigs',
        'Work with quality materials: no struggling with warped boards or cheap adhesives',
        'Guaranteed prompt payout upon verified milestone completion',
        'Build your verified reputation and project portfolio on Kenya’s top platform'
      ],
      ctaLabel: 'Become a BuildCart Professional',
      ctaAction: () => onPartnerModal('professional')
    }
  ];

  const current = audiences.find((a) => a.id === activeTab) || audiences[0];
  const CurrentIcon = current.icon;

  return (
    <section className="py-12 sm:py-18 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12">
          <span className="text-[11px] sm:text-xs font-bold text-[#FFC30B] uppercase tracking-wider bg-[#001440] px-2.5 py-1 rounded inline-block mb-2.5">
            Designed for Every Stakeholder
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#001440] font-['Cabinet_Grotesk'] tracking-tight text-balance">
            Built for the Real Kenyan Market
          </h2>
          <p className="mt-2 text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed text-balance">
            Whether you are building your forever home, managing multiple sites, supplying materials, or practicing your trade.
          </p>
        </div>

        {/* Tab Controls (Responsive 2x2 grid on mobile, flex on desktop) */}
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:justify-center gap-1.5 sm:gap-2 p-1.5 bg-[#F1F4FA] rounded-2xl max-w-2xl mx-auto mb-8 border border-slate-200">
          {audiences.map((tab) => {
            const TabIcon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-center gap-2 px-3 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer min-h-[44px] ${
                  isActive
                    ? 'bg-[#001440] text-white shadow-xs font-bold'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <TabIcon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#FFC30B]' : 'text-slate-500'}`} />
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active Audience Card */}
        <div className="bg-[#F1F4FA] rounded-2xl p-5 sm:p-8 lg:p-10 border border-slate-200 shadow-sm max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6 sm:gap-8 items-start justify-between">
            <div className="space-y-4 max-w-2xl w-full">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#001440] text-[#FFC30B] flex items-center justify-center shrink-0">
                  <CurrentIcon className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#001440]">
                  {current.fullLabel}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-[#001440] font-['Cabinet_Grotesk'] leading-snug">
                {current.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {current.description}
              </p>

              <div className="space-y-2.5 pt-1">
                {current.benefits.map((b, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full md:w-auto shrink-0 md:self-center pt-2 md:pt-0">
              <button
                onClick={current.ctaAction}
                className="w-full md:w-auto px-6 py-3.5 text-xs sm:text-sm font-bold text-[#001440] bg-[#FFC30B] hover:bg-[#e8b209] rounded-xl shadow-xs transition-all cursor-pointer whitespace-nowrap active:scale-[0.98] flex items-center justify-center gap-2 min-h-[48px]"
              >
                <span>{current.ctaLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
