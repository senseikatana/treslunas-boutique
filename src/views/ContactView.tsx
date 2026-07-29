import React, { useState } from 'react';
import { MapPin, Phone, MessageCircle, Send, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface ContactViewProps {
  isDarkMode: boolean;
}

export const ContactView: React.FC<ContactViewProps> = ({ isDarkMode }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && message) {
      setSent(true);
      setName('');
      setEmail('');
      setMessage('');
      setTimeout(() => setSent(false), 5000);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Title matching screenshot #13 */}
      <div className="text-center space-y-2">
        <h1 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl uppercase tracking-wider text-slate-900 dark:text-zinc-100">
          3 Lunas Contact Page
        </h1>
        <div className="w-16 h-0.5 bg-[#c37b58] mx-auto" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Contact Form matching screenshot #13 */}
        <div className={`lg:col-span-6 p-6 md:p-8 rounded-2xl border space-y-6 ${
          isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <h2 className="font-serif font-bold text-xl text-[#92003a] dark:text-[#c37b58]">Escríbenos directamente</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 dark:text-zinc-300 font-bold mb-1">Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tu nombre completo"
                className={`w-full px-4 py-3 rounded-xl border outline-none transition-colors ${
                  isDarkMode ? 'bg-zinc-950 border-zinc-700 text-white focus:border-[#c37b58]' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-[#92003a]'
                }`}
              />
            </div>

            <div>
              <label className="block text-slate-700 dark:text-zinc-300 font-bold mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className={`w-full px-4 py-3 rounded-xl border outline-none transition-colors ${
                  isDarkMode ? 'bg-zinc-950 border-zinc-700 text-white focus:border-[#c37b58]' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-[#92003a]'
                }`}
              />
            </div>

            <div>
              <label className="block text-slate-700 dark:text-zinc-300 font-bold mb-1">Message</label>
              <textarea
                rows={5}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="¿En qué podemos ayudarte hoy?"
                className={`w-full px-4 py-3 rounded-xl border outline-none transition-colors ${
                  isDarkMode ? 'bg-zinc-950 border-zinc-700 text-white focus:border-[#c37b58]' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-[#92003a]'
                }`}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-copper-metallic text-zinc-900 font-black text-xs uppercase tracking-widest hover:opacity-95 transition-opacity flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </button>

            {sent && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-xl bg-emerald-500/20 text-emerald-800 dark:text-emerald-400 font-bold flex items-center gap-2 text-xs"
              >
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>¡Mensaje enviado con éxito! Erika te responderá muy pronto.</span>
              </motion.div>
            )}
          </form>
        </div>

        {/* Right Column: Cambrils Map Widget & Address Info matching screenshot #13 */}
        <div className={`lg:col-span-6 p-6 md:p-8 rounded-2xl border space-y-6 ${
          isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          
          {/* Map Widget Mockup */}
          <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-slate-200 dark:border-zinc-700 shadow-inner group">
            <img
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1000&q=80"
              alt="Mapa de Cambrils"
              className="w-full h-full object-cover filter brightness-50 contrast-125 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-blue-900/20" />
            
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white space-y-1">
              <div className="p-3 rounded-full bg-[#92003a] shadow-xl animate-bounce">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <span className="font-heading font-black text-sm uppercase tracking-widest drop-shadow-md">
                Cambrils
              </span>
            </div>
          </div>

          {/* Contact details matching screenshot #13 */}
          <div className="space-y-4 text-xs text-slate-700 dark:text-zinc-300 pt-2 font-medium">
            
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#92003a] dark:text-[#c37b58] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">Ubicación de la Boutique</h4>
                <p className="text-slate-600 dark:text-zinc-400">Carrer de les Tres Llunes, 12, 43850 Cambrils, Tarragona, Spain</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-[#92003a] dark:text-[#c37b58] shrink-0" />
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">Atención Telefónica</h4>
                <p className="text-slate-600 dark:text-zinc-400">+34 977 123 456</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MessageCircle className="w-5 h-5 text-[#92003a] dark:text-[#c37b58] shrink-0" />
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">WhatsApp Asesoría</h4>
                <p className="text-slate-600 dark:text-zinc-400">+34 600 123 456</p>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* HyperUI Accordion Section: Preguntas Frecuentes (FAQ) */}
      <div className="pt-10 border-t border-slate-200 dark:border-zinc-800 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="font-heading font-black text-xl sm:text-2xl uppercase tracking-wider text-slate-900 dark:text-zinc-100">
            Preguntas Frecuentes (FAQ)
          </h2>
          <p className="text-xs text-slate-600 dark:text-zinc-400 font-medium">
            Resolvemos tus dudas sobre pedidos, recogida en Cambrils y asesoría de estilo
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          <details className="group [&_summary::-webkit-details-marker]:hidden border border-slate-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900 transition-colors shadow-xs">
            <summary className="flex cursor-pointer items-center justify-between gap-4 rounded-xl px-5 py-4 font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-zinc-100 hover:bg-slate-50 dark:hover:bg-zinc-800/50">
              <span>¿Cómo funciona la opción Click & Collect en Cambrils?</span>
              <svg
                aria-hidden="true"
                className="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180 text-[#92003a] dark:text-[#c37b58]"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-5 pb-4 pt-1 text-xs text-slate-600 dark:text-zinc-400 border-t border-slate-100 dark:border-zinc-800/40 leading-relaxed font-medium">
              Puedes seleccionar la opción "Recogida en Tienda" al realizar tu pedido. Tu paquete estará listo en nuestra boutique de Cambrils en menos de 2 horas. Te enviaremos un mensaje de confirmación por WhatsApp o email cuando puedas pasar a recogerlo.
            </div>
          </details>

          <details className="group [&_summary::-webkit-details-marker]:hidden border border-slate-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900 transition-colors shadow-xs">
            <summary className="flex cursor-pointer items-center justify-between gap-4 rounded-xl px-5 py-4 font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-zinc-100 hover:bg-slate-50 dark:hover:bg-zinc-800/50">
              <span>¿Cuáles son los plazos y costes de envío?</span>
              <svg
                aria-hidden="true"
                className="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180 text-[#92003a] dark:text-[#c37b58]"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-5 pb-4 pt-1 text-xs text-slate-600 dark:text-zinc-400 border-t border-slate-100 dark:border-zinc-800/40 leading-relaxed font-medium">
              Los envíos locales en la zona de Tarragona, Reus y Salou son gratuitos a partir de €50 y se entregan en 24 horas laborables. Para el resto de la península, la entrega estándar tarda entre 24 y 48 horas.
            </div>
          </details>

          <details className="group [&_summary::-webkit-details-marker]:hidden border border-slate-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900 transition-colors shadow-xs">
            <summary className="flex cursor-pointer items-center justify-between gap-4 rounded-xl px-5 py-4 font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-zinc-100 hover:bg-slate-50 dark:hover:bg-zinc-800/50">
              <span>¿Ofrecen servicio de asesoría de imagen y estilismo personalizado?</span>
              <svg
                aria-hidden="true"
                className="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180 text-[#92003a] dark:text-[#c37b58]"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-5 pb-4 pt-1 text-xs text-slate-600 dark:text-zinc-400 border-t border-slate-100 dark:border-zinc-800/40 leading-relaxed font-medium">
              ¡Sí! Erika realiza sesiones de asesoramiento privado para eventos especiales, bodas y renovación de vestuario. Puedes solicitar tu cita directamente por WhatsApp o rellenando el formulario de contacto de esta página.
            </div>
          </details>

          <details className="group [&_summary::-webkit-details-marker]:hidden border border-slate-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900 transition-colors shadow-xs">
            <summary className="flex cursor-pointer items-center justify-between gap-4 rounded-xl px-5 py-4 font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-zinc-100 hover:bg-slate-50 dark:hover:bg-zinc-800/50">
              <span>¿Qué política de cambios y devoluciones tienen?</span>
              <svg
                aria-hidden="true"
                className="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180 text-[#92003a] dark:text-[#c37b58]"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-5 pb-4 pt-1 text-xs text-slate-600 dark:text-zinc-400 border-t border-slate-100 dark:border-zinc-800/40 leading-relaxed font-medium">
              Aceptamos cambios y devoluciones dentro de los 14 días posteriores a la recepción del pedido, siempre que la prenda conserve sus etiquetas originales y no haya sido utilizada. Puedes gestionarlo en tienda o mediante mensajería.
            </div>
          </details>
        </div>
      </div>

    </div>
  );
};
