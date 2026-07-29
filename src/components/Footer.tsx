import React from 'react';
import { PageView } from '../types';
import { TripleMoonLogo } from './TripleMoonLogo';
import { Instagram, MapPin, Phone, Mail, Clock } from 'lucide-react';

interface FooterProps {
  setCurrentView: (view: PageView) => void;
  isDarkMode?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentView }) => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 transition-colors">
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="text-teal-600 dark:text-teal-300">
            <TripleMoonLogo variant="copper" textSize="lg" />
          </div>

          <ul className="mt-8 flex justify-start gap-6 sm:mt-0 sm:justify-end">
            <li>
              <a
                href="https://instagram.com"
                rel="noreferrer"
                target="_blank"
                className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
              >
                <span className="sr-only">Instagram</span>
                <Instagram className="size-6" />
              </a>
            </li>

            <li>
              <a
                href="https://facebook.com"
                rel="noreferrer"
                target="_blank"
                className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
              >
                <span className="sr-only">Facebook</span>
                <svg className="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </li>

            <li>
              <a
                href="https://whatsapp.com"
                rel="noreferrer"
                target="_blank"
                className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
              >
                <span className="sr-only">WhatsApp</span>
                <Phone className="size-6 text-[#c37b58]" />
              </a>
            </li>

            <li>
              <a
                href="mailto:hola@3lunasboutique.es"
                className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
              >
                <span className="sr-only">Email</span>
                <Mail className="size-6" />
              </a>
            </li>
          </ul>
        </div>

        <div
          className="grid grid-cols-1 gap-8 border-t border-gray-100 pt-8 sm:grid-cols-2 lg:grid-cols-4 lg:pt-16 dark:border-gray-800"
        >
          <div>
            <p className="font-bold uppercase tracking-wider text-xs text-[#c37b58]">Colecciones</p>

            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <button onClick={() => setCurrentView('collection')} className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                  Ver Toda la Colección
                </button>
              </li>

              <li>
                <button onClick={() => setCurrentView('collection')} className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                  Vestidos de Alta Costura
                </button>
              </li>

              <li>
                <button onClick={() => setCurrentView('collection')} className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                  Tops & Blusas Exclusivas
                </button>
              </li>

              <li>
                <button onClick={() => setCurrentView('collection')} className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                  Accesorios & Bolsos
                </button>
              </li>

              <li>
                <button onClick={() => setCurrentView('collection')} className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                  Joyería Artesanal
                </button>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-bold uppercase tracking-wider text-xs text-[#c37b58]">3 Lunas Boutique</p>

            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <button onClick={() => setCurrentView('home')} className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                  Novedades & Tendencias
                </button>
              </li>

              <li>
                <button onClick={() => setCurrentView('about')} className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                  Sobre Erika & La Historia
                </button>
              </li>

              <li>
                <button onClick={() => setCurrentView('branding')} className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                  Guía de Estilo & Manual
                </button>
              </li>

              <li>
                <button onClick={() => setCurrentView('contact')} className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                  Tienda Física en Cambrils
                </button>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-bold uppercase tracking-wider text-xs text-[#c37b58]">Atención al Cliente</p>

            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <button onClick={() => setCurrentView('contact')} className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                  Contacto Directo & WhatsApp
                </button>
              </li>

              <li>
                <button onClick={() => setCurrentView('contact')} className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                  Preguntas Frecuentes (FAQ)
                </button>
              </li>

              <li>
                <button onClick={() => setCurrentView('contact')} className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                  Recogida Click & Collect 2H
                </button>
              </li>

              <li>
                <button onClick={() => setCurrentView('contact')} className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                  Asesoría de Imagen Privada
                </button>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-bold uppercase tracking-wider text-xs text-[#c37b58]">Boutique Cambrils</p>

            <div className="mt-6 space-y-3 text-xs text-gray-600 dark:text-gray-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#c37b58] shrink-0 mt-0.5" />
                <span>Carrer de les Tres Llunes, 12, 43850 Cambrils, Tarragona</span>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#c37b58] shrink-0" />
                <span>Lun - Sáb: 10:00 - 14:00 | 17:00 - 20:30</span>
              </div>

              <p className="pt-2 text-[11px] text-gray-500 dark:text-gray-400">
                Envíos 24H gratis en la zona de Cambrils, Reus y Tarragona.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 dark:text-gray-400 gap-4">
          <p>
            &copy; {new Date().getFullYear()} 3 Lunas Boutique Cambrils — Erika & Erika. Todos los derechos reservados.
          </p>

          <div className="flex items-center gap-4">
            <a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('branding'); }} className="hover:underline">Aviso Legal</a>
            <span>&middot;</span>
            <a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('branding'); }} className="hover:underline">Política de Privacidad</a>
            <span>&middot;</span>
            <a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('branding'); }} className="hover:underline">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

