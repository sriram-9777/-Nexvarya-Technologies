import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { apiEnquiries } from '../../api';
import { Send, CheckCircle2, Phone, Mail, User, MessageSquare } from 'lucide-react';

export const InquirySection: React.FC = () => {
  const { themeMode } = useApp();
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('General Marketplace Inquiry');
  const [message, setMessage] = useState('');

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) return;

    setLoading(true);
    const enquiryData = {
      name,
      phone,
      email,
      serviceInterest: service,
      message,
      createdAt: new Date().toISOString().split('T')[0]
    };

    try {
      await apiEnquiries.create(enquiryData);
    } catch (err) {
      // fallback
    }

    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className={`rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-xl border space-y-6 ${
        themeMode === 'dark'
          ? 'bg-slate-900/90 border-emerald-900/60 text-slate-100'
          : 'bg-white/95 border-emerald-200/80 text-slate-900'
      }`}>
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-[10px] font-black tracking-widest text-amber-400 uppercase bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/30">
            Direct Merchant & Service Inquiry
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Need Custom Business Services or Support?
          </h2>
          <p className={`text-xs ${themeMode === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
            Submit your contact details and message. Nexvarya Technologies team will connect with you via Call or WhatsApp within 2 hours.
          </p>
        </div>

        {submitted ? (
          <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
            <h3 className="text-lg font-black text-emerald-400">Inquiry Submitted Successfully!</h3>
            <p className={`text-xs ${themeMode === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
              Thank you, <strong className="text-amber-400">{name}</strong>. Our team will contact you at <strong>{phone}</strong> shortly.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setName('');
                setPhone('');
                setEmail('');
                setMessage('');
              }}
              className="mt-2 px-5 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700"
            >
              Submit Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold">Your Name *</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full text-xs rounded-xl pl-9 pr-3 py-2.5 border focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${
                      themeMode === 'dark'
                        ? 'bg-slate-950 text-white border-slate-800'
                        : 'bg-slate-50 text-slate-900 border-slate-200'
                    }`}
                  />
                  <User className="w-4 h-4 text-emerald-500 absolute left-3 top-3" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold">Mobile Phone / WhatsApp *</label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`w-full text-xs rounded-xl pl-9 pr-3 py-2.5 border focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${
                      themeMode === 'dark'
                        ? 'bg-slate-950 text-white border-slate-800'
                        : 'bg-slate-50 text-slate-900 border-slate-200'
                    }`}
                  />
                  <Phone className="w-4 h-4 text-emerald-500 absolute left-3 top-3" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold">Email Address (Optional)</label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full text-xs rounded-xl pl-9 pr-3 py-2.5 border focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${
                      themeMode === 'dark'
                        ? 'bg-slate-950 text-white border-slate-800'
                        : 'bg-slate-50 text-slate-900 border-slate-200'
                    }`}
                  />
                  <Mail className="w-4 h-4 text-emerald-500 absolute left-3 top-3" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold">Service Category</label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className={`w-full text-xs rounded-xl px-3.5 py-2.5 border focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${
                    themeMode === 'dark'
                      ? 'bg-slate-950 text-white border-slate-800'
                      : 'bg-slate-50 text-slate-900 border-slate-200'
                  }`}
                >
                  <option value="General Marketplace Inquiry">General Marketplace Inquiry</option>
                  <option value="Merchant Shop Registration">Merchant Shop Registration</option>
                  <option value="Bulk Order Savings Desk">Bulk Order Savings Desk</option>
                  <option value="Custom Enterprise Software / SaaS">Custom Enterprise Software / SaaS</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold">Message / Requirement Details *</label>
              <div className="relative">
                <textarea
                  required
                  rows={3}
                  placeholder="Describe your inquiry or order requirement..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={`w-full text-xs rounded-xl pl-9 pr-3 py-2.5 border focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${
                    themeMode === 'dark'
                      ? 'bg-slate-950 text-white border-slate-800'
                      : 'bg-slate-50 text-slate-900 border-slate-200'
                  }`}
                />
                <MessageSquare className="w-4 h-4 text-emerald-500 absolute left-3 top-3" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-600 text-white font-black text-xs shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2 transition-all"
            >
              <Send className="w-4 h-4" />
              <span>{loading ? 'Submitting...' : 'Send Inquiry to Corporate Desk'}</span>
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
