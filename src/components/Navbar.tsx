import React, { useState } from 'react';
import { ShoppingCart, Search, Menu, X, Phone, MessageSquare, Wrench, Sparkles, ChevronRight, Layers, Award } from 'lucide-react';
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
  openBrandModal,
  openPartnerModal,
  onSearch,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleNavClick = (tab: string) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
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
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-xs">
      {/* Top Bar - Preserved exact styling: Brand Promise on left, phone number on top right */}
      <div className="bg-[#001440] text-white text-[11px] sm:text-xs py-2 px-3 sm:px-6 lg:px-8 border-b border-[#001440]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Left: Tagline */}
          <div className="text-white font-normal truncate max-w-[210px] sm:max-w-none">
            From foundation to finish, we've got you.
          </div>

          {/* Right: Phone icon + phone number */}
          <a
            href="tel:0729256365"
            className="flex items-center gap-1.5 text-[#FFC30B] hover:opacity-90 font-medium transition-opacity shrink-0 min-h-[28px]"
            aria-label="Call BuildCart Kenya at 0729 256 365"
          >
            <Phone className="w-3.5 h-3.5 fill-[#FFC30B] stroke-[#FFC30B] shrink-0" />
            <span className="font-bold tracking-normal whitespace-nowrap">0729 256 365</span>
          </a>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-6">
          {/* Left Zone: Brand Logo & Wordmark (Proper working hyperlink to Home) */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home');
            }}
            className="flex items-center cursor-pointer focus:outline-none text-left py-1 shrink-0"
            aria-label="BuildCart Home"
          >
            <div className="sm:hidden">
              <BuildCartLogo
                variant="light"
                size="sm"
                showTagline={true}
                customTagline="foundation to finish"
              />
            </div>
            <div className="hidden sm:block">
              <BuildCartLogo
                variant="light"
                size="md"
                showTagline={true}
                customTagline="from foundation to finish"
              />
            </div>
          </a>

          {/* Center Zone: Main Navigation Links on Toolbar */}
          {/* Visible on desktop/tablets with clean spacing and clear active indicators */}
          <nav
            className="hidden md:flex items-center gap-3.5 lg:gap-6 xl:gap-8 text-sm lg:text-[15px] font-medium text-slate-700"
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
                  className={`transition-colors py-1 cursor-pointer whitespace-nowrap relative text-sm lg:text-[15px] ${
                    isActive
                      ? 'text-[#001440] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2.5px] after:bg-[#FFC30B] after:rounded-full'
                      : 'text-slate-600 hover:text-[#001440]'
                  }`}
                >
                  {item.name}
                </a>
              );
            })}
          </nav>

          {/* Right Zone: Search, Cart Icon, Primary "Book a service" CTA & Mobile Hamburger */}
          <div className="flex items-center gap-1.5 sm:gap-3 lg:gap-4 shrink-0">
            {/* Search Icon */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-slate-800 hover:text-[#001440] hover:bg-slate-100 rounded-full transition-colors cursor-pointer active:scale-95"
              aria-label="Search building materials"
            >
              <Search className="w-5 h-5 stroke-[2]" />
            </button>

            {/* Shopping Cart Icon with item count badge */}
            <button
              onClick={openCart}
              className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-slate-800 hover:text-[#001440] hover:bg-slate-100 rounded-full transition-colors cursor-pointer active:scale-95"
              aria-label={`Shopping cart with ${cartCount} items`}
            >
              <ShoppingCart className="w-5 h-5 stroke-[2]" />
              {cartCount > 0 && (
                <span className="absolute top-1.5 right-1.5 bg-[#FFC30B] text-[#001440] font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center border border-white tabular-nums">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </button>

            {/* Primary Action Button: "Book a service" - Visible and clickable on both mobile and desktop */}
            <button
              onClick={openBookingModal}
              className="inline-flex items-center justify-center px-2.5 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-[#001440] bg-[#FFC30B] hover:bg-[#eab309] rounded-xl shadow-xs transition-all cursor-pointer whitespace-nowrap active:scale-[0.98] min-h-[38px] sm:min-h-[40px]"
            >
              <span className="sm:hidden">Book</span>
              <span className="hidden sm:inline">Book a service</span>
            </button>

            {/* Mobile Hamburger Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center text-slate-800 hover:bg-slate-100 rounded-xl cursor-pointer active:scale-95 min-h-[44px] min-w-[44px]"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <div
              className="md:hidden fixed inset-0 top-[108px] sm:top-[124px] bg-black/50 z-30 animate-in fade-in duration-150"
              onClick={() => setMobileMenuOpen(false)}
            />

            <div className="md:hidden absolute top-full left-0 right-0 z-40 bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-4 shadow-2xl max-h-[calc(100vh-124px)] overflow-y-auto">
              {/* Primary Mobile Navigation Links - Exact 6 Links */}
              <div className="flex flex-col divide-y divide-slate-100 text-sm font-semibold text-slate-800">
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
                      className={`flex items-center justify-between py-3 px-2 rounded-lg text-left transition-colors min-h-[44px] cursor-pointer ${
                        isActive ? 'text-[#001440] bg-[#F1F4FA] font-bold' : 'text-slate-800 hover:bg-slate-50'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{item.name}</span>
                        {item.tab === 'shop' && (
                          <span className="text-[10px] bg-[#001440] text-white px-1.5 py-0.5 rounded font-normal">
                            13 Categories
                          </span>
                        )}
                        {item.tab === 'supply-and-fix' && (
                          <span className="text-[10px] bg-[#FFC30B] text-[#001440] px-1.5 py-0.5 rounded font-bold">
                            Pro Install
                          </span>
                        )}
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </a>
                  );
                })}
              </div>

              {/* Call to Actions in Drawer */}
              <div className="pt-2 space-y-2.5">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openBookingModal();
                  }}
                  className="w-full py-3.5 px-4 text-center font-bold text-sm text-[#001440] bg-[#FFC30B] hover:bg-[#eab309] rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 min-h-[48px] active:scale-[0.98] cursor-pointer"
                >
                  <Wrench className="w-4 h-4 text-[#001440]" />
                  <span>Book a service</span>
                </button>

                {/* Direct Kenyan Contacts in Drawer */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <a
                    href="tel:0729256365"
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#F1F4FA] hover:bg-slate-200 text-[#001440] rounded-xl text-xs font-bold border border-slate-200 min-h-[44px]"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#001440]" />
                    <span>Call Us</span>
                  </a>
                  <a
                    href="https://wa.me/254729256365?text=Hello%20BuildCart%2C%20I%20have%20an%20inquiry%20regarding%20materials%20and%20Supply%20%26%20Fix."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#001440] text-[#FFC30B] rounded-xl text-xs font-bold min-h-[44px]"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>

                {/* Partner and Brand Guide Quick Links */}
                {(openPartnerModal || openBrandModal) && (
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500">
                    {openPartnerModal && (
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          openPartnerModal('professional');
                        }}
                        className="hover:text-[#001440] font-medium py-1 cursor-pointer"
                      >
                        Join as Pro / Supplier
                      </button>
                    )}
                    {openBrandModal && (
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          openBrandModal();
                        }}
                        className="hover:text-[#001440] font-medium py-1 cursor-pointer"
                      >
                        Brand Guidelines
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
};
