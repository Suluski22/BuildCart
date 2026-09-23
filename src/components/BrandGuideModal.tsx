import React, { useState } from 'react';
import { X, Copy, Check, Palette, Sparkles, Download } from 'lucide-react';
import { BuildCartLogo, BuildCartIcon, LogoVariant } from './BuildCartLogo';

interface BrandGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrandGuideModal: React.FC<BrandGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const colors = [
    {
      name: 'Cetacean Blue',
      role: 'Primary Brand Colour',
      hex: '#001440',
      rgb: 'RGB 0, 20, 64',
      bgClass: 'bg-[#001440]',
      textClass: 'text-white',
    },
    {
      name: 'Mikado Yellow',
      role: 'Accent Brand Colour',
      hex: '#FFC30B',
      rgb: 'RGB 255, 195, 11',
      bgClass: 'bg-[#FFC30B]',
      textClass: 'text-[#001440]',
    },
    {
      name: 'Anti Flash White',
      role: 'Neutral / Canvas BG',
      hex: '#F1F4FA',
      rgb: 'RGB 241, 244, 250',
      bgClass: 'bg-[#F1F4FA]',
      textClass: 'text-[#001440]',
      border: true,
    },
    {
      name: 'Pure White',
      role: 'Supporting Surface',
      hex: '#FFFFFF',
      rgb: 'RGB 255, 255, 255',
      bgClass: 'bg-white',
      textClass: 'text-black',
      border: true,
    },
    {
      name: 'Pure Black',
      role: 'Mono & High Contrast',
      hex: '#000000',
      rgb: 'RGB 0, 0, 0',
      bgClass: 'bg-black',
      textClass: 'text-white',
    },
  ];

  const logoVariants: {
    title: string;
    variant: LogoVariant;
    containerBg: string;
    description: string;
  }[] = [
    {
      title: 'Light Background Lockup',
      variant: 'light',
      containerBg: 'bg-[#F1F4FA]',
      description: 'Navy cart + yellow excavator + navy "Build" / yellow "Cart" on light background',
    },
    {
      title: 'Dark Navy Lockup',
      variant: 'dark',
      containerBg: 'bg-[#001440]',
      description: 'White cart + yellow excavator + white "Build" / yellow "Cart" on dark navy background',
    },
    {
      title: 'Solid Yellow Lockup',
      variant: 'yellow',
      containerBg: 'bg-[#FFC30B]',
      description: 'Navy everything on solid yellow background',
    },
    {
      title: 'Solid Black Lockup',
      variant: 'black',
      containerBg: 'bg-white border border-slate-200',
      description: 'Solid black on white for monochromatic applications',
    },
    {
      title: 'Solid White Lockup',
      variant: 'white',
      containerBg: 'bg-black',
      description: 'Solid white on black for inverted mono printing',
    },
    {
      title: 'Grayscale Lockup',
      variant: 'grayscale',
      containerBg: 'bg-slate-100',
      description: 'Grayscale tones for newsprint, receipts & mono fax',
    },
  ];

  const handleCopy = (hex: string) => {
    navigator.clipboard?.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#001440] text-white p-5 sm:p-6 flex items-start justify-between shrink-0">
          <div className="space-y-1">
            <span className="text-[11px] sm:text-xs font-bold text-[#FFC30B] uppercase tracking-wider block">
              Design System &amp; Brand Guidelines
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-['Cabinet_Grotesk'] text-white">
              BuildCart Brand Assets
            </h2>
            <p className="text-xs text-slate-300">
              “From Foundation to Finish, We’ve Got You.”
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-300 hover:text-white rounded-xl bg-white/10 hover:bg-white/20 transition-colors cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 lg:p-8 overflow-y-auto overscroll-contain flex-1 space-y-6 sm:space-y-8">
          {/* Logo Concept Narrative */}
          <div className="bg-[#F1F4FA] p-4 sm:p-6 rounded-2xl border border-slate-200">
            <h3 className="text-sm sm:text-base font-bold text-[#001440] mb-1.5 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#FFC30B]" />
              <span>Logo Symbolism &amp; Mark Construction</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              The BuildCart mark is a stylized <strong>shopping cart</strong> with an <strong>excavator / construction arm and bucket</strong> rising from inside the cart basket. This mark visually unifies <em>shopping for materials</em> with <em>construction and building</em>.
            </p>
          </div>

          {/* All 6 Logo Variants */}
          <div>
            <h3 className="text-sm font-bold text-[#001440] uppercase tracking-wider mb-3">
              Official Logo Variants (6 Variants)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
              {logoVariants.map((item) => (
                <div
                  key={item.variant}
                  className="rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between"
                >
                  <div
                    className={`${item.containerBg} p-5 flex items-center justify-center min-h-[120px]`}
                  >
                    <BuildCartLogo
                      variant={item.variant}
                      size="sm"
                      showTagline={true}
                    />
                  </div>
                  <div className="p-3 bg-white border-t border-slate-100">
                    <span className="text-xs font-bold text-slate-900 block truncate">
                      {item.title}
                    </span>
                    <span className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">
                      {item.description}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Color Palette */}
          <div>
            <h3 className="text-sm font-bold text-[#001440] uppercase tracking-wider mb-3 flex items-center gap-2">
              <Palette className="w-4 h-4 text-[#001440]" />
              <span>Official Color Palette</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
              {colors.map((color) => (
                <div
                  key={color.hex}
                  className={`rounded-xl overflow-hidden border ${
                    color.border ? 'border-slate-300' : 'border-slate-200'
                  } bg-white shadow-xs`}
                >
                  <div
                    className={`${color.bgClass} h-16 sm:h-20 flex items-center justify-center p-2`}
                  >
                    <button
                      onClick={() => handleCopy(color.hex)}
                      className={`px-2 py-1 rounded text-[10px] font-mono font-bold flex items-center gap-1 transition-all ${
                        color.textClass
                      } bg-black/20 hover:bg-black/40 backdrop-blur-xs min-h-[28px]`}
                      title="Click to copy hex"
                    >
                      {copiedHex === color.hex ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>{color.hex}</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="p-2.5 space-y-0.5">
                    <span className="text-xs font-bold text-slate-900 block truncate">
                      {color.name}
                    </span>
                    <span className="text-[10px] text-slate-500 block truncate">
                      {color.role}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 block truncate">
                      {color.rgb}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Typography */}
          <div className="border-t border-slate-200 pt-6">
            <h3 className="text-sm font-bold text-[#001440] uppercase tracking-wider mb-3">
              Brand Typography Hierarchy
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#F1F4FA] border border-slate-200">
                <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1">
                  Display &amp; Headings Font
                </span>
                <span className="text-xl sm:text-2xl font-black text-[#001440] font-['Cabinet_Grotesk'] block">
                  Cabinet Grotesk / Space Grotesk
                </span>
                <p className="text-xs text-slate-600 mt-1">
                  Bold, industrial, structural and commanding weights (700-900).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#F1F4FA] border border-slate-200">
                <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1">
                  Body &amp; Technical Specs Font
                </span>
                <span className="text-lg sm:text-xl font-medium text-slate-800 font-sans block">
                  Plus Jakarta Sans / Inter
                </span>
                <p className="text-xs text-slate-600 mt-1">
                  Ultra-clean, modern geometric humanist sans-serif for UI clarity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
