import React from 'react';
import { Home, ShoppingBag, Wrench, ShoppingCart, CalendarCheck2 } from 'lucide-react';

interface MobileBottomNavProps {
  activeTab: string;
  onNavigate: (tab: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenBooking: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  onNavigate,
  cartCount,
  onOpenCart,
  onOpenBooking,
}) => {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 md:hidden shadow-[0_-2px_10px_rgba(0,0,0,0.06)]"
      aria-label="Mobile Bottom Navigation"
    >
      <div className="grid grid-cols-5 h-16 max-w-md mx-auto items-stretch">
        {/* Home */}
        <button
          onClick={() => {
            onNavigate('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center gap-1 min-h-[44px] transition-colors cursor-pointer ${
            activeTab === 'home'
              ? 'text-[#001440] font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
          aria-label="Go to Home"
        >
          <div className="relative">
            <Home className={`w-5 h-5 ${activeTab === 'home' ? 'stroke-[2.5] text-[#001440]' : 'stroke-2'}`} />
            {activeTab === 'home' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#FFC30B]" />
            )}
          </div>
          <span className="text-[10px] tracking-tight leading-none">Home</span>
        </button>

        {/* Shop */}
        <button
          onClick={() => {
            onNavigate('shop');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center gap-1 min-h-[44px] transition-colors cursor-pointer ${
            activeTab === 'shop'
              ? 'text-[#001440] font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
          aria-label="Go to Shop Materials"
        >
          <div className="relative">
            <ShoppingBag className={`w-5 h-5 ${activeTab === 'shop' ? 'stroke-[2.5] text-[#001440]' : 'stroke-2'}`} />
            {activeTab === 'shop' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#FFC30B]" />
            )}
          </div>
          <span className="text-[10px] tracking-tight leading-none">Shop</span>
        </button>

        {/* Services */}
        <button
          onClick={() => {
            onNavigate('supply-and-fix');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center gap-1 min-h-[44px] transition-colors cursor-pointer ${
            activeTab === 'supply-and-fix' || activeTab === 'services'
              ? 'text-[#001440] font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
          aria-label="Go to Supply & Fix Services"
        >
          <div className="relative">
            <Wrench
              className={`w-5 h-5 ${
                activeTab === 'supply-and-fix' || activeTab === 'services'
                  ? 'stroke-[2.5] text-[#001440]'
                  : 'stroke-2'
              }`}
            />
            {(activeTab === 'supply-and-fix' || activeTab === 'services') && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#FFC30B]" />
            )}
          </div>
          <span className="text-[10px] tracking-tight leading-none">Services</span>
        </button>

        {/* Cart */}
        <button
          onClick={onOpenCart}
          className="flex flex-col items-center justify-center gap-1 min-h-[44px] text-slate-500 hover:text-slate-800 transition-colors cursor-pointer relative"
          aria-label={`Open Cart (${cartCount} items)`}
        >
          <div className="relative">
            <ShoppingCart className="w-5 h-5 stroke-2" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#FFC30B] text-[#001440] font-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center border-2 border-white tabular-nums">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-tight leading-none">Cart</span>
        </button>

        {/* Book Pro */}
        <button
          onClick={onOpenBooking}
          className="flex flex-col items-center justify-center gap-1 min-h-[44px] text-[#001440] transition-colors cursor-pointer"
          aria-label="Book a Service Professional"
        >
          <div className="w-6 h-6 rounded-md bg-[#FFC30B] flex items-center justify-center text-[#001440] shadow-xs">
            <CalendarCheck2 className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>
          <span className="text-[10px] font-bold text-[#001440] tracking-tight leading-none">Book Pro</span>
        </button>
      </div>
    </nav>
  );
};
