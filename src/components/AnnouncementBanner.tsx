import React, { useState } from 'react';
import { PageView } from '../types';

interface AnnouncementBannerProps {
  setCurrentView: (view: PageView) => void;
  onSelectCategory?: (category: string) => void;
}

export const AnnouncementBanner: React.FC<AnnouncementBannerProps> = ({
  setCurrentView,
  onSelectCategory
}) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div
      className="relative z-50 flex items-center justify-between border-b border-zinc-200 bg-[#EAE9E6] px-4 py-2 text-[#1C1B1B] dark:border-zinc-800 dark:bg-[#141416] dark:text-zinc-200"
    >
      {/* Spacer to balance flex layout */}
      <span className="hidden sm:inline-block w-6"></span>

      <p className="text-center font-medium text-xs sm:text-sm">
        ✨ Envío Express Gratis en Cambrils & Tarragona en pedidos superiores a €50.{' '}
        <button
          onClick={() => {
            if (onSelectCategory) onSelectCategory('Todos');
            setCurrentView('collection');
          }}
          className="inline-block underline font-bold text-[#92003a] dark:text-[#c37b58] hover:opacity-80 transition-opacity ml-1"
        >
          Ver Nueva Colección
        </button>
      </p>

      <button
        type="button"
        aria-label="Descartar aviso"
        onClick={() => setDismissed(true)}
        className="rounded-full p-1 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
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
