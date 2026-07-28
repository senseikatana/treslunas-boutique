import React from 'react';
import { PageView } from '../types';
import { TripleMoonLogo } from '../components/TripleMoonLogo';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

interface NotFoundViewProps {
  setCurrentView: (view: PageView) => void;
  isDarkMode: boolean;
}

export const NotFoundView: React.FC<NotFoundViewProps> = ({ setCurrentView }) => {
  return (
    <div className="relative min-h-[70vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden py-16">
      
      {/* Background Triple Moon Outline matching screenshot #7 */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none scale-150">
        <TripleMoonLogo variant="outline" showText={false} className="w-full max-w-4xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 space-y-6 max-w-md mx-auto"
      >
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#c37b58]">3 LUNAS BOUTIQUE</span>
          <h1 className="font-heading font-black text-7xl sm:text-8xl md:text-9xl text-copper-metallic tracking-tighter">
            404
          </h1>
        </div>

        <p className="font-serif text-lg md:text-xl text-zinc-300 leading-relaxed italic">
          Parece que esta pieza no está en nuestra colección.
        </p>

        <button
          onClick={() => setCurrentView('home')}
          className="px-8 py-3.5 rounded bg-copper-metallic text-zinc-900 font-black text-xs uppercase tracking-widest hover:opacity-95 transition-opacity shadow-2xl inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>VOLVER AL INICIO</span>
        </button>
      </motion.div>

    </div>
  );
};
