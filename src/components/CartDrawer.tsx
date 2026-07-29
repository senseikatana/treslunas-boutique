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

        {/* HyperUI Popup Product Card Drawer Panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          role="dialog"
          aria-modal="true"
          aria-label="Shopping cart"
          tabIndex={-1}
          className={`relative w-full max-w-sm sm:max-w-md h-full shadow-2xl flex flex-col z-10 border-l px-4 py-6 sm:px-6 lg:px-8 transition-colors ${
            isDarkMode
              ? 'border-gray-800 bg-zinc-900 text-white shadow-black/80'
              : 'border-gray-200 bg-gray-50 text-gray-900'
          }`}
        >
          {/* Close button - HyperUI style */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-500 transition hover:scale-110 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white p-1"
          >
            <span className="sr-only">Close cart</span>
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Drawer Title */}
          <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-800 pr-8">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#92003a] dark:text-[#c37b58]" />
              <h3 className="font-heading font-black text-base uppercase tracking-wider text-gray-900 dark:text-white">
                Tu Cesta ({cartItems.length})
              </h3>
            </div>
            {cartItems.length > 0 && onClearCart && (
              <button
                onClick={onClearCart}
                className="text-[11px] text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 underline transition-colors"
                title="Vaciar cesta completa"
              >
                Vaciar
              </button>
            )}
          </div>

          {/* Local Delivery Badge */}
          <div className="mt-3 p-2.5 rounded-sm bg-[#FFE185] text-[#1C1B1B] text-xs font-bold flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 shrink-0" />
              <span>Envío Local Cambrils / Tarragona</span>
            </div>
            <span className="text-[10px] bg-black/10 px-1.5 py-0.5 rounded font-mono">24H</span>
          </div>

          {/* Items List - HyperUI Product Cards Popup Layout */}
          <div className="mt-4 flex-1 overflow-y-auto space-y-6 pr-1">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4 text-gray-500 dark:text-gray-400">
                <ShoppingBag className="w-12 h-12 stroke-[1.2] text-gray-400 dark:text-gray-600" />
                <p className="font-serif text-base">Tu cesta está vacía en este momento.</p>
                <button
                  onClick={() => {
                    setCurrentView('collection');
                    onClose();
                  }}
                  className="px-6 py-2.5 rounded-sm bg-[#92003a] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#b21b50] transition-colors"
                >
                  Descubrir Colección
                </button>
              </div>
            ) : (
              <ul className="space-y-4">
                {cartItems.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-4 p-3 rounded-md border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900/80 transition-colors"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="size-16 rounded-sm object-cover shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-gray-900 dark:text-white truncate">
                        {item.product.name}
                      </h3>

                      <dl className="mt-0.5 space-y-px text-[10px] text-gray-600 dark:text-gray-300">
                        <div>
                          <dt className="inline font-medium">Talla:</dt>{' '}
                          <dd className="inline font-bold">{item.selectedSize}</dd>
                        </div>

                        <div>
                          <dt className="inline font-medium">Color:</dt>{' '}
                          <dd className="inline font-bold">{item.selectedColor.name}</dd>
                        </div>

                        <div className="pt-0.5">
                          <dt className="inline font-semibold text-[#92003a] dark:text-[#c37b58]">
                            Precio:
                          </dt>{' '}
                          <dd className="inline font-bold text-[#92003a] dark:text-[#c37b58]">
                            €{(item.product.price * item.quantity).toFixed(2)}
                          </dd>
                        </div>
                      </dl>
                    </div>

                    <div className="flex items-center justify-end gap-2">
                      <form onSubmit={(e) => e.preventDefault()}>
                        <label htmlFor={`Line${idx}Qty`} className="sr-only">
                          Cantidad
                        </label>

                        <input
                          type="number"
                          min="1"
                          id={`Line${idx}Qty`}
                          value={item.quantity}
                          onChange={(e) => {
                            const val = parseInt(e.target.value, 10);
                            if (!isNaN(val) && val >= 1) {
                              onUpdateQuantity(idx, val);
                            }
                          }}
                          className="h-8 w-12 rounded-sm border border-gray-300 bg-white p-0 text-center text-xs text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 focus:outline-none [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none font-bold"
                        />
                      </form>

                      <button
                        type="button"
                        onClick={() => onRemoveItem(idx)}
                        className="text-gray-500 transition hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 p-1"
                        title="Eliminar producto"
                      >
                        <span className="sr-only">Remove item</span>
                        <svg
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* HyperUI Popup Action Buttons Footer */}
          {cartItems.length > 0 && (
            <div className="pt-4 mt-2 border-t border-gray-200 dark:border-gray-800 space-y-3 text-center">
              <div className="flex justify-between items-center text-sm font-bold px-1">
                <span className="text-gray-700 dark:text-gray-300">Subtotal:</span>
                <span className="text-base text-[#92003a] dark:text-[#c37b58]">
                  €{subtotal.toFixed(2)}
                </span>
              </div>

              <div className="space-y-2.5">
                <button
                  onClick={() => {
                    setCurrentView('cart');
                    onClose();
                  }}
                  className="block w-full rounded-sm border border-gray-300 bg-gray-50 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-gray-700 transition-colors hover:text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Ver mi carrito ({cartItems.length})
                </button>

                <button
                  onClick={() => {
                    setCurrentView('checkout');
                    onClose();
                  }}
                  className="block w-full rounded-sm border border-[#92003a] bg-[#92003a] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:border-[#72002d] hover:bg-[#72002d] dark:border-[#c37b58] dark:bg-[#c37b58] dark:text-gray-900 dark:hover:border-[#d68b66] dark:hover:bg-[#d68b66]"
                >
                  Procesar Pedido (Checkout)
                </button>

                <button
                  onClick={onClose}
                  className="inline-block text-xs font-medium text-gray-600 dark:text-gray-400 underline underline-offset-4 transition-colors hover:text-gray-900 dark:hover:text-gray-200"
                >
                  Continuar comprando
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
