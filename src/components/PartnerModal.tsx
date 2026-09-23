import React, { useState } from 'react';
import { X, CheckCircle2, Store, Award, Send, AlertCircle, Loader2, MessageSquare } from 'lucide-react';
import { sendSupplierApplication, sendProfessionalApplication } from '../services/emailService';

interface PartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: 'supplier' | 'professional';
}

export const PartnerModal: React.FC<PartnerModalProps> = ({
  isOpen,
  onClose,
  initialType = 'supplier',
}) => {
  if (!isOpen) return null;

  const [partnerType, setPartnerType] = useState<'supplier' | 'professional'>(initialType);
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [categoryOrTrade, setCategoryOrTrade] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const isSupplier = partnerType === 'supplier';

  const handlePartnerTypeChange = (newType: 'supplier' | 'professional') => {
    setPartnerType(newType);
    setCategoryOrTrade('');
    setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      let result;
      if (isSupplier) {
        result = await sendSupplierApplication({
          fullName,
          businessName: companyName.trim() || fullName.trim(),
          phone,
          email: email.trim() || undefined,
          location,
          categorySupplied: categoryOrTrade || 'Building Materials & Hardware',
          experience: notes.trim() || undefined,
        });
      } else {
        result = await sendProfessionalApplication({
          fullName,
          tradeBusinessName: companyName.trim() || undefined,
          phone,
          email: email.trim() || undefined,
          location,
          primaryTrade: categoryOrTrade || 'Certified Trades Professional',
          experience: notes.trim() || undefined,
        });
      }

      setIsSubmitting(false);

      if (result.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(
          result.message ||
            'Unable to deliver application at this time. Please check your internet connection or reach out directly on WhatsApp.'
        );
      }
    } catch (err) {
      setIsSubmitting(false);
      const msg = err instanceof Error ? err.message : 'Submission failed';
      setErrorMessage(`Error: ${msg}. Please check your connection or contact us on 0729 256 365.`);
    }
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setErrorMessage(null);
    setIsSubmitting(false);
    setFullName('');
    setCompanyName('');
    setPhone('');
    setEmail('');
    setLocation('');
    setCategoryOrTrade('');
    setNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#001440] text-white p-5 sm:p-6 flex items-start justify-between shrink-0">
          <div className="space-y-1">
            <span className="text-[11px] sm:text-xs font-bold text-[#FFC30B] uppercase tracking-wider block">
              Partner Network Onboarding
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-['Cabinet_Grotesk'] text-white">
              {isSupplier ? 'Become a BuildCart Supplier' : 'Become a Certified Professional'}
            </h2>
            <p className="text-xs text-slate-300">
              Join Kenya’s premier marketplace combining materials and verified finishing services.
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
                Application Submitted!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
                Thank you, <span className="font-semibold">{fullName}</span>. Our partner vendor vetting team will review your application for {companyName || fullName} and reach out on {phone}.
              </p>
              <div className="bg-[#F1F4FA] p-3.5 rounded-xl text-xs text-slate-700 text-left border border-slate-200">
                <div className="font-bold text-[#001440]">Verification Process:</div>
                <ul className="list-disc list-inside mt-1.5 space-y-1 text-slate-600">
                  <li>Trade license or National ID verification</li>
                  <li>Portfolio inspection &amp; sample site inspection</li>
                  <li>Account activation on the BuildCart dispatch network</li>
                </ul>
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
              {/* Type Switcher */}
              <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#F1F4FA] rounded-xl border border-slate-200">
                <button
                  type="button"
                  onClick={() => handlePartnerTypeChange('supplier')}
                  className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer min-h-[44px] ${
                    isSupplier
                      ? 'bg-[#001440] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Store className="w-4 h-4 shrink-0" />
                  <span>Materials Supplier</span>
                </button>
                <button
                  type="button"
                  onClick={() => handlePartnerTypeChange('professional')}
                  className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer min-h-[44px] ${
                    !isSupplier
                      ? 'bg-[#001440] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Award className="w-4 h-4 shrink-0" />
                  <span>Trades Professional</span>
                </button>
              </div>

              {/* Error Callout */}
              {errorMessage && (
                <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl space-y-2 text-xs text-rose-800 animate-in fade-in">
                  <div className="flex items-start gap-2.5">
                    <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="font-bold text-rose-900">Application Could Not Be Delivered</div>
                      <div className="mt-0.5 leading-relaxed">{errorMessage}</div>
                    </div>
                  </div>
                  <div className="pt-1 flex items-center justify-end">
                    <a
                      href={`https://wa.me/254729256365?text=${encodeURIComponent(
                        `Hello BuildCart, I am submitting my ${
                          isSupplier ? 'Supplier' : 'Certified Professional'
                        } application:\n\n• Full Name: ${fullName}\n• ${
                          isSupplier ? 'Business Name' : 'Trade Business'
                        }: ${companyName || 'N/A'}\n• Phone: ${phone}\n• Email: ${
                          email || 'N/A'
                        }\n• County/Town: ${location}\n• ${
                          isSupplier ? 'Category Supplied' : 'Primary Trade'
                        }: ${categoryOrTrade || 'N/A'}\n• Experience: ${notes || 'N/A'}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#001440] text-[#FFC30B] hover:bg-[#001f5c] rounded-lg font-bold text-xs transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Send directly via WhatsApp</span>
                    </a>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. John Omondi"
                    className="w-full bg-[#F1F4FA] border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-[#001440] outline-none min-h-[44px]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {isSupplier ? 'Business / Hardware Name *' : 'Trade Business / Nickname'}
                  </label>
                  <input
                    type="text"
                    required={isSupplier}
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder={isSupplier ? 'e.g. Ruiru Tiles & Sanitary Depot' : 'e.g. Omondi Master Finishes'}
                    className="w-full bg-[#F1F4FA] border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-[#001440] outline-none min-h-[44px]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 0722 000 000"
                    className="w-full bg-[#F1F4FA] border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-[#001440] outline-none min-h-[44px]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. contact@example.com"
                    className="w-full bg-[#F1F4FA] border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-[#001440] outline-none min-h-[44px]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">County / Town *</label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Industrial Area / Eldoret / Ruaka"
                    className="w-full bg-[#F1F4FA] border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-[#001440] outline-none min-h-[44px]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {isSupplier ? 'Product Category Supplied *' : 'Primary Trade Specialism *'}
                  </label>
                  <select
                    required
                    value={categoryOrTrade}
                    onChange={(e) => setCategoryOrTrade(e.target.value)}
                    className="w-full bg-[#F1F4FA] border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-[#001440] outline-none min-h-[44px]"
                  >
                    <option value="">
                      {isSupplier ? 'Select Category Supplied' : 'Select Primary Trade Specialism'}
                    </option>
                    {isSupplier ? (
                      <>
                        <option value="Tiles & Flooring">Tiles &amp; Flooring</option>
                        <option value="Sanitaryware & Bathrooms">Sanitaryware &amp; Bathrooms</option>
                        <option value="Paints & Coatings">Paints &amp; Coatings</option>
                        <option value="Kitchen Cabinetry">Kitchen Cabinetry</option>
                        <option value="Gypsum & Ceilings">Gypsum &amp; Ceilings</option>
                        <option value="Stone Countertops">Stone Countertops</option>
                        <option value="Doors & Ironmongery">Doors &amp; Ironmongery</option>
                        <option value="Electrical & Lighting">Electrical &amp; Lighting</option>
                        <option value="Plumbing & Drainage">Plumbing &amp; Drainage</option>
                        <option value="Roofing & Gutters">Roofing &amp; Gutters</option>
                        <option value="Structural & Masonry">Structural &amp; Masonry</option>
                        <option value="Carpentry & Timber">Carpentry &amp; Timber</option>
                        <option value="Hardware & General Materials">Hardware &amp; General Materials</option>
                        <option value="Multiple Categories / Other">Multiple Categories / Other</option>
                      </>
                    ) : (
                      <>
                        <option value="Tile Fixing & Flooring Mason">Tile Fixing &amp; Flooring Mason</option>
                        <option value="Plumber & Sanitaryware Installer">Plumber &amp; Sanitaryware Installer</option>
                        <option value="Professional Painter & Finisher">Professional Painter &amp; Finisher</option>
                        <option value="Cabinet Maker & Joiner">Cabinet Maker &amp; Joiner</option>
                        <option value="Gypsum & False Ceiling Installer">Gypsum &amp; False Ceiling Installer</option>
                        <option value="Stone & Granite Countertop Fabricator">Stone &amp; Granite Countertop Fabricator</option>
                        <option value="Door Installer & Finish Carpenter">Door Installer &amp; Finish Carpenter</option>
                        <option value="Certified Electrician & Lighting Tech">Certified Electrician &amp; Lighting Tech</option>
                        <option value="Roofing & Waterproofing Specialist">Roofing &amp; Waterproofing Specialist</option>
                        <option value="General Mason & Builder">General Mason &amp; Builder</option>
                        <option value="Other Specialized Trade">Other Specialized Trade</option>
                      </>
                    )}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Experience / Previous Projects</label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={
                    isSupplier
                      ? 'Mention current stock capacity, warehouse location, brands stocked...'
                      : 'Mention past projects, tools owned, certifications or apprenticeships...'
                  }
                  className="w-full bg-[#F1F4FA] border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-[#001440] outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-5 text-sm font-bold text-[#001440] bg-[#FFC30B] hover:bg-[#e8b209] disabled:opacity-75 disabled:cursor-not-allowed rounded-xl shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-[0.98] min-h-[48px]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Delivering Application...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>
                        {isSupplier ? 'Submit Supplier Application' : 'Submit Professional Application'}
                      </span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
