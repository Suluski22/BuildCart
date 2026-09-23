import React, { useState } from 'react';
import { X, CheckCircle2, FileText, Send, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface QuoteRequestModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const QuoteRequestModal: React.FC<QuoteRequestModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [dimensions, setDimensions] = useState('');
  const [includeInstallation, setIncludeInstallation] = useState(true);
  const [timeline, setTimeline] = useState('Within 2 weeks');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#001440] text-white p-5 sm:p-6 flex items-start justify-between shrink-0">
          <div className="space-y-1">
            <span className="text-[11px] sm:text-xs font-bold text-[#FFC30B] uppercase tracking-wider block">
              Bespoke Quotation
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-['Cabinet_Grotesk'] text-white">
              Request a Custom Quote
            </h2>
            <p className="text-xs text-slate-300 truncate max-w-xs sm:max-w-md">
              {product ? product.name : 'Custom Joinery / Stone / Glass Works'}
            </p>
          </div>

          <button
            onClick={handleResetAndClose}
            className="p-2 text-slate-300 hover:text-white rounded-xl bg-white/10 hover:bg-white/20 transition-colors cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto overscroll-contain flex-1">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-[#001440]">
                Quote Request Submitted
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
                Thank you, <span className="font-semibold">{fullName}</span>. Our technical quantity surveyor is reviewing your dimensions for {product?.name || 'your project'}.
              </p>
              <div className="bg-[#F1F4FA] p-3.5 rounded-xl text-xs text-slate-700 text-left border border-slate-200 space-y-1">
                <div className="font-bold text-[#001440]">Turnaround:</div>
                <div>You will receive an itemized Bill of Materials &amp; Installation labor quote via WhatsApp/Email within 4 business hours.</div>
              </div>
              <button
                onClick={handleResetAndClose}
                className="px-6 py-3 text-xs sm:text-sm font-bold text-[#001440] bg-[#FFC30B] hover:bg-[#e8b209] rounded-xl transition-colors cursor-pointer min-h-[44px]"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Engineer Paul Kariuki"
                    className="w-full bg-[#F1F4FA] border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-[#001440] outline-none min-h-[44px]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 0722 123 456"
                    className="w-full bg-[#F1F4FA] border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-[#001440] outline-none min-h-[44px]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. paul@example.com"
                    className="w-full bg-[#F1F4FA] border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-[#001440] outline-none min-h-[44px]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Site Location / County *</label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Karen, Nairobi"
                    className="w-full bg-[#F1F4FA] border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-[#001440] outline-none min-h-[44px]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Estimated Dimensions / Quantity Specs *
                </label>
                <input
                  type="text"
                  required
                  value={dimensions}
                  onChange={(e) => setDimensions(e.target.value)}
                  placeholder="e.g. Kitchen island 3.2m x 1.2m with waterfall edge"
                  className="w-full bg-[#F1F4FA] border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-[#001440] outline-none min-h-[44px]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Project Timeline</label>
                  <select
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="w-full bg-[#F1F4FA] border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-[#001440] outline-none min-h-[44px]"
                  >
                    <option value="Immediately (Within 3 days)">Immediately (Within 3 days)</option>
                    <option value="Within 2 weeks">Within 2 weeks</option>
                    <option value="This month">This month</option>
                    <option value="Planning phase (Next 2-3 months)">Planning phase (Next 2-3 months)</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <label className="flex items-center justify-between sm:justify-start gap-2 text-xs font-semibold text-slate-700 cursor-pointer p-2.5 rounded-xl border border-slate-200 bg-[#F1F4FA] w-full min-h-[44px]">
                    <span>Include Supply &amp; Fix Installation</span>
                    <input
                      type="checkbox"
                      checked={includeInstallation}
                      onChange={(e) => setIncludeInstallation(e.target.checked)}
                      className="w-4 h-4 rounded text-[#001440] accent-[#001440]"
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Special Notes / Architectural Specs</label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Include any cutout requirements, substrate conditions, or preferred material variants..."
                  className="w-full bg-[#F1F4FA] border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-[#001440] outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-5 text-sm font-bold text-[#001440] bg-[#FFC30B] hover:bg-[#e8b209] rounded-xl shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-[0.98] min-h-[48px]"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Custom Quote Request</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
