import React from 'react';
import { Product, PageView } from '../types';
import { useAllProducts } from '../hooks/useProductsQuery';
import { ProductCard } from '../components/ProductCard';
import { TripleMoonLogo } from '../components/TripleMoonLogo';
import { ArrowRight, ShoppingBag, Sparkles, MapPin, Truck, Award, MessageCircle, Loader2 } from 'lucide-react';
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
  const { data: products = [], isLoading } = useAllProducts();
  const newProducts = products.filter(p => p.isNew || p.isBestseller).slice(0, 6);


  return (
    <div className="space-y-16 pb-20">
      
      {/* HERO SECTION matching screenshot #11 & #12 */}
      <section className={`relative overflow-hidden border-b ${
        isDarkMode ? 'bg-[#0a0a0b] border-zinc-800' : 'bg-[#f7f5f2] border-zinc-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6"
            >
              {/* Location pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#92003a]/10 border border-[#92003a]/20 text-[#c37b58] text-xs font-bold uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5" />
                <span>TIENDA FÍSICA EN CAMBRILS</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight leading-[1.1]">
                MODA CON CARÁCTER <br />
                <span className="text-copper-metallic">SELECCIONADA PARA TI.</span>
              </h1>

              <p className="text-zinc-400 text-sm md:text-base max-w-xl leading-relaxed">
                Encuentra prendas de vestir y accesorios curados por Erika para expresar tu mejor versión. Visítanos en Cambrils o compra online con envío local express.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => setCurrentView('collection')}
                  className="px-8 py-3.5 rounded bg-gradient-to-r from-[#92003a] to-[#b21b50] text-white font-black text-xs uppercase tracking-widest hover:opacity-95 transition-all shadow-xl shadow-[#92003a]/20 flex items-center gap-2"
                >
                  <span>VER COLECCIÓN</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setCurrentView('about')}
                  className="px-6 py-3.5 rounded border border-[#c37b58]/60 text-[#c37b58] font-bold text-xs uppercase tracking-wider hover:bg-[#c37b58]/10 transition-colors flex items-center gap-2"
                >
                  <span>ASESORÍA DE ERIKA</span>
                  <Sparkles className="w-4 h-4" />
                </button>
              </div>
            </motion.div>

            {/* Right Column High Fashion Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-2xl border border-zinc-800">
                <img
                  src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80"
                  alt="3 Lunas Boutique Cambrils Fashion"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-white space-y-1">
                  <div className="text-[10px] uppercase font-bold tracking-widest text-[#EAB393]">
                    Colección Primavera - Verano
                  </div>
                  <p className="font-serif font-bold text-base">Elegancia Natural & Estilo Celestial</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Value Props Bar matching screenshot #11 */}
        <div className={`border-t py-6 ${
          isDarkMode ? 'bg-[#141416] border-zinc-800' : 'bg-white border-zinc-200'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="flex items-center gap-4 p-3 rounded-lg">
              <div className="p-3 rounded-full bg-[#92003a]/10 text-[#c37b58]">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider">Click & Collect en Cambrils</h4>
                <p className="text-xs text-zinc-400">Compra online y recoge hoy mismo en nuestra tienda física.</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-3 rounded-lg">
              <div className="p-3 rounded-full bg-[#92003a]/10 text-[#c37b58]">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider">La Selección de Erika</h4>
                <p className="text-xs text-zinc-400">Prendas curadas y asesoría de estilo personalizada.</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-3 rounded-lg">
              <div className="p-3 rounded-full bg-[#92003a]/10 text-[#c37b58]">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider">Envío Local en 24h</h4>
                <p className="text-xs text-zinc-400">Envíos exprés a Cambrils, Reus, Salou y Tarragona.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* NOVEDADES CATALOG SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-black uppercase tracking-[0.3em] text-[#c37b58]">CATÁLOGO</span>
          <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight">
            DESCUBRE LAS NOVEDADES
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-[#c37b58] to-[#92003a] mx-auto mt-2" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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

        <div className="text-center pt-6">
          <button
            onClick={() => setCurrentView('collection')}
            className="px-8 py-3 rounded border border-zinc-700 hover:border-[#c37b58] font-bold text-xs uppercase tracking-widest hover:text-[#c37b58] transition-colors"
          >
            Ver Todas las Piezas
          </button>
        </div>
      </section>

      {/* BRAND STORY & WHATSAPP ADVISORY BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`rounded-2xl p-8 md:p-12 border relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 ${
          isDarkMode ? 'bg-gradient-to-br from-[#18181c] to-[#0f0f10] border-zinc-800' : 'bg-gradient-to-br from-zinc-100 to-white border-zinc-200'
        }`}>
          <div className="space-y-4 max-w-xl">
            <TripleMoonLogo variant={isDarkMode ? 'copper' : 'dark'} textSize="sm" />
            <h3 className="font-serif text-2xl md:text-3xl font-bold">
              ¿Dudas sobre tu talla o cómo combinar tu look?
            </h3>
            <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">
              Erika te asesora directamente por WhatsApp para asegurarte la elección perfecta para cada ocasión.
            </p>
          </div>

          <a
            href="https://wa.me/34600123456?text=Hola%20Erika,%20me%20gustaria%20asesoramiento%20sobre%203%20Lunas%20Boutique"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-3 shadow-xl shrink-0 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Consultar por WhatsApp</span>
          </a>
        </div>
      </section>

    </div>
  );
};
