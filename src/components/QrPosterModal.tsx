import React, { useState } from 'react';
import { Shop } from '../types';
import { X, Printer, QrCode, Store, Sparkles, MessageSquare, ExternalLink, Copy, Check } from 'lucide-react';
import { 
  getQrCodeImageUrl, 
  getQrCodeFallbackUrl, 
  getShopWhatsAppUrl, 
  getShopCatalogUrl 
} from '../utils/qrCodeGenerator';

interface QrPosterModalProps {
  shop: Shop;
  onClose: () => void;
}

export const QrPosterModal: React.FC<QrPosterModalProps> = ({ shop, onClose }) => {
  const [qrMode, setQrMode] = useState<'whatsapp' | 'catalog'>('whatsapp');
  const [copied, setCopied] = useState(false);

  // Compute encoded target URL
  const targetUrl = qrMode === 'whatsapp'
    ? getShopWhatsAppUrl(shop.whatsappNumber || shop.phone, shop.businessName)
    : getShopCatalogUrl(shop.id);

  const qrImageUrl = getQrCodeImageUrl(targetUrl, 350);
  const qrFallbackUrl = getQrCodeFallbackUrl(targetUrl, 350);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(targetUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-emerald-900/40 rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden animate-in zoom-in-95 text-white my-auto">
        
        {/* Modal Controls Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-emerald-900/50 bg-slate-950 print:hidden">
          <div className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-white text-sm font-serif">Storefront QR Code & Poster</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* QR Mode Selector Tabs (WhatsApp vs Web Catalog) */}
        <div className="px-6 pt-4 pb-2 bg-slate-900 print:hidden space-y-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Select Scannable QR Code Type:
          </span>
          <div className="grid grid-cols-2 gap-2 p-1 bg-slate-950 rounded-2xl border border-slate-800">
            <button
              type="button"
              onClick={() => setQrMode('whatsapp')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                qrMode === 'whatsapp'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
              <span>WhatsApp Chat QR</span>
            </button>
            <button
              type="button"
              onClick={() => setQrMode('catalog')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                qrMode === 'catalog'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span>Online Catalog QR</span>
            </button>
          </div>
        </div>

        {/* Poster Printable Card */}
        <div id="printable-poster" className="p-6 sm:p-8 bg-gradient-to-b from-emerald-950 via-slate-900 to-amber-950 text-white border-4 border-emerald-500/60 rounded-2xl m-4 text-center space-y-5 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-800 text-amber-300 border border-emerald-400/40 shadow-lg shadow-emerald-950/60">
            <Store className="w-8 h-8" />
          </div>

          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white mb-1 font-serif">
              {shop.businessName}
            </h1>
            <p className="text-xs text-amber-300 font-bold">{shop.address}, PIN: {shop.pincode}</p>
            <p className="text-[11px] text-slate-300 mt-1">📞 {shop.phone} | 🕒 {shop.openingTime} - {shop.closingTime}</p>
          </div>

          {/* REAL SCANNABLE QR CODE CONTAINER */}
          <div className="bg-white p-4 rounded-3xl inline-block shadow-2xl mx-auto border-4 border-amber-400">
            <img 
              src={qrImageUrl}
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                if (target.src !== qrFallbackUrl) {
                  target.src = qrFallbackUrl;
                }
              }}
              alt={`QR Code for ${shop.businessName}`}
              className="w-48 h-48 sm:w-56 sm:h-56 mx-auto object-contain rounded-xl"
            />
            <div className="mt-2.5 pt-2 border-t border-slate-200">
              <p className="text-[11px] font-black text-slate-900 tracking-wider uppercase">
                {qrMode === 'whatsapp' ? '💬 SCAN TO ORDER ON WHATSAPP' : '🛍️ SCAN TO VIEW ONLINE STORE'}
              </p>
              <p className="text-[9px] text-slate-500 truncate max-w-[220px] mx-auto mt-0.5 font-mono">
                {targetUrl}
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800 text-slate-400 text-xs flex items-center justify-center gap-1.5 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>Powered by <strong className="text-amber-400 font-extrabold font-serif">Nexvarya Technologies</strong></span>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-950 border-t border-emerald-900/50 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs font-bold transition-colors"
              title="Copy Target URL"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
              <span>{copied ? 'Copied!' : 'Copy Link'}</span>
            </button>

            <a
              href={targetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs font-bold transition-colors"
              title="Test QR Link in Browser"
            >
              <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
              <span>Test Link</span>
            </a>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800 text-xs font-semibold"
            >
              Close
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-600 text-white text-xs font-bold shadow-lg shadow-emerald-950/60 transition-all hover:scale-[1.01]"
            >
              <Printer className="w-4 h-4 text-amber-300" />
              <span>Print Store Poster</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
