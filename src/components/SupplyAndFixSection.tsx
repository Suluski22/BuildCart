import React from 'react';
import { ArrowRight, CheckCheck, Wrench, Sparkles, PlusCircle } from 'lucide-react';

interface SupplyAndFixSectionProps {
  onBookService: () => void;
  onExploreServices: () => void;
}

export const SupplyAndFixSection: React.FC<SupplyAndFixSectionProps> = ({
  onBookService,
  onExploreServices,
}) => {
  const pairings = [
    {
      material: 'Tiles',
      pro: 'Tiler',
      subtitle: 'Rectified porcelain, screed leveling, miter cuts & epoxy grout',
      image: '/src/assets/images/cat_tiles_flooring_1790163945050.jpg'
    },
    {
      material: 'Paint',
      pro: 'Painter',
      subtitle: 'Surface skim-coating, alkali-resistant primer & flawless rollering',
      image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80'
    },
    {
      material: 'Countertops',
      pro: 'Fabricator',
      subtitle: 'Laser templating, precision CNC cutting, undermount sinks & polishing',
      image: '/src/assets/images/cat_countertops_stone_1790163967414.jpg'
    },
    {
      material: 'Cabinetry',
      pro: 'Installer',
      subtitle: 'Laser-level carcass installation, soft-close hinge calibration & scribing',
      image: '/src/assets/images/cat_kitchen_cabinetry_1790163957321.jpg'
    }
  ];

  return (
    <section className="py-12 sm:py-18 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
          <span className="text-[11px] sm:text-xs font-bold text-[#001440] uppercase tracking-wider bg-[#FFC30B] px-3 py-1 rounded inline-block mb-2.5">
            Supply &amp; Fix Value Proposition
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#001440] font-['Cabinet_Grotesk'] tracking-tight text-balance">
            “Buy it. Book it. Get it done.”
          </h2>
          <p className="mt-2.5 text-sm sm:text-base lg:text-lg text-slate-700 font-medium leading-relaxed text-balance">
            Need tiles and a tiler? Paint and a painter? Countertops and a fabricator? Cabinetry and an installer? That’s where BuildCart comes in.
          </p>
        </div>

        {/* Pairing Grid */}
        <div className="grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {pairings.map((pair) => (
            <div
              key={pair.material}
              className="group bg-[#F1F4FA] rounded-2xl overflow-hidden border border-slate-200 hover:border-[#001440] transition-all hover:shadow-md flex flex-col justify-between"
            >
              <div className="relative h-36 sm:h-44 overflow-hidden bg-slate-200">
                <img
                  src={pair.image}
                  alt={`${pair.material} and ${pair.pro}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white">
                  <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider bg-[#001440]/80 px-2 py-0.5 rounded backdrop-blur-xs">
                    {pair.material}
                  </span>
                  <span className="text-[11px] sm:text-xs font-bold text-[#FFC30B] flex items-center gap-1">
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>{pair.pro}</span>
                  </span>
                </div>
              </div>

              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#001440] mb-1 flex items-center gap-1.5">
                    <span>{pair.material}</span>
                    <span className="text-slate-400 font-normal">&amp;</span>
                    <span className="text-[#001440]">{pair.pro}</span>
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed">
                    {pair.subtitle}
                  </p>
                </div>

                <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-slate-200/80 flex items-center justify-between">
                  <span className="text-[10px] sm:text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCheck className="w-3.5 h-3.5" />
                    <span>One bundled invoice</span>
                  </span>
                  <button
                    onClick={onBookService}
                    className="text-xs font-bold text-[#001440] hover:text-[#FFC30B] transition-colors cursor-pointer py-1 px-1.5"
                  >
                    Book Now →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Banner */}
        <div className="mt-8 sm:mt-12 bg-[#001440] rounded-2xl p-5 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6 shadow-md">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-lg sm:text-xl font-bold font-['Cabinet_Grotesk'] text-white">
              Already bought your materials elsewhere?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              No problem. You can still book our vetted Supply &amp; Fix professionals for labor-only installation.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto shrink-0">
            <button
              onClick={onExploreServices}
              className="w-full sm:w-auto px-5 py-3 text-xs sm:text-sm font-bold text-white bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl transition-colors cursor-pointer text-center min-h-[44px]"
            >
              View 8 Service Categories
            </button>
            <button
              onClick={onBookService}
              className="w-full sm:w-auto px-5 py-3 text-xs sm:text-sm font-bold text-[#001440] bg-[#FFC30B] hover:bg-[#e6af0a] rounded-xl transition-colors cursor-pointer text-center min-h-[44px]"
            >
              Book a Service
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
