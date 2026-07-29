import React, { useState } from 'react';
import { Palette, X, ExternalLink, Sparkles } from 'lucide-react';
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
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          onClick={() => setIsOpen(true)}
          style={{
            marginRight: '30px',
            marginBottom: '20px',
            paddingLeft: '17px',
            height: '38px',
          }}
          className={`px-4 py-2.5 rounded-full border shadow-2xl transition-all flex items-center gap-2 text-xs font-bold tracking-wider uppercase group ${
            isDarkMode
              ? 'bg-zinc-900/95 text-[#c37b58] border-[#c37b58]/50 hover:bg-zinc-800 hover:border-[#c37b58]'
              : 'bg-white/95 text-[#92003a] border-[#92003a]/30 hover:bg-zinc-50 hover:border-[#92003a]'
          }`}
          title="Abrir Guía de Marca"
        >
          <Palette className="w-4 h-4 transition-transform group-hover:rotate-12 text-[#c37b58]" />
          <span>Guía de Marca</span>
          <span className="w-2 h-2 rounded-full bg-[#f62477] animate-pulse" />
        </button>
      </div>

      {/* HyperUI Style Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm dark:bg-black/80"
            />

            {/* Modal Dialog Content (HyperUI Modal structure) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="relative z-10 w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100"
            >
              <div className="flex flex-col gap-4">
                {/* Header */}
                <div className="flex items-start justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3.5">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-[#92003a]/10 text-[#92003a] dark:text-[#c37b58]">
                      <Palette className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 id="modalTitle" className="text-base font-bold text-zinc-900 sm:text-lg dark:text-white uppercase tracking-wider font-sans">
                        Guía de Marca & Sistema de Diseño
                      </h2>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        Erika & Erika — Alta Costura Cambrils
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="-me-2 -mt-2 rounded-full p-2 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
                    aria-label="Cerrar"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Description */}
                <p id="modalDescription" className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  Sistema de diseño cromático y tipográfico con tonos inspirados en el mediterráneo y la alta costura artesanal.
                </p>

                {/* Color Swatches Grid */}
                <div>
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-2">
                    Paleta Principal
                  </span>
                  <div className="grid grid-cols-5 gap-2">
                    {brandColors.map((color) => (
                      <div
                        key={color.hex}
                        className="group flex flex-col items-center"
                        title={`${color.name}: ${color.hex}`}
                      >
                        <div
                          className="w-full h-9 rounded-lg border border-black/10 dark:border-white/10 shadow-inner transition-transform group-hover:scale-105"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span className="text-[10px] font-mono mt-1 font-medium text-zinc-600 dark:text-zinc-400">
                          {color.hex}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Typography Block */}
                <div className="p-3.5 rounded-xl border bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200/80 dark:border-zinc-800">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold tracking-wider uppercase text-[#c37b58]">
                      Tipografía & Estilo
                    </span>
                    <Sparkles className="w-3.5 h-3.5 text-[#f62477]" />
                  </div>
                  <p className="font-serif text-sm italic text-zinc-800 dark:text-zinc-200">
                    Cormorant Garamond — Titulares de Lujo
                  </p>
                  <p className="font-sans text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                    Plus Jakarta Sans — Texto Funcional Moderno
                  </p>
                </div>

                {/* Footer Buttons */}
                <div className="flex justify-end gap-2.5 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="rounded-lg bg-zinc-100 px-4 py-2 text-xs font-semibold text-zinc-700 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
                  >
                    Cerrar
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setCurrentView('branding');
                      setIsOpen(false);
                    }}
                    className="rounded-lg bg-[#92003a] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#72002d] dark:bg-[#c37b58] dark:text-zinc-950 dark:hover:bg-[#d68b66] flex items-center gap-1.5"
                  >
                    <span>Ver Manual Completo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

