import React from 'react';
import { TripleMoonLogo } from '../components/TripleMoonLogo';
import { Moon, Sparkles, MapPin, Clock, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface AboutViewProps {
  isDarkMode: boolean;
}

export const AboutView: React.FC<AboutViewProps> = ({ isDarkMode }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Hero Section matching screenshot #6 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Column: Erika's Black & White Portrait */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5"
        >
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-zinc-800">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80"
              alt="Erika - Fundadora de 3 Lunas Boutique Cambrils"
              className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
              <span className="text-xs uppercase font-bold tracking-widest text-[#EAB393]">FUNDADORA & DIRECTOR CREATIVA</span>
              <h3 className="font-serif text-2xl font-bold">Erika</h3>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Narrative & Philosophy matching screenshot #6 */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-7 space-y-8"
        >
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#92003a] dark:text-[#c37b58]">3 LUNAS BOUTIQUE</span>
            <h1 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-slate-900 dark:text-zinc-100 mt-1">
              SOBRE NOSOTROS
            </h1>
            <p className="text-base md:text-lg font-serif italic text-slate-600 dark:text-zinc-400 mt-1">
              La Historia de Erika y 3 Lunas
            </p>
            <div className="w-16 h-0.5 bg-gradient-to-r from-[#c37b58] to-[#92003a] mt-3" />
          </div>

          <p className="text-xs md:text-sm text-slate-700 dark:text-zinc-300 leading-relaxed font-medium">
            Nacida en el corazón de Cambrils, 3 Lunas Boutique es el sueño de Erika. Inspirada por la belleza celestial y la artesanía local, creamos piezas únicas que celebran la feminidad y el estilo personal. Nuestra boutique es un santuario de moda y diseño, donde cada prenda cuenta una historia.
          </p>

          {/* The Philosophy 3 Pillars matching screenshot #6 */}
          <div className="space-y-3 pt-2">
            <h3 className="font-serif font-bold text-lg text-[#92003a] dark:text-[#EAB393]">The Philosophy</h3>
            <div className="grid grid-cols-3 gap-4 pt-2">
              
              <div className="text-center space-y-2 p-3.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 shadow-xs">
                <Moon className="w-6 h-6 mx-auto text-[#92003a] dark:text-[#c37b58]" />
                <span className="font-heading font-bold text-xs uppercase tracking-wider block text-slate-900 dark:text-zinc-100">SOSTENIBLE</span>
              </div>

              <div className="text-center space-y-2 p-3.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 shadow-xs">
                <Sparkles className="w-6 h-6 mx-auto text-[#92003a] dark:text-[#c37b58]" />
                <span className="font-heading font-bold text-xs uppercase tracking-wider block text-slate-900 dark:text-zinc-100">ARTESANAL</span>
              </div>

              <div className="text-center space-y-2 p-3.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 shadow-xs">
                <div className="flex justify-center">
                  <TripleMoonLogo variant={isDarkMode ? "copper" : "dark"} showText={false} />
                </div>
                <span className="font-heading font-bold text-xs uppercase tracking-wider block text-slate-900 dark:text-zinc-100">ATEMPORAL</span>
              </div>

            </div>
          </div>

          {/* VISIT US Section matching screenshot #6 */}
          <div className="pt-6 border-t border-slate-200 dark:border-zinc-800 space-y-2 text-center md:text-left">
            <h4 className="font-serif font-bold text-base text-[#92003a] dark:text-[#EAB393]">VISIT US</h4>
            <div className="text-xs text-slate-600 dark:text-zinc-400 space-y-1">
              <p>Encuéntranos en Cambrils:</p>
              <p className="font-semibold text-slate-900 dark:text-zinc-200">Carrer de les Tres Llunes, 12, 43850 Cambrils, Spain.</p>
              <p className="italic text-slate-500 dark:text-zinc-500">Abierto de Lunes a Sábado.</p>
            </div>

            <div className="pt-2">
              <a
                href="https://wa.me/34600123456?text=Hola%20Erika,%20me%20gustaria%20visitar%20la%20boutique"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-lg"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Contactar a Erika por WhatsApp</span>
              </a>
            </div>
          </div>

        </motion.div>

      </div>

    </div>
  );
};
