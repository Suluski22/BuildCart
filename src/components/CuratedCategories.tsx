import React from 'react';
import { ArrowRight, Layers } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { CategoryId } from '../types';

interface CuratedCategoriesProps {
  onSelectCategory: (catId: CategoryId) => void;
  onViewAllProducts: () => void;
}

export const CuratedCategories: React.FC<CuratedCategoriesProps> = ({
  onSelectCategory,
  onViewAllProducts,
}) => {
  // Filter only curated homepage categories
  const curated = CATEGORIES.filter((cat) => cat.isCuratedHome);

  return (
    <section className="py-12 sm:py-18 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <span className="text-[11px] sm:text-xs font-bold text-[#FFC30B] uppercase tracking-wider bg-[#001440] px-2.5 py-1 rounded inline-block mb-2.5">
              Core Finishing Collections
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#001440] font-['Cabinet_Grotesk'] tracking-tight">
              Featured Categories
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm lg:text-base text-slate-600 max-w-xl">
              Curated materials and fittings for residential homes, apartment fit-outs, and commercial interiors.
            </p>
          </div>

          <button
            onClick={onViewAllProducts}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#001440] hover:text-[#001440] group cursor-pointer border-b-2 border-[#FFC30B] pb-1 w-fit min-h-[36px]"
          >
            <span>View All 13 Categories</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#FFC30B]" />
          </button>
        </div>

        {/* 8 Curated Cards Grid: 1 col on < 400px, 2 col on >= 400px / sm, 4 col on lg */}
        <div className="grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {curated.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="group bg-[#F1F4FA] rounded-2xl overflow-hidden border border-slate-200 hover:border-[#001440] transition-all duration-200 hover:shadow-md cursor-pointer flex flex-col justify-between active:scale-[0.99]"
            >
              <div className="relative h-36 sm:h-44 overflow-hidden bg-slate-200">
                {cat.image ? (
                  <img
                    src={cat.image}
                    alt={cat.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400">
                    <Layers className="w-8 h-8 sm:w-10 sm:h-10" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#001440]/80 via-transparent to-transparent" />
                <span className="absolute top-2.5 left-2.5 text-[10px] sm:text-[11px] font-bold text-white bg-[#001440]/85 backdrop-blur-xs px-2 py-0.5 rounded">
                  {cat.index}
                </span>
              </div>

              <div className="p-3.5 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[#001440] group-hover:text-[#001440] transition-colors mb-1">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {cat.tagline}
                  </p>
                </div>

                <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs font-semibold text-[#001440]">
                  <span className="text-[10px] sm:text-xs text-slate-500 font-normal">
                    {cat.subcategories.length} sub-categories
                  </span>
                  <span className="text-[11px] sm:text-xs group-hover:translate-x-0.5 transition-transform text-[#001440]">
                    Explore →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
