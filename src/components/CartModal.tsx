import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, Trash2, Plus, Minus, ShoppingBag, 
  Tag, MessageSquare, CheckCircle, ArrowRight 
} from 'lucide-react';

interface CartModalProps {
  onClose: () => void;
}

export const CartModal: React.FC<CartModalProps> = ({ onClose }) => {
  const { themeMode, cart, updateCartQuantity, removeFromCart, placeOrder, t, currentUser, setActivePage } = useApp();
  const [notes, setNotes] = useState('');
  const [orderPlacedSuccess, setOrderPlacedSuccess] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState<string | null>(null);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const totalPayable = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  const savingsTotal = subtotal - totalPayable;

  const handleCheckout = () => {
    if (!currentUser) {
      onClose();
      setActivePage('login');
      return;
    }
    const order = placeOrder(notes);
    if (order) {
      setPlacedOrderId(order.id);
      setOrderPlacedSuccess(true);
    }
  };

  const firstShop = cart.length > 0 ? cart[0].shop : null;

  const handleWhatsAppOrder = () => {
    if (!firstShop || !firstShop.whatsappNumber) return;
    
    let text = `*New Order from Nexvarya Platform*\n`;
    text += `*Customer:* ${currentUser ? currentUser.name : 'Guest'}\n`;
    text += `*Phone:* ${currentUser ? currentUser.mobile : ''}\n\n`;
    text += `*Items Ordered:*\n`;
    
    cart.forEach((item, index) => {
      text += `${index + 1}. ${item.product.name} - ${item.quantity} ${item.product.sellingType.toUpperCase()} @ ₹${item.effectiveUnitPrice}/${item.product.sellingType.toUpperCase()} = ₹${item.totalPrice}\n`;
    });

    text += `\n*Total Payable:* ₹${totalPayable}`;
    if (notes) text += `\n*Instructions:* ${notes}`;

    const url = `https://wa.me/${firstShop.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-end p-0 sm:p-4">
      <div className={`w-full max-w-md h-full sm:h-[92vh] sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right transition-colors duration-300 border-l sm:border ${
        themeMode === 'dark' ? 'bg-slate-900 border-emerald-900/60 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-emerald-900/50 bg-slate-950">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-950/90 text-emerald-400 border border-emerald-800/60">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm font-serif">{t('yourCart')}</h3>
              <p className="text-xs text-amber-400 font-medium">{cartItemCount} {t('items')}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        {orderPlacedSuccess ? (
          <div className="flex-1 p-6 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-950 text-emerald-400 flex items-center justify-center border border-emerald-700/60 shadow-lg">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-white font-serif">{t('orderSuccess')}</h3>
            <p className="text-xs text-slate-400">Order ID: <strong className="text-amber-400 font-mono">{placedOrderId}</strong></p>
            <p className="text-xs text-slate-300 bg-slate-950 p-3.5 rounded-xl border border-slate-800 max-w-xs">
              Your order has been transmitted to the shop owner. You can track progress in your Customer Dashboard.
            </p>
            <button
              onClick={() => {
                onClose();
                setActivePage('customer-dashboard');
              }}
              className="mt-4 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-600 text-white text-xs font-bold shadow-lg shadow-emerald-950/60"
            >
              Go to Customer Dashboard
            </button>
          </div>
        ) : cart.length === 0 ? (
          <div className="flex-1 p-6 flex flex-col items-center justify-center text-center space-y-3 text-slate-400">
            <ShoppingBag className="w-12 h-12 text-slate-600" />
            <p className="text-sm font-medium text-slate-300">{t('cartEmpty')}</p>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-emerald-950/80 text-emerald-300 hover:bg-emerald-900/80 text-xs font-semibold border border-emerald-700/60"
            >
              Browse Businesses
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            
            {/* Shop Header */}
            {firstShop && (
              <div className="bg-emerald-950/80 border border-emerald-800/60 p-3 rounded-xl flex items-center justify-between text-xs">
                <div>
                  <span className="text-amber-400 text-[10px] uppercase font-extrabold tracking-wider">Fulfilling Shop</span>
                  <h4 className="text-white font-bold font-serif">{firstShop.businessName}</h4>
                </div>
                <span className="text-[11px] text-slate-300 font-medium">📍 {firstShop.address.split(',')[0]}</span>
              </div>
            )}

            {/* Cart Items List */}
            <div className="space-y-3">
              {cart.map((item) => (
                <div 
                  key={item.product.id}
                  className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl space-y-2.5 shadow-md"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <h4 className="text-xs font-semibold text-white font-serif">{item.product.name}</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Base: ₹{item.product.price} / {t(`unit_${item.product.sellingType}`)}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Bulk savings highlight banner */}
                  {item.savingsPerUnit > 0 && (
                    <div className="flex items-center gap-1.5 bg-emerald-950/90 border border-emerald-700/60 px-2.5 py-1 rounded-lg text-[11px] text-emerald-300 font-medium">
                      <Tag className="w-3.5 h-3.5 text-amber-400" />
                      <span>Bulk Price: ₹{item.effectiveUnitPrice}/{t(`unit_${item.product.sellingType}`)} (Save ₹{(item.savingsPerUnit * item.quantity).toFixed(0)})</span>
                    </div>
                  )}

                  {/* Controls: Quantity Selector & Total */}
                  <div className="flex items-center justify-between pt-1 border-t border-slate-800/80 text-xs">
                    <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1">
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                        className="text-slate-400 hover:text-white"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-bold text-amber-400 min-w-[20px] text-center">
                        {item.quantity} {t(`unit_${item.product.sellingType}`)}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                        className="text-slate-400 hover:text-white"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block">Total</span>
                      <span className="font-extrabold text-amber-400 text-sm">₹{item.totalPrice.toFixed(0)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Special Instructions */}
            <div className="space-y-1.5 pt-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                <span>{t('orderNotes')}</span>
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="E.g., Please call before arrival, house near landmark..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                rows={2}
              />
            </div>

          </div>
        )}

        {/* Footer Billing Breakdown & Actions */}
        {!orderPlacedSuccess && cart.length > 0 && (
          <div className="p-4 bg-slate-950 border-t border-slate-800 space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>{t('subtotal')}</span>
                <span>₹{subtotal.toFixed(0)}</span>
              </div>
              {savingsTotal > 0 && (
                <div className="flex justify-between text-emerald-400 font-bold">
                  <span>{t('discountSavings')}</span>
                  <span>-₹{savingsTotal.toFixed(0)}</span>
                </div>
              )}
              <div className="flex justify-between text-white font-black text-base pt-1 border-t border-slate-800">
                <span>{t('totalAmount')}</span>
                <span className="text-amber-400 font-serif">₹{totalPayable.toFixed(0)}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2 pt-1">
              <button
                onClick={handleCheckout}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-xs shadow-lg shadow-emerald-950/60 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
              >
                <span>{t('placeOrder')}</span>
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </button>

              {firstShop?.whatsappNumber && (
                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full py-2.5 rounded-xl bg-amber-950/80 hover:bg-amber-900/80 text-amber-300 border border-amber-700/60 font-semibold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <span>💬 {t('buyOnWhatsapp')}</span>
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
