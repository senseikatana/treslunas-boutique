import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import es from './locales/es.json';
import cat from './locales/cat.json';
import en from './locales/en.json';
import fr from './locales/fr.json';
import de from './locales/de.json';

const resources = {
  es: { translation: es },
  cat: { translation: cat },
  en: { translation: en },
  fr: { translation: fr },
  de: { translation: de },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'es',
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
