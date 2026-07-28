import React from 'react';
import { CartItem, PageView } from '../types';
import { ShoppingBag, Trash2, Truck, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface CartViewProps {
  cartItems: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart?: () => void;
  setCurrentView: (view: PageView) => void;
  isDarkMode: boolean;
}

export const CartView: React.FC<CartViewProps> = ({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  setCurrentView,
  isDarkMode
}) => {
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* Title matching screenshot #1 */}
      <div className="text-center space-y-2">
        <h1 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl uppercase tracking-wider">
          3 Lunas Shopping Cart
        </h1>
        <div className="w-12 h-0.5 bg-[#c37b58] mx-auto" />
      </div>

      {cartItems.length === 0 ? (
        <div className={`p-12 text-center rounded-2xl border space-y-4 max-w-lg mx-auto ${
          isDarkMode ? 'bg-[#141416] border-zinc-800' : 'bg-white border-zinc-200'
        }`}>
          <ShoppingBag className="w-12 h-12 stroke-[1.2] mx-auto text-zinc-500" />
          <h2 className="font-serif text-xl">Tu carrito de compras está vacío.</h2>
          <p className="text-xs text-zinc-400">
            Explora las piezas exclusivas en nuestro catálogo para añadirlas a tu bolsa.
          </p>
          <button
            onClick={() => setCurrentView('collection')}
            className="px-6 py-3 rounded bg-gradient-to-r from-[#92003a] to-[#b21b50] text-white font-black text-xs uppercase tracking-widest hover:opacity-95 transition-opacity shadow-lg"
          >
            Ir al Catálogo
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Express Checkout & Item List */}
          <div className={`lg:col-span-7 p-6 rounded-2xl border space-y-6 ${
            isDarkMode ? 'bg-[#141416] border-zinc-800' : 'bg-white border-zinc-200'
          }`}>
            
            {/* Express Checkout section */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-px bg-zinc-800 flex-1" />
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Express Checkout</span>
                <div className="h-px bg-zinc-800 flex-1" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setCurrentView('checkout')}
                  className="py-3 px-4 rounded bg-white text-zinc-900 font-bold text-xs hover:bg-zinc-100 transition-colors flex items-center justify-center gap-2 shadow"
                >
                  <span className="text-amber-500 font-black">G</span> Pay
                </button>
                <button
                  onClick={() => setCurrentView('checkout')}
                  className="py-3 px-4 rounded bg-black text-white border border-zinc-700 font-bold text-xs hover:bg-zinc-900 transition-colors flex items-center justify-center gap-2 shadow"
                >
                  <span> Pay</span>
                </button>
              </div>
            </div>

            <div className="h-px bg-zinc-800/40" />

            {/* Cart Items List header & Clear Cart option */}
            <div className="flex items-center justify-between pb-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Productos Seleccionados ({cartItems.length})
              </h2>
              {onClearCart && (
                <button
                  onClick={onClearCart}
                  className="flex items-center gap-1.5 text-xs text-rose-500 hover:text-rose-400 font-semibold transition-colors px-2 py-1 rounded hover:bg-rose-500/10"
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
                  className="flex gap-4 items-center pb-6 border-b border-zinc-800/20 last:border-0 last:pb-0"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover rounded-lg border border-zinc-800 shrink-0"
                  />

                  <div className="flex-1 space-y-1">
                    <h3 className="font-serif font-bold text-base md:text-lg">{item.product.name}</h3>
                    <p className="text-xs text-zinc-400">
                      Size: <span className="font-medium text-zinc-200">{item.selectedSize}</span>
                    </p>
                    <p className="text-xs text-zinc-400">
                      Price: <span className="font-bold text-[#92003a] dark:text-[#ff99ac]">{item.product.price.toFixed(2)} €</span>
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-zinc-700 rounded overflow-hidden">
                      <button
                        onClick={() => onUpdateQuantity(idx, item.quantity - 1)}
                        className="px-2.5 py-1 text-xs hover:bg-zinc-800"
                      >
                        -
                      </button>
                      <span className="px-3 text-xs font-bold">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                        className="px-2.5 py-1 text-xs hover:bg-zinc-800"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(idx)}
                      className="p-1.5 text-zinc-500 hover:text-rose-500 transition-colors"
                      title="Eliminar elemento"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Order Summary & Local Delivery Badge matching screenshot #1 */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className={`p-6 rounded-2xl border space-y-6 ${
              isDarkMode ? 'bg-[#141416] border-zinc-800' : 'bg-white border-zinc-200'
            }`}>
              
              {/* Local Delivery Yellow Badge */}
              <div className="p-4 rounded-xl bg-[#FFE185] text-[#1C1B1B] font-bold text-xs flex items-center justify-between shadow-md">
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 shrink-0" />
                  <span>Local Delivery (Tarragona Area)</span>
                </div>
                <span className="w-5 h-5 rounded-full bg-black/10 flex items-center justify-center">✓</span>
              </div>

              {/* Subtotal & Shipping */}
              <div className="space-y-3 pt-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Subtotal</span>
                  <span className="font-heading font-black text-lg">{subtotal.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-400">Shipping</span>
                  <span className="text-zinc-400 italic">Calculated at next step</span>
                </div>
              </div>

              {/* Finalizar Compra Button matching screenshot #1 */}
              <button
                onClick={() => setCurrentView('checkout')}
                className="w-full py-4 rounded-lg bg-[#92003a] hover:bg-[#b21b50] text-white font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-[#92003a]/20 flex items-center justify-center gap-2"
              >
                <span>FINALIZAR COMPRA</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-zinc-400 pt-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Secure checkout</span>
              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};
