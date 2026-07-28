import React from 'react';

interface TripleMoonLogoProps {
  className?: string;
  variant?: 'copper' | 'dark' | 'light' | 'outline' | 'berry';
  showText?: boolean;
  textSize?: 'sm' | 'md' | 'lg' | 'xl';
  onClick?: () => void;
}

export const TripleMoonLogo: React.FC<TripleMoonLogoProps> = ({
  className = '',
  variant = 'copper',
  showText = true,
  textSize = 'md',
  onClick
}) => {
  const getGradientId = () => `copperGradient-${Math.random().toString(36).substring(2, 9)}`;
  const gradientId = React.useMemo(() => getGradientId(), []);

  // Text sizes
  const textSizeClasses = {
    sm: 'text-sm tracking-[0.2em]',
    md: 'text-base md:text-lg tracking-[0.25em]',
    lg: 'text-xl md:text-2xl tracking-[0.3em]',
    xl: 'text-3xl md:text-4xl tracking-[0.35em]',
  }[textSize];

  // Colors
  let fillColor = `url(#${gradientId})`;
  let textColor = 'text-copper-metallic';
  let strokeColor = 'none';

  if (variant === 'dark') {
    fillColor = '#1C1B1B';
    textColor = 'text-[#1C1B1B]';
  } else if (variant === 'light') {
    fillColor = '#FFFFFF';
    textColor = 'text-white';
  } else if (variant === 'berry') {
    fillColor = '#92003A';
    textColor = 'text-[#92003A]';
  } else if (variant === 'outline') {
    fillColor = 'none';
    strokeColor = '#C37B58';
    textColor = 'text-[#C37B58]';
  }

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-3 select-none ${onClick ? 'cursor-pointer hover:opacity-90 transition-opacity' : ''} ${className}`}
    >
      <svg
        viewBox="0 0 160 60"
        className="h-7 md:h-9 w-auto shrink-0 drop-shadow-sm"
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={variant === 'outline' ? '2' : '0'}
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C37B58" />
            <stop offset="35%" stopColor="#EAB393" />
            <stop offset="65%" stopColor="#D18A66" />
            <stop offset="100%" stopColor="#9E5232" />
          </linearGradient>
        </defs>

        {/* Left Crescent Moon */}
        <path d="M 42 10 A 20 20 0 0 0 42 50 A 24 24 0 0 1 42 10 Z" />

        {/* Center Full Moon with Radial/Conic accent lines */}
        <circle cx="80" cy="30" r="19" />
        {/* Subtle inner ring detail */}
        <circle cx="80" cy="30" r="14" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />

        {/* Right Crescent Moon */}
        <path d="M 118 10 A 24 24 0 0 1 118 50 A 20 20 0 0 0 118 10 Z" />

        {/* Tiny celestial stars */}
        <path
          d="M 15 30 L 17 25 L 22 23 L 17 21 L 15 16 L 13 21 L 8 23 L 13 25 Z"
          fill={variant === 'copper' ? '#EAB393' : fillColor}
          opacity="0.8"
        />
        <path
          d="M 145 30 L 147 25 L 152 23 L 147 21 L 145 16 L 143 21 L 138 23 L 143 25 Z"
          fill={variant === 'copper' ? '#EAB393' : fillColor}
          opacity="0.8"
        />
      </svg>

      {showText && (
        <div className="flex flex-col justify-center">
          <span className={`font-heading font-black uppercase text-nowrap ${textSizeClasses} ${textColor}`}>
            3 LUNAS
          </span>
          <span className="text-[9px] md:text-[10px] tracking-[0.4em] uppercase text-zinc-400 font-medium">
            BOUTIQUE CAMBRILS
          </span>
        </div>
      )}
    </div>
  );
};
