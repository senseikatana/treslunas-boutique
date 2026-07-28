import React, { useState } from 'react';
import { PageView } from '../types';
import { TripleMoonLogo } from './TripleMoonLogo';
import { Instagram, MapPin, Phone, Mail, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  setCurrentView: (view: PageView) => void;
  isDarkMode: boolean;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentView, isDarkMode }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className={`border-t transition-colors ${
      isDarkMode ? 'bg-[#0a0a0b] border-zinc-800 text-zinc-300' : 'bg-[#f4f1ee] border-zinc-200 text-zinc-700'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <TripleMoonLogo variant={isDarkMode ? 'copper' : 'dark'} textSize="lg" />
            <p className="text-xs leading-relaxed text-zinc-400 max-w-sm">
              Nacida en el corazón de Cambrils, 3 Lunas Boutique es un santuario de moda, accesorios y joyería celestial curados con pasión por Erika.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-zinc-800/20 hover:bg-[#92003a] hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <span className="text-xs text-zinc-400 font-medium">@3lunasboutique</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold tracking-widest uppercase text-[#c37b58]">Navegación</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button onClick={() => setCurrentView('home')} className="hover:text-[#c37b58] transition-colors">
                  Inicio / Novedades
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('collection')} className="hover:text-[#c37b58] transition-colors">
                  Colección Vestidos
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('about')} className="hover:text-[#c37b58] transition-colors">
                  La Historia de Erika
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('branding')} className="hover:text-[#c37b58] transition-colors">
                  Guía de Estilo & Branding
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('contact')} className="hover:text-[#c37b58] transition-colors">
                  Contacto & Ubicación
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Tienda Física Cambrils */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold tracking-widest uppercase text-[#c37b58]">Tienda Física</h4>
            <div className="space-y-2.5 text-xs text-zinc-400">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-[#c37b58] shrink-0 mt-0.5" />
                <span>Carrer de les Tres Llunes, 12, 43850 Cambrils, Tarragona, España</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-[#c37b58] shrink-0" />
                <span>+34 977 123 456 / WhatsApp +34 600 123 456</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-[#c37b58] shrink-0" />
                <span>Lunes a Sábado: 10:00 - 14:00 | 17:00 - 20:30</span>
              </div>
            </div>
          </div>

          {/* Col 4: Newsletter */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold tracking-widest uppercase text-[#c37b58]">Únete al Club 3 Lunas</h4>
            <p className="text-xs text-zinc-400">
              Recibe invitaciones exclusivas a nuevas colecciones y asesoría personalizada de Erika.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Tu correo electrónico..."
                  required
                  className={`w-full px-3 py-2.5 text-xs rounded-md border focus:outline-none focus:ring-1 focus:ring-[#92003a] pr-10 ${
                    isDarkMode 
                      ? 'bg-zinc-900 border-zinc-700 text-white placeholder-zinc-500' 
                      : 'bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400'
                  }`}
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-3 bg-[#92003a] hover:bg-[#b21b50] text-white rounded flex items-center justify-center transition-colors"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>

            {subscribed && (
              <div className="flex items-center space-x-1.5 text-xs text-emerald-500 font-medium pt-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>¡Gracias! Te has unido con éxito.</span>
              </div>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-zinc-800/30 flex flex-col md:flex-row items-center justify-between text-[11px] text-zinc-500 gap-4">
          <p>© {new Date().getFullYear()} 3 Lunas Boutique Cambrils. Todos los derechos reservados.</p>
          <div className="flex items-center space-x-6">
            <button onClick={() => setCurrentView('branding')} className="hover:underline">
              Diseño & Branding System
            </button>
            <span className="text-zinc-700">|</span>
            <span>Aviso Legal</span>
            <span className="text-zinc-700">|</span>
            <span>Política de Privacidad</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
