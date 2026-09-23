import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Materials Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-10 sm:py-16 bg-[#F1F4FA] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-8 sm:mb-12">
          <span className="text-[11px] sm:text-xs font-bold text-[#FFC30B] uppercase tracking-wider bg-[#001440] px-3 py-1 rounded inline-block mb-2.5">
            Get In Touch
          </span>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#001440] font-['Cabinet_Grotesk'] tracking-tight">
            Contact BuildCart
          </h1>
          <p className="mt-2 text-xs sm:text-sm lg:text-base text-slate-600">
            Have a project quote inquiry, need to arrange site delivery, or want to discuss Supply &amp; Fix installation? We’re here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          {/* Direct Details Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#001440] text-white p-5 sm:p-8 rounded-3xl space-y-6 shadow-md">
              <h2 className="text-lg sm:text-xl font-bold font-['Cabinet_Grotesk'] text-[#FFC30B]">
                Direct Contacts (Kenya)
              </h2>

              <div className="space-y-4 sm:space-y-5 text-sm">
                {/* Call / WhatsApp */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-[#FFC30B]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-300 block font-medium">Call / WhatsApp</span>
                    <a
                      href="https://wa.me/254729256365"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base sm:text-lg font-bold text-white hover:text-[#FFC30B] transition-colors"
                    >
                      0729 256 365
                    </a>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      Available Mon - Sat, 8:00 AM – 6:00 PM EAT
                    </span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-[#FFC30B]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-300 block font-medium">Email Address</span>
                    <a
                      href="mailto:buildcartke@gmail.com"
                      className="text-sm sm:text-base font-bold text-white hover:text-[#FFC30B] transition-colors break-all"
                    >
                      buildcartke@gmail.com
                    </a>
                  </div>
                </div>

                {/* Operating Region */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-[#FFC30B]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-300 block font-medium">Fulfillment &amp; Coverage</span>
                    <span className="text-sm font-semibold text-white block">
                      Nairobi Central Logistics Hub
                    </span>
                    <span className="text-xs text-slate-300 block mt-0.5 leading-relaxed">
                      Dispatching to Nairobi, Kiambu, Machakos, Kajiado, Nakuru, and regional Kenya project sites.
                    </span>
                  </div>
                </div>
              </div>

              {/* WhatsApp Quick Chat Action Button */}
              <div className="pt-4 border-t border-white/15">
                <a
                  href="https://wa.me/254729256365?text=Hello%20BuildCart%2C%20I%20would%20like%20to%20inquire%20about%20materials%20and%20Supply%20%26%20Fix%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 text-xs sm:text-sm font-bold text-[#001440] bg-[#FFC30B] hover:bg-[#e8b209] rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm min-h-[48px]"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp Directly</span>
                </a>
              </div>
            </div>
          </div>

          {/* Inquiry Form Column */}
          <div className="lg:col-span-7">
            <div className="bg-white p-5 sm:p-8 lg:p-10 rounded-3xl border border-slate-200 shadow-sm">
              <h2 className="text-lg sm:text-xl font-bold text-[#001440] font-['Cabinet_Grotesk'] mb-1.5">
                Send an Inquiry or BOQ
              </h2>
              <p className="text-xs text-slate-600 mb-5">
                Fill in your project inquiry and our materials &amp; services team will respond promptly.
              </p>

              {submitted ? (
                <div className="text-center py-8 space-y-3">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-[#001440]">Message Dispatched</h3>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto">
                    Thank you, <span className="font-semibold">{name}</span>. We will contact you back on {phone || email} shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-3 px-5 py-2.5 text-xs font-bold text-[#001440] bg-[#FFC30B] hover:bg-[#e8b209] rounded-xl min-h-[40px]"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Samuel Mutua"
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
                        placeholder="e.g. 0729 256 365"
                        className="w-full bg-[#F1F4FA] border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-[#001440] outline-none min-h-[44px]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. client@gmail.com"
                        className="w-full bg-[#F1F4FA] border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-[#001440] outline-none min-h-[44px]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Subject</label>
                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full bg-[#F1F4FA] border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-[#001440] outline-none min-h-[44px]"
                      >
                        <option value="Materials Inquiry">Materials Inquiry</option>
                        <option value="Supply & Fix Labor Request">Supply &amp; Fix Labor Request</option>
                        <option value="Contractor Bulk BOQ">Contractor Bulk BOQ</option>
                        <option value="Supplier Partnership">Supplier Partnership</option>
                        <option value="Professional Registration">Professional Registration</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Message / Project Description *</label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us what materials you need, quantities, or your site location..."
                      className="w-full bg-[#F1F4FA] border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#001440] outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 text-xs sm:text-sm font-bold text-[#001440] bg-[#FFC30B] hover:bg-[#e8b209] rounded-xl shadow-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-[0.98] min-h-[48px]"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message to BuildCart</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
