import React from 'react';
import { ArrowRight, Calendar } from 'lucide-react';
import heroHouseImage from '../assets/images/hero_luxury_house_right_1790170113370.jpg';

interface HeroProps {
  onShopClick: () => void;
  onBookServiceClick?: () => void;
  onSupplyAndFixClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onShopClick,
  onBookServiceClick,
  onSupplyAndFixClick,
}) => {
  const handleBookingClick = () => {
    if (onBookServiceClick) {
      onBookServiceClick();
    } else if (onSupplyAndFixClick) {
      onSupplyAndFixClick();
    }
  };

  return (
    <section className="relative bg-[#001440] text-white overflow-hidden min-h-[600px] sm:min-h-[660px] lg:min-h-[720px] flex items-center">
      {/* Background: Modern luxury architectural residence at night with warm golden lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src={heroHouseImage}
          alt="Modern luxury house at night with warm interior lighting"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center lg:object-right"
        />

        {/* Seamless dark navy gradient overlay: ensures high contrast for typography on left while revealing the illuminated house on right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#001440] via-[#001440]/80 sm:via-[#001440]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#001440]/90 via-transparent to-[#001440]/40 lg:hidden" />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
        <div className="max-w-2xl xl:max-w-3xl space-y-6 sm:space-y-8">
          {/* Eyebrow badge: KENYA • MATERIALS + INSTALL */}
          <div className="text-xs sm:text-sm font-black tracking-widest text-[#FFC30B] uppercase">
            KENYA • MATERIALS + INSTALL
          </div>

          {/* Main Headline: Build what you need. / Get it done. */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-black tracking-tight text-white font-['Cabinet_Grotesk'] leading-[1.08] text-balance">
            Build what you need.<br />
            Get it done.
          </h1>

          {/* Supporting Paragraph */}
          <div className="space-y-2 sm:space-y-2.5 text-base sm:text-lg md:text-xl text-slate-200/95 font-normal max-w-xl leading-relaxed">
            <p>
              Building materials, home-improvement products and trusted professionals — all in one place.
            </p>
            <p>
              Shop, have it delivered, and book someone to install it.
            </p>
          </div>

          {/* Buttons: Shop materials (Yellow) & Book a service (Outline with Calendar icon) */}
          <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 max-w-md sm:max-w-none">
            {/* Primary yellow button: Shop materials */}
            <button
              onClick={onShopClick}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base sm:text-lg font-bold text-[#001440] bg-[#FFC30B] hover:bg-[#eab309] rounded-xl shadow-lg transition-all cursor-pointer whitespace-nowrap active:scale-[0.98] group min-h-[52px]"
            >
              <span>Shop materials</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>

            {/* Secondary outline button: Book a service */}
            <button
              onClick={handleBookingClick}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base sm:text-lg font-semibold text-white bg-transparent hover:bg-white/10 border border-white/80 hover:border-white rounded-xl transition-all cursor-pointer whitespace-nowrap active:scale-[0.98] min-h-[52px]"
            >
              <span>Book a service</span>
              <Calendar className="w-5 h-5 text-white/90" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
