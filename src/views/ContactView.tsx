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
        <h1 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl uppercase tracking-wider">
          3 Lunas Contact Page
        </h1>
        <div className="w-16 h-0.5 bg-[#c37b58] mx-auto" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Contact Form matching screenshot #13 */}
        <div className={`lg:col-span-6 p-6 md:p-8 rounded-2xl border space-y-6 ${
          isDarkMode ? 'bg-[#141416] border-zinc-800' : 'bg-white border-zinc-200'
        }`}>
          <h2 className="font-serif font-bold text-xl text-[#c37b58]">Escríbenos directamente</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-zinc-400 font-bold mb-1">Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tu nombre completo"
                className={`w-full px-4 py-3 rounded-lg border outline-none transition-colors ${
                  isDarkMode ? 'bg-zinc-900 border-zinc-700 text-white focus:border-[#c37b58]' : 'bg-zinc-50 border-zinc-300 text-zinc-900 focus:border-[#92003a]'
                }`}
              />
            </div>

            <div>
              <label className="block text-zinc-400 font-bold mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className={`w-full px-4 py-3 rounded-lg border outline-none transition-colors ${
                  isDarkMode ? 'bg-zinc-900 border-zinc-700 text-white focus:border-[#c37b58]' : 'bg-zinc-50 border-zinc-300 text-zinc-900 focus:border-[#92003a]'
                }`}
              />
            </div>

            <div>
              <label className="block text-zinc-400 font-bold mb-1">Message</label>
              <textarea
                rows={5}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="¿En qué podemos ayudarte hoy?"
                className={`w-full px-4 py-3 rounded-lg border outline-none transition-colors ${
                  isDarkMode ? 'bg-zinc-900 border-zinc-700 text-white focus:border-[#c37b58]' : 'bg-zinc-50 border-zinc-300 text-zinc-900 focus:border-[#92003a]'
                }`}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-lg bg-copper-metallic text-zinc-900 font-black text-xs uppercase tracking-widest hover:opacity-95 transition-opacity flex items-center justify-center gap-2 shadow-xl"
            >
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </button>

            {sent && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded bg-emerald-500/20 text-emerald-400 font-bold flex items-center gap-2 text-xs"
              >
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>¡Mensaje enviado con éxito! Erika te responderá muy pronto.</span>
              </motion.div>
            )}
          </form>
        </div>

        {/* Right Column: Cambrils Map Widget & Address Info matching screenshot #13 */}
        <div className={`lg:col-span-6 p-6 md:p-8 rounded-2xl border space-y-6 ${
          isDarkMode ? 'bg-[#141416] border-zinc-800' : 'bg-white border-zinc-200'
        }`}>
          
          {/* Map Widget Mockup */}
          <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-zinc-700 shadow-inner group">
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
          <div className="space-y-4 text-xs text-zinc-300 pt-2">
            
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#c37b58] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-white">Ubicación de la Boutique</h4>
                <p className="text-zinc-400">Carrer de les Tres Llunes, 12, 43850 Cambrils, Tarragona, Spain</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-[#c37b58] shrink-0" />
              <div>
                <h4 className="font-bold text-white">Atención Telefónica</h4>
                <p className="text-zinc-400">+34 977 123 456</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MessageCircle className="w-5 h-5 text-[#c37b58] shrink-0" />
              <div>
                <h4 className="font-bold text-white">WhatsApp Asesoría</h4>
                <p className="text-zinc-400">+34 600 123 456</p>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
