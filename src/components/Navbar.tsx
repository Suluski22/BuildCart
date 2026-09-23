import React, { useState } from 'react';
import { ShoppingCart, Search, X, Phone } from 'lucide-react';
import { BuildCartLogo } from './BuildCartLogo';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  openCart: () => void;
  openBookingModal: () => void;
  openBrandModal?: () => void;
  openPartnerModal?: (type: 'supplier' | 'professional') => void;
  onSearch?: (query: string) => void;
}

export interface NavItem {
  name: string;
  tab: string;
  href: string;
}

export const MAIN_NAV_ITEMS: NavItem[] = [
  { name: 'Shop', tab: 'shop', href: '#shop' },
  { name: 'Services', tab: 'services', href: '#services' },
  { name: 'Supply & Fix', tab: 'supply-and-fix', href: '#supply-and-fix' },
  { name: 'How it works', tab: 'how-it-works', href: '#how-it-works' },
  { name: 'About', tab: 'about', href: '#about' },
  { name: 'Contact', tab: 'contact', href: '#contact' },
];

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  openCart,
  openBookingModal,
  onSearch,
}) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleNavClick = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setActiveTab('shop');
      if (onSearch) {
        onSearch(searchQuery.trim());
      }
      setSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-xs">
      {/* Top Bar - Exactly as in screenshot: Left tagline, Right yellow phone + number */}
      <div className="bg-[#001440] text-white py-2 sm:py-2.5 px-4 sm:px-6 lg:px-8 border-b border-[#001440]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Left: Tagline */}
          <div className="text-white text-xs sm:text-[13px] font-normal tracking-wide">
            From foundation to finish, we've got you.
          </div>

          {/* Right: Phone icon + phone number in yellow */}
          <a
            href="tel:0729256365"
            className="flex items-center gap-2 text-[#FFC30B] hover:text-[#eab309] transition-colors shrink-0 cursor-pointer"
            aria-label="Call 0729 256 365"
          >
            <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#FFC30B] stroke-[#FFC30B] shrink-0" />
            <span className="font-bold text-xs sm:text-sm tracking-normal whitespace-nowrap">0729 256 365</span>
          </a>
        </div>
      </div>

      {/* Main Navigation Bar - Structured exactly as in user screenshot */}
      <div className="bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4 lg:gap-8 overflow-x-auto scrollbar-none">
          {/* Left Zone: Brand Logo & Wordmark + Subtitle */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home');
            }}
            className="flex items-center cursor-pointer focus:outline-none text-left py-1 shrink-0"
            aria-label="BuildCart Home"
          >
            <BuildCartLogo
              variant="light"
              size="md"
              showTagline={true}
              customTagline="from foundation to finish"
            />
          </a>

          {/* Center Zone: 6 Main Navigation Links */}
          <nav
            className="flex items-center gap-5 sm:gap-6 lg:gap-8 xl:gap-9 shrink-0 text-slate-800 font-medium text-sm lg:text-[15px]"
            aria-label="Main Navigation"
          >
            {MAIN_NAV_ITEMS.map((item) => {
              const isActive = activeTab === item.tab;
              return (
                <a
                  key={item.tab}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.tab);
                  }}
                  className={`py-1 cursor-pointer whitespace-nowrap transition-colors ${
                    isActive
                      ? 'text-[#001440] font-bold'
                      : 'text-slate-700 hover:text-[#001440]'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.name}
                </a>
              );
            })}
          </nav>

          {/* Right Zone: Exact CTAs (Search, Cart, "Book a service") */}
          <div className="flex items-center gap-6 sm:gap-7 lg:gap-8 shrink-0">
            {/* Search Icon */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-slate-800 hover:text-[#001440] transition-colors cursor-pointer flex items-center justify-center p-1"
              aria-label="Search building materials"
            >
              <Search className="w-5 h-5 text-slate-800" strokeWidth={1.8} />
            </button>

            {/* Shopping Cart Icon with item count badge */}
            <button
              onClick={openCart}
              className="relative text-slate-800 hover:text-[#001440] transition-colors cursor-pointer flex items-center justify-center p-1"
              aria-label={`Shopping cart with ${cartCount} items`}
            >
              <ShoppingCart className="w-5 h-5 text-slate-800" strokeWidth={1.8} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[#FFC30B] text-[#001440] font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center border border-white tabular-nums shadow-xs">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </button>

            {/* Primary Action Button: "Book a service" */}
            <button
              onClick={openBookingModal}
              className="inline-flex items-center justify-center px-6 py-2.5 sm:py-3 text-sm font-bold text-[#001440] bg-[#FFC30B] hover:bg-[#eab309] rounded-xl shadow-xs transition-all cursor-pointer whitespace-nowrap active:scale-[0.98]"
            >
              Book a service
            </button>
          </div>
        </div>

        {/* Expandable Search Bar */}
        {searchOpen && (
          <div className="border-t border-slate-200 bg-[#F1F4FA] px-3 py-3 sm:px-6 lg:px-8 animate-in fade-in duration-100">
            <form onSubmit={handleSearchSubmit} className="max-w-3xl mx-auto flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search materials (e.g. porcelain tiles, paint, quartz, doors)..."
                  className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#001440] min-h-[42px]"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              </div>
              <button
                type="submit"
                className="px-4 py-2.5 text-xs sm:text-sm font-bold text-[#001440] bg-[#FFC30B] hover:bg-[#eab309] rounded-xl cursor-pointer shrink-0 min-h-[42px]"
              >
                Search
              </button>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="p-2 text-slate-500 hover:text-slate-800 rounded-xl cursor-pointer shrink-0 min-h-[42px] min-w-[42px] flex items-center justify-center"
                aria-label="Close search"
              >
                <X className="w-5 h-5" />
              </button>
            </form>
          </div>
        )}
      </div>
    </header>
  );
};
