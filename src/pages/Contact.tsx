import React, { useState } from 'react';
import { apiEnquiries } from '../api';
import { useApp } from '../context/useApp';
import { Mail, Phone, MapPin, Send, CheckCircle, Sparkles } from 'lucide-react';

export const Contact: React.FC = () => {
  const { t } = useApp();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    setLoading(true);
    try {
      await apiEnquiries.create({ name: name.trim(), email: email.trim(), message: msg.trim(), serviceInterest: 'Contact form' });
      setSubmitted(true);
    } catch { setError(true); } finally { setLoading(false); }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 min-h-screen">
      
      <div className="text-center max-w-xl mx-auto space-y-3">
        <span className="inline-block px-3.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-emerald-950/90 text-amber-400 border border-emerald-700/50 shadow-sm">{t("Get in Touch")}</span>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-heading">{t('contact')}</h1>
        <p className="text-xs text-slate-400">{t("Have questions or want to list your business on the Nexvarya Platform? Get in touch with our team.")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Contact Info Card */}
        <div className="bg-slate-900/90 border border-emerald-900/40 p-6 sm:p-8 rounded-3xl space-y-6 flex flex-col justify-between shadow-2xl backdrop-blur-md">
          <div className="space-y-6">
            <div>
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block mb-1">
                Nexvarya Technologies
              </span>
              <h3 className="text-xl font-bold text-white font-heading">{t("Platform Onboarding & Support")}</h3>
            </div>

            <div className="space-y-4 text-xs text-slate-300">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-slate-950 text-emerald-400 border border-slate-800 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-white">{t("Company Headquarters")}</strong>
                  <span>Nexvarya Technologies, Rajahmundry, Andhra Pradesh - 534313</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-slate-950 text-amber-400 border border-slate-800 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-white">{t("Direct Phone / WhatsApp Support")}</strong>
                  <span className="text-amber-400 font-extrabold">+91 7997679777</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-slate-950 text-emerald-400 border border-slate-800 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-white">{t("Email Address")}</strong>
                  <span>contact@nexvarya.com</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800/80 text-xs text-slate-400 flex items-center gap-1.5 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{t("24/7 Support for registered shop partners")}</span>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-slate-900/90 border border-emerald-900/40 p-6 sm:p-8 rounded-3xl shadow-2xl backdrop-blur-md">
          {error && <p role="alert" className="text-rose-500">{t('inquiryFailed')}</p>}
          {submitted ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-emerald-950 text-emerald-400 border border-emerald-700/60 flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white font-heading">{t("Message Sent Successfully!")}</h3>
              <p className="text-xs text-slate-400">{t("Thank you for reaching out. A representative from Nexvarya Technologies will contact you shortly.")}</p>
            </div>
          ) : (
            <form aria-busy={loading} onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">{t('fullName')}</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t("Your Name")}
                  className="w-full bg-slate-950 text-white placeholder-slate-500 text-xs rounded-xl px-3.5 py-2.5 border border-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">{t('emailId')}</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full bg-slate-950 text-white placeholder-slate-500 text-xs rounded-xl px-3.5 py-2.5 border border-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">{t("Message / Inquiry")}</label>
                <textarea
                  required
                  rows={4}
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  placeholder="How can Nexvarya Technologies help your business?"
                  className="w-full bg-slate-950 text-white placeholder-slate-500 text-xs rounded-xl p-3 border border-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <button
                type="submit" disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-xs shadow-lg shadow-emerald-950/60 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
              >
                <span>{t("Send Message")}</span>
                <Send className="w-4 h-4 text-amber-300" />
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
};
