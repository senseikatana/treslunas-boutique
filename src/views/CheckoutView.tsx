import React, { useState } from 'react';
import { CartItem, ShippingDetails, PaymentMethod, Order, PageView } from '../types';
import { ShieldCheck, CheckCircle2, CreditCard, Lock } from 'lucide-react';
import { motion } from 'motion/react';

interface CheckoutViewProps {
  cartItems: CartItem[];
  onCompleteOrder: (order: Order) => void;
  setCurrentView: (view: PageView) => void;
  isDarkMode: boolean;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({
  cartItems,
  onCompleteOrder,
  setCurrentView,
  isDarkMode
}) => {
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shippingCost = subtotal > 50 ? 0 : 4.95;
  const total = subtotal + shippingCost;

  const [formData, setFormData] = useState<ShippingDetails>({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    email: '',
    phone: '',
    deliveryOption: 'local'
  });

  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>('bizum');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.address || !formData.email) return;

    setIsProcessing(true);
    setTimeout(() => {
      const newOrder: Order = {
        id: `3L-${Math.floor(100000 + Math.random() * 900000)}`,
        items: cartItems,
        shipping: formData,
        paymentMethod: selectedPayment,
        subtotal,
        shippingCost,
        total,
        createdAt: new Date().toLocaleDateString('es-ES'),
        status: 'Confirmado'
      };
      onCompleteOrder(newOrder);
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* Title matching screenshot #2 */}
      <div className="text-center space-y-2">
        <h1 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl tracking-wider">
          3 Lunas Payment & Checkout
        </h1>
        <p className="text-xs text-zinc-400">Finaliza tu pedido de forma rápida y 100% segura</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Left Column: Shipping & Billing Details matching screenshot #2 */}
        <div className={`p-6 md:p-8 rounded-2xl border space-y-6 ${
          isDarkMode ? 'bg-[#141416] border-zinc-800' : 'bg-white border-zinc-200'
        }`}>
          <h2 className="font-serif font-bold text-xl text-[#92003a] dark:text-[#F62477]">
            Shipping & Billing Details
          </h2>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-zinc-400 font-bold mb-1">Full Name</label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Full Name"
                className={`w-full px-4 py-3 rounded-lg border outline-none transition-all ${
                  isDarkMode 
                    ? 'bg-zinc-900 border-[#dfbec3]/40 text-white focus:border-[#F62477]' 
                    : 'bg-zinc-50 border-zinc-300 text-zinc-900 focus:border-[#92003a]'
                }`}
              />
            </div>

            <div>
              <label className="block text-zinc-400 font-bold mb-1">Address</label>
              <input
                type="text"
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Address"
                className={`w-full px-4 py-3 rounded-lg border outline-none transition-all ${
                  isDarkMode 
                    ? 'bg-zinc-900 border-[#dfbec3]/40 text-white focus:border-[#F62477]' 
                    : 'bg-zinc-50 border-zinc-300 text-zinc-900 focus:border-[#92003a]'
                }`}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-zinc-400 font-bold mb-1">City</label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="City (e.g. Cambrils, Tarragona)"
                  className={`w-full px-4 py-3 rounded-lg border outline-none transition-all ${
                    isDarkMode 
                      ? 'bg-zinc-900 border-[#dfbec3]/40 text-white focus:border-[#F62477]' 
                      : 'bg-zinc-50 border-zinc-300 text-zinc-900 focus:border-[#92003a]'
                  }`}
                />
              </div>

              <div>
                <label className="block text-zinc-400 font-bold mb-1">Postal Code</label>
                <input
                  type="text"
                  required
                  value={formData.postalCode}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  placeholder="Postal Code"
                  className={`w-full px-4 py-3 rounded-lg border outline-none transition-all ${
                    isDarkMode 
                      ? 'bg-zinc-900 border-[#dfbec3]/40 text-white focus:border-[#F62477]' 
                      : 'bg-zinc-50 border-zinc-300 text-zinc-900 focus:border-[#92003a]'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="block text-zinc-400 font-bold mb-1">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Email address for order receipt"
                className={`w-full px-4 py-3 rounded-lg border outline-none transition-all ${
                  isDarkMode 
                    ? 'bg-zinc-900 border-[#dfbec3]/40 text-white focus:border-[#F62477]' 
                    : 'bg-zinc-50 border-zinc-300 text-zinc-900 focus:border-[#92003a]'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Right Column: Payment Methods matching screenshot #2 */}
        <div className={`p-6 md:p-8 rounded-2xl border space-y-6 ${
          isDarkMode ? 'bg-[#141416] border-zinc-800' : 'bg-white border-zinc-200'
        }`}>
          <h2 className="font-serif font-bold text-xl text-[#92003a] dark:text-[#F62477]">
            Payment Methods
          </h2>

          <div className="grid grid-cols-2 gap-3">
            {/* Credit/Debit Card */}
            <button
              type="button"
              onClick={() => setSelectedPayment('card')}
              className={`p-4 rounded-xl border text-xs font-bold flex items-center gap-3 transition-all ${
                selectedPayment === 'card'
                  ? 'border-[#F62477] bg-[#F62477]/10 text-white ring-2 ring-[#F62477]'
                  : 'border-zinc-700 hover:border-zinc-500'
              }`}
            >
              <CreditCard className="w-5 h-5 text-amber-500" />
              <span>Credit/Debit Card</span>
            </button>

            {/* PayPal */}
            <button
              type="button"
              onClick={() => setSelectedPayment('paypal')}
              className={`p-4 rounded-xl border text-xs font-bold flex items-center gap-3 transition-all ${
                selectedPayment === 'paypal'
                  ? 'border-[#F62477] bg-[#F62477]/10 text-white ring-2 ring-[#F62477]'
                  : 'border-zinc-700 hover:border-zinc-500'
              }`}
            >
              <span className="text-blue-400 font-black text-sm">P</span>
              <span>PayPal</span>
            </button>

            {/* Bizum Copper Metallic Badge matching screenshot #2 */}
            <button
              type="button"
              onClick={() => setSelectedPayment('bizum')}
              className={`p-4 rounded-xl text-xs font-black flex items-center gap-3 transition-all bg-copper-metallic text-zinc-900 shadow-md ${
                selectedPayment === 'bizum' ? 'ring-2 ring-white scale-102' : 'opacity-90 hover:opacity-100'
              }`}
            >
              <span className="text-base font-extrabold">%</span>
              <span>Bizum</span>
            </button>

            {/* Apple Pay */}
            <button
              type="button"
              onClick={() => setSelectedPayment('apple_pay')}
              className={`p-4 rounded-xl border text-xs font-bold flex items-center gap-3 transition-all ${
                selectedPayment === 'apple_pay'
                  ? 'border-[#F62477] bg-[#F62477]/10 text-white ring-2 ring-[#F62477]'
                  : 'border-zinc-700 hover:border-zinc-500'
              }`}
            >
              <span> Pay</span>
              <span>Apple Pay</span>
            </button>

            {/* Google Pay */}
            <button
              type="button"
              onClick={() => setSelectedPayment('google_pay')}
              className={`p-4 rounded-xl border text-xs font-bold flex items-center gap-3 transition-all ${
                selectedPayment === 'google_pay'
                  ? 'border-[#F62477] bg-[#F62477]/10 text-white ring-2 ring-[#F62477]'
                  : 'border-zinc-700 hover:border-zinc-500'
              }`}
            >
              <span className="text-amber-500 font-bold">G</span>
              <span>Google Pay</span>
            </button>

            {/* Klarna */}
            <button
              type="button"
              onClick={() => setSelectedPayment('klarna')}
              className={`p-4 rounded-xl border text-xs font-bold flex items-center gap-3 transition-all ${
                selectedPayment === 'klarna'
                  ? 'border-[#F62477] bg-[#F62477]/10 text-white ring-2 ring-[#F62477]'
                  : 'border-zinc-700 hover:border-zinc-500'
              }`}
            >
              <span className="font-serif font-black text-rose-300">K.</span>
              <span>Klarna - Buy Now, Pay Later</span>
            </button>
          </div>

          {/* Safe Checkout Pill matching screenshot #2 */}
          <div className="flex justify-center pt-2">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#FFE185] text-[#1C1B1B] text-xs font-black shadow-md">
              <ShieldCheck className="w-4 h-4 text-[#1C1B1B]" />
              <span>Safe Checkout</span>
            </div>
          </div>

          {/* Order Summary Line */}
          <div className="pt-4 border-t border-zinc-800/40 space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-zinc-400">Total a Pagar:</span>
              <span className="font-heading font-black text-lg text-copper-metallic">€{total.toFixed(2)}</span>
            </div>
          </div>

          {/* PAGAR AHORA metallic berry button matching screenshot #2 */}
          <button
            type="submit"
            disabled={isProcessing}
            className="w-full py-4 rounded-xl bg-berry-metallic text-white font-black text-sm uppercase tracking-widest shadow-2xl hover:opacity-95 transition-opacity flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <span className="animate-pulse">PROCESANDO PAGO SEGURO...</span>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>PAGAR AHORA (€{total.toFixed(2)})</span>
              </>
            )}
          </button>

        </div>

      </form>
    </div>
  );
};
