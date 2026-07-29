import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Laptop, ChevronDown, Check, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { LANGUAGES, LanguageCode } from '../i18n/translations';

interface ThemeDropdownProps {
  themeMode: 'system' | 'light' | 'dark';
  setThemeMode: (mode: 'system' | 'light' | 'dark') => void;
  isDarkMode: boolean;
  language: LanguageCode;
}

export const ThemeDropdown: React.FC<ThemeDropdownProps> = ({
  themeMode,
  setThemeMode,
  isDarkMode,
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const themeOptions = [
    {
      id: 'system' as const,
      label: t('systemTheme', 'Sistema'),
      icon: <Laptop className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />,
    },
    {
      id: 'light' as const,
      label: t('lightTheme', 'Modo Claro'),
      icon: <Sun className="w-4 h-4 text-amber-500" />,
    },
    {
      id: 'dark' as const,
      label: t('darkTheme', 'Modo Oscuro'),
      icon: <Moon className="w-4 h-4 text-purple-400" />,
    },
  ];

  const currentActiveIcon =
    themeMode === 'system' ? (
      <Laptop className="w-4 h-4 text-zinc-600 dark:text-zinc-300" />
    ) : themeMode === 'light' ? (
      <Sun className="w-4 h-4 text-amber-500" />
    ) : (
      <Moon className="w-4 h-4 text-purple-400" />
    );

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
          isDarkMode
            ? 'bg-zinc-900/80 hover:bg-zinc-800 border-zinc-800 text-zinc-200'
            : 'bg-white hover:bg-zinc-100 border-zinc-200 text-zinc-800 shadow-sm'
        }`}
        aria-label="Seleccionar tema visual"
      >
        <span className="flex items-center justify-center">{currentActiveIcon}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 transition-transform duration-200 ${open ? 'rotate-180 text-[#c37b58]' : ''}`} />
      </button>

      {/* Popover Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.96 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute right-0 mt-2 w-48 z-50 origin-top-right"
          >
            <div
              className={`rounded-2xl shadow-2xl border p-2 backdrop-blur-xl ${
                isDarkMode
                  ? 'bg-[#121214]/95 border-zinc-800 text-zinc-100 shadow-black/70'
                  : 'bg-white/95 border-zinc-200 text-zinc-900 shadow-xl'
              }`}
            >
              <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-zinc-400 border-b border-zinc-200 dark:border-zinc-800/80 mb-1 flex items-center justify-between">
                <span>{t('theme', 'Tema')}</span>
              </div>

              <div className="space-y-0.5">
                {themeOptions.map((opt) => {
                  const isActive = themeMode === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        setThemeMode(opt.id);
                        setOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center justify-between group ${
                        isActive
                          ? isDarkMode
                            ? 'bg-[#92003a]/20 text-[#c37b58] font-bold'
                            : 'bg-rose-50 text-[#92003a] font-bold'
                          : 'hover:bg-zinc-500/10 text-zinc-700 dark:text-zinc-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="p-1 rounded-lg bg-zinc-100 dark:bg-zinc-800/80">
                          {opt.icon}
                        </span>
                        <span>{opt.label}</span>
                      </div>
                      {isActive && <Check className="w-3.5 h-3.5 text-[#92003a] dark:text-[#c37b58]" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface LanguageDropdownProps {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  isDarkMode: boolean;
}

export const LanguageDropdown: React.FC<LanguageDropdownProps> = ({
  language,
  setLanguage,
  isDarkMode,
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { i18n } = useTranslation();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLangObj = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
          isDarkMode
            ? 'bg-zinc-900/80 hover:bg-zinc-800 border-zinc-800 text-zinc-200'
            : 'bg-white hover:bg-zinc-100 border-zinc-200 text-zinc-800 shadow-sm'
        }`}
        aria-label="Seleccionar idioma"
      >
        <span className="text-base leading-none select-none">{currentLangObj.flag}</span>
        <span className="font-mono text-[11px] font-bold">{currentLangObj.shortCode}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 transition-transform duration-200 ${open ? 'rotate-180 text-[#c37b58]' : ''}`} />
      </button>

      {/* Popover Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.96 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute right-0 mt-2 w-52 z-50 origin-top-right"
          >
            <div
              className={`rounded-2xl shadow-2xl border p-2 backdrop-blur-xl ${
                isDarkMode
                  ? 'bg-[#121214]/95 border-zinc-800 text-zinc-100 shadow-black/70'
                  : 'bg-white/95 border-zinc-200 text-zinc-900 shadow-xl'
              }`}
            >
              <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-zinc-400 border-b border-zinc-200 dark:border-zinc-800/80 mb-1 flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <Globe className="w-3 h-3 text-[#c37b58]" />
                  Idioma / Language
                </span>
              </div>

              <div className="space-y-0.5">
                {LANGUAGES.map((lang) => {
                  const isActive = language === lang.code;
                  return (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => {
                        setLanguage(lang.code);
                        i18n.changeLanguage(lang.code);
                        setOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center justify-between group ${
                        isActive
                          ? isDarkMode
                            ? 'bg-[#92003a]/20 text-[#c37b58] font-bold'
                            : 'bg-rose-50 text-[#92003a] font-bold'
                          : 'hover:bg-zinc-500/10 text-zinc-700 dark:text-zinc-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-base leading-none select-none">{lang.flag}</span>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-[11px] font-mono px-1 py-0.5 rounded bg-zinc-200/60 dark:bg-zinc-800/80">
                            {lang.shortCode}
                          </span>
                          <span>{lang.nativeName}</span>
                        </div>
                      </div>
                      {isActive && <Check className="w-3.5 h-3.5 text-[#92003a] dark:text-[#c37b58]" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
