import React, { useState } from 'react';
import { X, CheckCircle2, AlertCircle, Wrench, Calendar, MapPin, User, Phone, MessageSquare, Loader2 } from 'lucide-react';
import { SUPPLY_AND_FIX_SERVICES } from '../data/services';
import { SupplyAndFixService } from '../types';
import { sendBookingEmail } from '../services/emailService';

interface ServiceBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: SupplyAndFixService | null;
}

export const ServiceBookingModal: React.FC<ServiceBookingModalProps> = ({
  isOpen,
  onClose,
  initialService,
}) => {
  if (!isOpen) return null;

  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    initialService ? initialService.id : SUPPLY_AND_FIX_SERVICES[0].id
  );
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [county, setCounty] = useState('Nairobi');
  const [estateOrTown, setEstateOrTown] = useState('');
  const [estimatedUnits, setEstimatedUnits] = useState('');
  const [startDate, setStartDate] = useState('');
  const [projectDetails, setProjectDetails] = useState('');
  
  // Submission & Email Status States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const selectedService =
    SUPPLY_AND_FIX_SERVICES.find((s) => s.id === selectedServiceId) || SUPPLY_AND_FIX_SERVICES[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const bookingData = {
      category: selectedService.title,
      fullName,
      phone,
      county,
      estateOrTown,
      estimatedUnits,
      startDate,
      projectDetails,
    };

    const result = await sendBookingEmail(bookingData);

    setIsSubmitting(false);

    if (result.success) {
      setSubmitted(true);
    } else {
      setErrorMessage(
        result.error ||
          'Unable to send booking request. Please check your internet connection or reach out directly on WhatsApp.'
      );
    }
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setErrorMessage(null);
    setFullName('');
    setPhone('');
    setEstateOrTown('');
    setEstimatedUnits('');
    setStartDate('');
    setProjectDetails('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#001440] text-white p-5 sm:p-6 flex items-start justify-between shrink-0">
          <div className="space-y-1">
            <span className="text-[11px] sm:text-xs font-bold text-[#FFC30B] uppercase tracking-wider block">
              Supply &amp; Fix Booking
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-['Cabinet_Grotesk'] text-white">
              Book a Certified Professional
            </h2>
            <p className="text-xs text-slate-300">
              “Need it installed? We can help with that too.”
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

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto overscroll-contain flex-1">
          {submitted ? (
            <div className="text-center py-6 sm:py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-[#001440] font-['Cabinet_Grotesk']">
                Booking Request Received!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you, <span className="font-semibold text-slate-900">{fullName}</span>. Your request has been forwarded to{' '}
                <strong className="text-[#001440]">buildcartke@gmail.com</strong> for{' '}
                <span className="font-semibold text-[#001440]">{selectedService.title}</span> in {estateOrTown || county}.
              </p>
              <div className="bg-[#F1F4FA] p-4 rounded-xl max-w-md mx-auto text-xs text-slate-700 space-y-1.5 text-left border border-slate-200">
                <div className="font-bold text-[#001440]">Next Steps:</div>
                <div>1. A BuildCart technical supervisor will call/WhatsApp you at <span className="font-semibold text-slate-900">{phone}</span> within 2 hours.</div>
                <div>2. We verify site measurements and confirm scope details.</div>
                <div>3. You receive a fixed labor schedule and vetted professional match.</div>
              </div>
              <button
                onClick={handleResetAndClose}
                className="mt-4 px-7 py-3 text-xs sm:text-sm font-bold text-[#001440] bg-[#FFC30B] hover:bg-[#e8b209] rounded-xl transition-colors cursor-pointer min-h-[44px]"
              >
                Close &amp; Return
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {/* Error Callout */}
              {errorMessage && (
                <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-3 text-rose-800 text-xs">
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="font-bold block">Submission Failed</span>
                    <p>{errorMessage}</p>
                    <a
                      href={`https://wa.me/254729256365?text=Hello%20BuildCart%2C%20I%20tried%20to%20book%20${encodeURIComponent(
                        selectedService.title
                      )}%20for%20${encodeURIComponent(fullName || 'my site')}%20and%20need%20assistance.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-bold text-rose-900 underline mt-1"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Send booking directly via WhatsApp instead (0729 256 365)</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Service Selection */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Select Supply &amp; Fix Category (8 Categories)
                </label>
                <select
                  value={selectedServiceId}
                  onChange={(e) => setSelectedServiceId(e.target.value)}
                  className="w-full bg-[#F1F4FA] border border-slate-200 rounded-xl px-3.5 py-3 text-xs sm:text-sm font-semibold text-[#001440] focus:outline-none focus:ring-2 focus:ring-[#001440] min-h-[44px]"
                >
                  {SUPPLY_AND_FIX_SERVICES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.index}. {s.title} — ({s.estimatedLaborRate})
                    </option>
                  ))}
                </select>
                <div className="mt-2 text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex flex-col xs:flex-row xs:items-center justify-between gap-1">
                  <span className="truncate">Scope: {selectedService.subtitle}</span>
                  <span className="font-semibold text-[#001440] shrink-0">{selectedService.turnaroundTime}</span>
                </div>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. David Mwangi"
                    className="w-full bg-[#F1F4FA] border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#001440] min-h-[44px]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 0722 000 000"
                    className="w-full bg-[#F1F4FA] border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#001440] min-h-[44px]"
                  />
                </div>
              </div>

              {/* Location: County & Estate */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    County *
                  </label>
                  <select
                    value={county}
                    onChange={(e) => setCounty(e.target.value)}
                    className="w-full bg-[#F1F4FA] border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#001440] min-h-[44px]"
                  >
                    <option value="Nairobi">Nairobi</option>
                    <option value="Kiambu">Kiambu</option>
                    <option value="Machakos">Machakos</option>
                    <option value="Kajiado">Kajiado</option>
                    <option value="Nakuru">Nakuru</option>
                    <option value="Mombasa">Mombasa</option>
                    <option value="Kisumu">Kisumu</option>
                    <option value="Eldoret">Eldoret</option>
                    <option value="Other">Other Region in Kenya</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Estate / Town / Road *
                  </label>
                  <input
                    type="text"
                    required
                    value={estateOrTown}
                    onChange={(e) => setEstateOrTown(e.target.value)}
                    placeholder="e.g. Kilimani / Ruiru / Syokimau"
                    className="w-full bg-[#F1F4FA] border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#001440] min-h-[44px]"
                  />
                </div>
              </div>

              {/* Estimated Size & Start Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Estimated Size / Units
                  </label>
                  <input
                    type="text"
                    value={estimatedUnits}
                    onChange={(e) => setEstimatedUnits(e.target.value)}
                    placeholder="e.g. 120 sqm floor / 3 bathrooms"
                    className="w-full bg-[#F1F4FA] border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#001440] min-h-[44px]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Preferred Start Date
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-[#F1F4FA] border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#001440] min-h-[44px]"
                  />
                </div>
              </div>

              {/* Project Details */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Project Details / Specific Requirements
                </label>
                <textarea
                  rows={3}
                  value={projectDetails}
                  onChange={(e) => setProjectDetails(e.target.value)}
                  placeholder="Describe your site status, whether materials are on site, substrate conditions, special finishes needed..."
                  className="w-full bg-[#F1F4FA] border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#001440]"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 text-sm font-bold text-[#001440] bg-[#FFC30B] hover:bg-[#e8b209] rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-75 disabled:cursor-not-allowed min-h-[48px]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Sending Booking Request...</span>
                    </>
                  ) : (
                    <>
                      <Wrench className="w-4 h-4" />
                      <span>Submit Service Booking Request</span>
                    </>
                  )}
                </button>
                <p className="text-[11px] text-slate-500 text-center mt-2">
                  No upfront booking fees. We will call to verify site readiness and confirm rates.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
