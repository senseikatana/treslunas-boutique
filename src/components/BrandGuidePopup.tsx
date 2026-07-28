import React, { useState } from 'react';
import { Palette, X, ExternalLink, Sparkles, Check, ChevronUp, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PageView } from '../types';

interface BrandGuidePopupProps {
  setCurrentView: (view: PageView) => void;
  isDarkMode: boolean;
}

export const BrandGuidePopup: React.FC<BrandGuidePopupProps> = ({
  setCurrentView,
  isDarkMode,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const brandColors = [
    { name: 'Berry Velvet', hex: '#92003A', desc: 'Primario Elegante' },
    { name: 'Vibrant Pink', hex: '#F62477', desc: 'Acento Energético' },
    { name: 'Copper Metallic', hex: '#C37B58', desc: 'Detalles Lujo' },
    { name: 'Warm Gold', hex: '#FFE185', desc: 'Resaltado' },
    { name: 'Luxury Dark', hex: '#050505', desc: 'Fondo Noche' },
  ];

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className={`pointer-events-auto mb-3 w-[320px] sm:w-[360px] rounded-2xl shadow-2xl border backdrop-blur-xl overflow-hidden ${
              isDarkMode
                ? 'bg-zinc-950/95 border-[#c37b58]/30 text-zinc-100 shadow-black/80'
                : 'bg-white/95 border-[#92003a]/20 text-zinc-900 shadow-xl'
            }`}
          >
            {/* Header */}
            <div
              className={`px-4 py-3.5 border-b flex items-center justify-between ${
                isDarkMode ? 'border-zinc-800/80 bg-zinc-900/50' : 'border-zinc-100 bg-rose-50/40'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-[#92003a]/10 text-[#92003a] dark:text-[#c37b58]">
                  <Palette className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold tracking-wider uppercase font-sans">
                    Guía de Marca
                  </h4>
                  <p className="text-[10px] text-zinc-500 dark:text-zinc-400">
                    Sistema de Diseño Erika & Erika
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-zinc-500/10 transition-colors text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
                title="Cerrar ventana emergente"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-4 space-y-4 text-xs">
              {/* Color Swatches */}
              <div>
                <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider block mb-2">
                  Paleta de Colores
                </span>
                <div className="grid grid-cols-5 gap-1.5">
                  {brandColors.map((color) => (
                    <div
                      key={color.hex}
                      className="group relative flex flex-col items-center cursor-pointer"
                      title={`${color.name}: ${color.hex}`}
                    >
                      <div
                        className="w-full h-8 rounded-lg border border-black/10 dark:border-white/10 shadow-inner transition-transform group-hover:scale-105"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className="text-[9px] font-mono mt-1 text-zinc-500 dark:text-zinc-400">
                        {color.hex}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Typography & Identity preview */}
              <div
                className={`p-3 rounded-xl border ${
                  isDarkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-zinc-50 border-zinc-200/60'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold tracking-wider uppercase text-[#c37b58]">
                    Tipografía & Identidad
                  </span>
                  <Sparkles className="w-3 h-3 text-[#f62477]" />
                </div>
                <p className="font-serif text-sm italic text-zinc-800 dark:text-zinc-200">
                  Cormorant Garamond — Alta Costura
                </p>
                <p className="font-sans text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                  Plus Jakarta Sans — Modernidad Elegante
                </p>
              </div>

              {/* CTA to full Branding Guide view */}
              <button
                onClick={() => {
                  setCurrentView('branding');
                  setIsOpen(false);
                }}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-md ${
                  isDarkMode
                    ? 'bg-[#c37b58] text-zinc-950 hover:bg-[#d68b66]'
                    : 'bg-[#92003a] text-white hover:bg-[#72002d]'
                }`}
              >
                <span>Ver Guía Completa</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`pointer-events-auto px-4 py-2.5 rounded-full border shadow-2xl transition-all flex items-center gap-2 text-xs font-bold tracking-wider uppercase group ${
          isOpen
            ? isDarkMode
              ? 'bg-[#c37b58] text-zinc-950 border-[#c37b58]'
              : 'bg-[#92003a] text-white border-[#92003a]'
            : isDarkMode
            ? 'bg-zinc-900/95 text-[#c37b58] border-[#c37b58]/50 hover:bg-zinc-800 hover:border-[#c37b58]'
            : 'bg-white/95 text-[#92003a] border-[#92003a]/30 hover:bg-zinc-50 hover:border-[#92003a]'
        }`}
        title={isOpen ? 'Cerrar ventana emergente' : 'Abrir Guía de Marca'}
      >
        <Palette className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-90' : 'group-hover:rotate-12'}`} />
        <span>{isOpen ? 'Cerrar' : 'Guía de Marca'}</span>
        {isOpen ? (
          <X className="w-3.5 h-3.5 ml-0.5 opacity-80" />
        ) : (
          <span className="w-2 h-2 rounded-full bg-[#f62477] animate-pulse" />
        )}
      </button>
    </div>
  );
};
