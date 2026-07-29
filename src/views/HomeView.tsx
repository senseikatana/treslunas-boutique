import React from 'react';
import { Product, PageView } from '../types';
import { useAllProducts } from '../hooks/useProductsQuery';
import { ProductCard } from '../components/ProductCard';
import { TripleMoonLogo } from '../components/TripleMoonLogo';
import { ArrowRight, Sparkles, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface HomeViewProps {
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
  setCurrentView: (view: PageView) => void;
  isDarkMode: boolean;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onSelectProduct,
  onQuickAdd,
  setCurrentView,
  isDarkMode
}) => {
  const { data: products = [] } = useAllProducts();
  const newProducts = products.filter(p => p.isNew || p.isBestseller).slice(0, 4);

  return (
    <div className="space-y-0 pb-16">
      
      {/* TAILWIND UI OFFICIAL HERO SECTION WITH BRAND GRADIENTS */}
      <section className={`relative isolate overflow-hidden border-b transition-colors ${
        isDarkMode ? 'bg-[#0a0a0b] border-zinc-800' : 'bg-[#F8F7F4] border-zinc-200'
      }`}>
        {/* Top ambient blur glow */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80 pointer-events-none"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#92003a] via-[#b21b50] to-[#c37b58] opacity-25 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>

        <div className="mx-auto max-w-4xl py-16 sm:py-24 lg:py-28 px-6">
          
          {/* Badge Pill Announcement */}
          <div className="mb-8 flex justify-center">
            <div className="relative rounded-full px-4 py-1.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 ring-1 ring-zinc-900/10 dark:ring-white/15 hover:ring-zinc-900/20 dark:hover:ring-white/25 transition-all flex items-center gap-2 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md shadow-xs">
              <span className="font-mono-label font-bold text-[#92003a] dark:text-[#c37b58]">Boutique Cambrils</span>
              <span className="text-zinc-300 dark:text-zinc-700">|</span>
              <span>Nueva Colección de Erika</span>
              <button 
                onClick={() => setCurrentView('collection')}
                className="font-semibold text-[#92003a] dark:text-[#c37b58] flex items-center gap-1 hover:underline ml-1"
              >
                <span aria-hidden="true" className="absolute inset-0" />
                Ver Novedades <ArrowRight className="w-3.5 h-3.5 inline" />
              </button>
            </div>
          </div>

          {/* Centered Main Hero Headline */}
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-serif tracking-tight text-zinc-900 dark:text-white font-normal leading-[1.08]">
              MODA CON CARÁCTER Y <br />
              <i className="font-serif italic text-[#92003a] dark:text-copper-metallic font-semibold">ELEGANCIA CELESTIAL</i>
            </h1>

            <p className="mt-6 text-base sm:text-lg font-medium text-zinc-600 dark:text-zinc-300 max-w-xl mx-auto leading-relaxed">
              Prendas de vestir, joyería artesanal y accesorios exclusivos curados personalmente por Erika. Visita nuestra boutique en Cambrils o explora la tienda online.
            </p>

            <div className="mt-8 flex items-center justify-center gap-x-4 sm:gap-x-6">
              <button
                onClick={() => setCurrentView('collection')}
                className="rounded-md bg-[#92003a] hover:bg-[#72002d] px-6 py-3.5 text-xs font-mono-label font-bold text-white shadow-md transition-all flex items-center gap-2"
              >
                <span>VER COLECCIÓN</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setCurrentView('about')}
                className="text-xs font-mono-label font-bold text-zinc-900 dark:text-white hover:text-[#92003a] dark:hover:text-[#c37b58] transition-colors flex items-center gap-1 py-3.5"
              >
                <span>ASESORÍA DE ERIKA</span>
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom ambient blur glow */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)] pointer-events-none"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#92003a] via-[#c37b58] to-[#FFE185] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </section>

      {/* FEATURES STRIP */}
      <section className={`border-b ${
        isDarkMode ? 'bg-[#121214] border-zinc-800' : 'bg-[#EAE9E6] border-zinc-200'
      }`}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-zinc-200 dark:divide-zinc-800 text-center">
          
          <div className="p-6">
            <span className="font-mono-label text-[#92003a] dark:text-[#c37b58] font-bold">Click & Collect</span>
            <p className="text-xs text-zinc-700 dark:text-zinc-300 font-medium mt-1">Compra online y recoge hoy mismo en Cambrils.</p>
          </div>

          <div className="p-6">
            <span className="font-mono-label text-[#92003a] dark:text-[#c37b58] font-bold">La Selección de Erika</span>
            <p className="text-xs text-zinc-700 dark:text-zinc-300 font-medium mt-1">Asesoría de estilo personalizada e individual.</p>
          </div>

          <div className="p-6">
            <span className="font-mono-label text-[#92003a] dark:text-[#c37b58] font-bold">Envío 24h</span>
            <p className="text-xs text-zinc-700 dark:text-zinc-300 font-medium mt-1">Express a Cambrils, Reus, Salou y Tarragona.</p>
          </div>

        </div>
      </section>

      {/* CATALOG / NOVEDADES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4 gap-4">
          <div>
            <span className="font-mono-label text-[#92003a] dark:text-[#c37b58] font-bold">Catálogo</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-zinc-900 dark:text-white mt-1">
              DESCUBRE LAS NOVEDADES
            </h2>
          </div>

          <button
            onClick={() => setCurrentView('collection')}
            className="px-4 py-2 border border-zinc-900 dark:border-zinc-300 text-zinc-900 dark:text-zinc-100 font-mono-label text-[10px] font-bold uppercase hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            VER TODO
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
              onQuickAdd={onQuickAdd}
              isDarkMode={isDarkMode}
            />
          ))}
        </div>
      </section>

      {/* WHATSAPP ADVISORY BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className={`p-8 sm:p-12 border flex flex-col md:flex-row items-center justify-between gap-6 ${
          isDarkMode 
            ? 'bg-zinc-900/80 border-zinc-800 text-white' 
            : 'bg-[#EAE9E6] border-zinc-300 text-zinc-900'
        }`}>
          <div className="space-y-2 text-center md:text-left">
            <TripleMoonLogo variant={isDarkMode ? 'copper' : 'dark'} textSize="sm" />
            <h3 className="font-serif text-2xl sm:text-3xl font-normal mt-2">
              ¿Dudas sobre tu talla o tejido?
            </h3>
            <p className="text-xs sm:text-sm opacity-80 max-w-lg">
              Erika te asesora directamente por WhatsApp con fotos y medidas reales de la tienda.
            </p>
          </div>

          <a
            href="https://wa.me/34600123456?text=Hola%20Erika,%20me%20gustaria%20asesoramiento%20sobre%203%20Lunas%20Boutique"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 bg-[#25D366] hover:bg-[#1eb956] text-white font-mono-label font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shrink-0 transition-colors rounded-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span>CONSULTAR POR WHATSAPP</span>
          </a>
        </div>
      </section>

    </div>
  );
};

