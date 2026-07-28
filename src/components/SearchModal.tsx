import React, { useState, useMemo } from 'react';
import { Product, PageView } from '../types';
import { PRODUCTS } from '../data/products';
import { Search, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  setCurrentView: (view: PageView) => void;
  isDarkMode: boolean;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  setCurrentView,
  isDarkMode
}) => {
  const [query, setQuery] = useState('');

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return PRODUCTS.filter(
      p => p.name.toLowerCase().includes(q) || 
           p.category.toLowerCase().includes(q) || 
           p.description.toLowerCase().includes(q)
    );
  }, [query]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className={`w-full max-w-2xl rounded-xl border shadow-2xl overflow-hidden ${
            isDarkMode ? 'bg-[#141416] border-zinc-800 text-white' : 'bg-white border-zinc-200 text-zinc-900'
          }`}
        >
          {/* Input Header */}
          <div className="p-4 border-b border-zinc-800/20 flex items-center gap-3">
            <Search className="w-5 h-5 text-[#c37b58]" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar vestidos, collares, seda, lino..."
              className={`w-full text-base bg-transparent focus:outline-none placeholder:text-zinc-500 font-medium ${
                isDarkMode ? 'text-white' : 'text-zinc-900'
              }`}
            />
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-zinc-500/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Results List */}
          <div className="max-h-[60vh] overflow-y-auto p-4">
            {query.trim() === '' ? (
              <div className="py-8 text-center space-y-3">
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">Sugerencias populares</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {['Vestido Lino', 'Selenite Moon', 'Bolsa Cuero', 'Sandalias Cambrils', 'Accesorios'].map((tag, i) => (
                    <button
                      key={i}
                      onClick={() => setQuery(tag)}
                      className="px-3 py-1.5 rounded-full text-xs font-medium border border-zinc-700/50 hover:border-[#c37b58] hover:text-[#c37b58] transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="py-12 text-center text-zinc-400">
                <p>No se encontraron piezas para "{query}".</p>
                <button
                  onClick={() => {
                    setCurrentView('collection');
                    onClose();
                  }}
                  className="mt-3 text-xs text-[#c37b58] underline font-bold"
                >
                  Explorar todo el catálogo
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                  {filteredProducts.length} Pieza(s) encontrada(s)
                </p>
                {filteredProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      onSelectProduct(p);
                      onClose();
                    }}
                    className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-colors border ${
                      isDarkMode
                        ? 'bg-zinc-900/60 border-zinc-800 hover:border-[#c37b58]'
                        : 'bg-zinc-50 border-zinc-200 hover:border-[#92003a]'
                    }`}
                  >
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      className="w-14 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-serif font-bold text-sm">{p.name}</h4>
                      <p className="text-xs text-zinc-400">{p.category}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-heading font-black text-sm text-[#92003a] dark:text-[#EAB393]">
                        €{p.price.toFixed(2)}
                      </span>
                      <ArrowRight className="w-4 h-4 ml-auto mt-1 text-zinc-400" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
