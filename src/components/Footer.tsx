import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { BuildCartLogo } from './BuildCartLogo';

interface FooterProps {
  onNavigate: (tab: string) => void;
  openBrandModal?: () => void;
  openPartnerModal: (type: 'supplier' | 'professional') => void;
  openBookingModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  openPartnerModal,
  openBookingModal,
}) => {
  return (
    <footer className="bg-[#001440] text-white border-t border-[#001440]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-8">
          {/* Brand Info & Tagline */}
          <div className="sm:col-span-2 space-y-4">
            <button
              onClick={() => onNavigate('home')}
              className="focus:outline-none text-left cursor-pointer"
            >
              <BuildCartLogo variant="dark" size="md" showTagline={true} />
            </button>
            <p className="text-xs text-slate-300 max-w-sm leading-relaxed">
              Kenya’s construction and home-improvement marketplace. We combine verified quality interior finishing materials with professional Supply &amp; Fix installation services.
            </p>

            <div className="pt-2 text-xs text-slate-300 space-y-2.5">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#FFC30B] shrink-0" />
                <a href="https://wa.me/254729256365" className="hover:text-[#FFC30B] font-semibold">
                  Call / WhatsApp: 0729 256 365
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#FFC30B] shrink-0" />
                <a href="mailto:buildcartke@gmail.com" className="hover:text-[#FFC30B] break-all">
                  buildcartke@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#FFC30B] shrink-0 mt-0.5" />
                <span>Nairobi Logistics Hub · Delivering Nationwide across Kenya</span>
              </div>
            </div>
          </div>

          {/* Column: Marketplace */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#FFC30B] uppercase tracking-wider">
              Marketplace
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="hover:text-white transition-colors cursor-pointer py-1 block text-left"
                >
                  Shop Materials (13 Categories)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('supply-and-fix')}
                  className="hover:text-white transition-colors cursor-pointer py-1 block text-left"
                >
                  Supply &amp; Fix (8 Services)
                </button>
              </li>
              <li>
                <button
                  onClick={openBookingModal}
                  className="hover:text-white transition-colors cursor-pointer py-1 block text-left text-[#FFC30B] font-semibold"
                >
                  Book a Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('how-it-works')}
                  className="hover:text-white transition-colors cursor-pointer py-1 block text-left"
                >
                  How It Works (5 Steps)
                </button>
              </li>
            </ul>
          </div>

          {/* Column: For Partners */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#FFC30B] uppercase tracking-wider">
              For Partners &amp; Pros
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button
                  onClick={() => openPartnerModal('supplier')}
                  className="hover:text-white transition-colors cursor-pointer py-1 block text-left"
                >
                  Become a Supplier
                </button>
              </li>
              <li>
                <button
                  onClick={() => openPartnerModal('professional')}
                  className="hover:text-white transition-colors cursor-pointer py-1 block text-left"
                >
                  Become a Professional
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('audiences')}
                  className="hover:text-white transition-colors cursor-pointer py-1 block text-left"
                >
                  For Contractors &amp; Homeowners
                </button>
              </li>
            </ul>
          </div>

          {/* Column: Company & Trust */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#FFC30B] uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors cursor-pointer py-1 block text-left"
                >
                  About BuildCart
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors cursor-pointer py-1 block text-left"
                >
                  Our Trust Promise
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors cursor-pointer py-1 block text-left"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 sm:mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} BuildCart Kenya. “From Foundation to Finish, We’ve Got You.”
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span>Made for Kenya’s Construction Industry</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
