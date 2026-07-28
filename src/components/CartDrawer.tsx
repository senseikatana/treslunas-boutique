import React from 'react';
import { CartItem, PageView } from '../types';
import { X, Trash2, ShoppingBag, Truck, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart?: () => void;
  setCurrentView: (view: PageView) => void;
  isDarkMode: boolean;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  setCurrentView,
  isDarkMode
}) => {
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Drawer Panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className={`relative w-full max-w-md h-full shadow-2xl flex flex-col z-10 ${
            isDarkMode ? 'bg-[#141416] text-white border-l border-zinc-800' : 'bg-white text-zinc-900 border-l border-zinc-200'
          }`}
        >
          {/* Header */}
          <div className="p-5 border-b border-zinc-800/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#c37b58]" />
              <h3 className="font-heading font-black text-base uppercase tracking-wider">
                Tu Cesta ({cartItems.length})
              </h3>
            </div>
            <div className="flex items-center gap-2">
              {cartItems.length > 0 && onClearCart && (
                <button
                  onClick={onClearCart}
                  className="text-[11px] text-zinc-400 hover:text-rose-500 underline transition-colors px-2 py-1"
                  title="Vaciar cesta completa"
                >
                  Vaciar cesta
                </button>
              )}
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-zinc-500/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Local Delivery Badge */}
          <div className="mx-5 mt-4 p-3 rounded-lg bg-[#FFE185] text-[#1C1B1B] text-xs font-bold flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 shrink-0" />
              <span>Entrega Local Cambrils / Tarragona</span>
            </div>
            <span className="text-[10px] bg-black/10 px-2 py-0.5 rounded">24H</span>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4 text-zinc-500">
                <ShoppingBag className="w-12 h-12 stroke-[1.2] text-zinc-600" />
                <p className="font-serif text-lg">Tu cesta está vacía en este momento.</p>
                <button
                  onClick={() => {
                    setCurrentView('collection');
                    onClose();
                  }}
                  className="px-6 py-2.5 rounded bg-[#92003a] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#b21b50] transition-colors"
                >
                  Descubrir Colección
                </button>
              </div>
            ) : (
              cartItems.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg border flex gap-3 ${
                    isDarkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
                  }`}
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-16 h-20 object-cover rounded"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif font-bold text-sm line-clamp-1">{item.product.name}</h4>
                        <button
                          onClick={() => onRemoveItem(idx)}
                          className="text-zinc-500 hover:text-rose-500 p-1 transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-zinc-400">
                        Talla: <span className="font-semibold text-zinc-300">{item.selectedSize}</span> | Color: <span className="font-semibold text-zinc-300">{item.selectedColor.name}</span>
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-zinc-700/50 rounded overflow-hidden">
                        <button
                          onClick={() => onUpdateQuantity(idx, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs hover:bg-zinc-700/50"
                        >
                          -
                        </button>
                        <span className="px-2 py-0.5 text-xs font-bold">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs hover:bg-zinc-700/50"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-heading font-black text-xs text-[#92003a] dark:text-[#EAB393]">
                        €{(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cartItems.length > 0 && (
            <div className={`p-5 border-t space-y-3 ${
              isDarkMode ? 'border-zinc-800 bg-[#0f0f10]' : 'border-zinc-200 bg-zinc-50'
            }`}>
              <div className="flex justify-between items-center text-sm font-bold">
                <span>Subtotal</span>
                <span className="text-base text-[#92003a] dark:text-[#EAB393]">€{subtotal.toFixed(2)}</span>
              </div>
              <p className="text-[10px] text-zinc-500">Impuestos incluidos. Envío calculado en el siguiente paso.</p>

              <div className="space-y-2 pt-2">
                <button
                  onClick={() => {
                    setCurrentView('cart');
                    onClose();
                  }}
                  className="w-full py-3 rounded bg-gradient-to-r from-[#92003a] to-[#b21b50] text-white font-black text-xs uppercase tracking-widest hover:opacity-95 transition-opacity flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>IR AL CARRITO COMPLETO</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    setCurrentView('checkout');
                    onClose();
                  }}
                  className="w-full py-2.5 rounded border border-[#c37b58] text-[#c37b58] font-bold text-xs uppercase tracking-wider hover:bg-[#c37b58]/10 transition-colors flex items-center justify-center gap-1.5"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>CHECKOUT RÁPIDO SEGURO</span>
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
