import React from 'react';
import { CartItem, PageView } from '../types';
import { ShoppingBag, Trash2, Truck, ShieldCheck, ArrowRight } from 'lucide-react';
import { TRANSLATIONS, LanguageCode } from '../i18n/translations';

interface CartViewProps {
  cartItems: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart?: () => void;
  setCurrentView: (view: PageView) => void;
  isDarkMode: boolean;
  language?: LanguageCode;
}

export const CartView: React.FC<CartViewProps> = ({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  setCurrentView,
  isDarkMode,
  language = 'es'
}) => {
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const t = TRANSLATIONS[language] || TRANSLATIONS.es;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* Title */}
      <div className="text-center space-y-2">
        <h1 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl uppercase tracking-wider text-slate-900 dark:text-zinc-100">
          {t.cart} — 3 Lunas Boutique
        </h1>
        <div className="w-12 h-0.5 bg-[#c37b58] mx-auto" />
      </div>

      {cartItems.length === 0 ? (
        <div className={`p-12 text-center rounded-2xl border space-y-4 max-w-lg mx-auto ${
          isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-200'
        }`}>
          <ShoppingBag className="w-12 h-12 stroke-[1.2] mx-auto text-slate-400 dark:text-zinc-500" />
          <h2 className="font-serif text-xl text-slate-800 dark:text-zinc-200">{t.cartEmpty}</h2>
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            Explora las piezas exclusivas en nuestro catálogo para añadirlas a tu bolsa.
          </p>
          <button
            onClick={() => setCurrentView('collection')}
            className="px-6 py-3 rounded-xl bg-[#92003a] hover:bg-[#72002d] text-white font-black text-xs uppercase tracking-widest transition-colors shadow-md"
          >
            {t.exploreCollection}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Express Checkout & Item List */}
          <div className={`lg:col-span-7 p-6 rounded-2xl border space-y-6 ${
            isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-200'
          }`}>
            
            {/* Express Checkout section */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-px bg-slate-200 dark:bg-zinc-800 flex-1" />
                <span className="text-xs font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider">Express Checkout</span>
                <div className="h-px bg-slate-200 dark:bg-zinc-800 flex-1" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setCurrentView('checkout')}
                  className="py-3 px-4 rounded-xl bg-slate-100 dark:bg-zinc-800 text-slate-900 dark:text-zinc-100 font-bold text-xs hover:bg-slate-200 dark:hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2 border border-slate-200 dark:border-zinc-700"
                >
                  <span className="text-amber-500 font-black">G</span> Pay
                </button>
                <button
                  onClick={() => setCurrentView('checkout')}
                  className="py-3 px-4 rounded-xl bg-slate-900 dark:bg-zinc-950 text-white border border-slate-800 dark:border-zinc-800 font-bold text-xs hover:bg-slate-800 dark:hover:bg-zinc-900 transition-colors flex items-center justify-center gap-2"
                >
                  <span> Pay</span>
                </button>
              </div>
            </div>

            <div className="h-px bg-slate-200 dark:bg-zinc-800" />

            {/* Cart Items List header & Clear Cart option */}
            <div className="flex items-center justify-between pb-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
                Productos Seleccionados ({cartItems.length})
              </h2>
              {onClearCart && (
                <button
                  onClick={onClearCart}
                  className="flex items-center gap-1.5 text-xs text-rose-500 hover:text-rose-600 font-semibold transition-colors px-2 py-1 rounded-lg hover:bg-rose-500/10"
                  title="Eliminar todos los productos de la cesta"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Vaciar carrito</span>
                </button>
              )}
            </div>

            {/* Cart Items List */}
            <div className="space-y-6">
              {cartItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex gap-4 items-center pb-6 border-b border-slate-200 dark:border-zinc-800/60 last:border-0 last:pb-0"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover rounded-xl border border-slate-200 dark:border-zinc-800 shrink-0"
                  />

                  <div className="flex-1 space-y-1">
                    <h3 className="font-serif font-bold text-base md:text-lg text-slate-900 dark:text-zinc-100">{item.product.name}</h3>
                    <p className="text-xs text-slate-500 dark:text-zinc-400">
                      Talla: <span className="font-medium text-slate-800 dark:text-zinc-200">{item.selectedSize}</span>
                    </p>
                    <p className="text-xs text-slate-500 dark:text-zinc-400">
                      Precio: <span className="font-bold text-[#92003a] dark:text-[#c37b58]">€{item.product.price.toFixed(2)}</span>
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3">
                    <div>
                      <label htmlFor={`Quantity-cart-${idx}`} className="sr-only">Cantidad</label>
                      <div className="flex items-center rounded-lg border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(idx, item.quantity - 1)}
                          className="size-9 leading-9 text-center text-slate-600 transition hover:opacity-75 dark:text-zinc-300 font-bold"
                        >
                          &minus;
                        </button>

                        <input
                          type="number"
                          id={`Quantity-cart-${idx}`}
                          value={item.quantity}
                          onChange={(e) => {
                            const val = parseInt(e.target.value, 10);
                            if (!isNaN(val) && val >= 1) {
                              onUpdateQuantity(idx, val);
                            }
                          }}
                          className="h-9 w-12 border-transparent text-center text-xs font-bold text-slate-900 dark:text-white bg-transparent [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none focus:outline-none"
                        />

                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                          className="size-9 leading-9 text-center text-slate-600 transition hover:opacity-75 dark:text-zinc-300 font-bold"
                        >
                          &plus;
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => onRemoveItem(idx)}
                      className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors"
                      title="Eliminar elemento"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Order Summary & Local Delivery Badge */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className={`p-6 rounded-2xl border space-y-6 ${
              isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-200'
            }`}>
              
              {/* Local Delivery Yellow Badge */}
              <div className="p-4 rounded-xl bg-[#FFE185] text-[#1C1B1B] font-bold text-xs flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 shrink-0" />
                  <span>Local Delivery (Tarragona Area)</span>
                </div>
                <span className="w-5 h-5 rounded-full bg-black/10 flex items-center justify-center">✓</span>
              </div>

              {/* Subtotal & Shipping */}
              <div className="space-y-3 pt-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 dark:text-zinc-400">{t.subtotal}</span>
                  <span className="font-heading font-black text-lg text-slate-900 dark:text-zinc-100">€{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 dark:text-zinc-400">{t.shipping}</span>
                  <span className="text-slate-500 dark:text-zinc-400 italic">Calculado en el siguiente paso</span>
                </div>
              </div>

              {/* Finalizar Compra Button */}
              <button
                onClick={() => setCurrentView('checkout')}
                className="w-full py-4 rounded-xl bg-[#92003a] hover:bg-[#72002d] text-white font-black text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>{t.checkout}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-slate-400 dark:text-zinc-500 pt-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Pago 100% seguro con Stripe</span>
              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

