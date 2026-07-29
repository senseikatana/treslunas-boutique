import React, { useState } from 'react';
import { PageView } from '../types';
import { useStripeConfig } from '../hooks/useStripeQueries';
import { ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LanguageCode } from '../i18n/translations';

interface AnnouncementBannerProps {
  setCurrentView: (view: PageView) => void;
  onSelectCategory?: (category: string) => void;
  language?: LanguageCode;
}

export const AnnouncementBanner: React.FC<AnnouncementBannerProps> = ({
  setCurrentView,
  onSelectCategory,
}) => {
  const [dismissed, setDismissed] = useState(false);
  const { data: stripeConfig } = useStripeConfig();
  const { t } = useTranslation();

  if (dismissed) return null;

  return (
    <div
      className="relative z-50 flex items-center justify-between border-b border-slate-200 bg-slate-100 px-4 py-2 text-slate-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
    >
      {/* Stripe Mode Indicator */}
      <div className="hidden md:flex items-center gap-1.5 text-[10px] font-mono-label px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
        <ShieldCheck className="w-3 h-3 text-emerald-600" />
        <span>Stripe API: {stripeConfig?.mode === 'test' ? 'TESTING' : stripeConfig?.mode === 'live' ? 'PROD' : 'SANDBOX SIM'}</span>
      </div>

      <p className="text-center font-medium text-xs sm:text-sm flex-1">
        {t('freeShippingBanner', '✨ Envío Express Gratis en Cambrils & Tarragona en pedidos superiores a 50€.')}{' '}
        <button
          onClick={() => {
            if (onSelectCategory) onSelectCategory('Todos');
            setCurrentView('collection');
          }}
          className="inline-block underline font-bold text-[#92003a] dark:text-[#c37b58] hover:opacity-80 transition-opacity ml-1"
        >
          {t('exploreCollection', 'Ver Colección')}
        </button>
      </p>

      <button
        type="button"
        aria-label="Descartar aviso"
        onClick={() => setDismissed(true)}
        className="rounded-full p-1 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors ml-2"
      >
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-4"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};
