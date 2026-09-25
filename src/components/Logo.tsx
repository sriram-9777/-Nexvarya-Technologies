import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  className?: string;
  variant?: 'light' | 'dark';
}

export const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  showSubtitle = true,
  className = '',
  variant = 'dark'
}) => {
  const sizeMap = {
    sm: { box: 'w-8 h-8', svg: 'w-5 h-5', title: 'text-base', sub: 'text-[8px]' },
    md: { box: 'w-10 h-10', svg: 'w-6 h-6', title: 'text-xl', sub: 'text-[9px]' },
    lg: { box: 'w-12 h-12', svg: 'w-7 h-7', title: 'text-2xl', sub: 'text-[10px]' },
    xl: { box: 'w-16 h-16', svg: 'w-10 h-10', title: 'text-3xl', sub: 'text-xs' }
  };

  const { box, svg, title, sub } = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-3 select-none bg-transparent group ${className}`}>
      {/* Precision Emerald & Gold Vector Emblem Box */}
      <div className={`${box} rounded-2xl bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 border border-emerald-500/40 flex items-center justify-center shadow-lg shadow-emerald-950/50 transition-transform duration-300 group-hover:scale-105 shrink-0 relative overflow-hidden`}>
        {/* Subtle Ambient Glow inside emblem */}
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 via-transparent to-amber-500/20" />
        
        {/* Crisp Geometric "N" Monogram Vector Icon */}
        <svg className={`${svg} relative z-10`} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="emeraldGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
              <stop stopColor="#10b981" />
              <stop offset="1" stopColor="#047857" />
            </linearGradient>
            <linearGradient id="goldGrad" x1="40" y1="0" x2="0" y2="40" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fbbf24" />
              <stop offset="1" stopColor="#d97706" />
            </linearGradient>
          </defs>

          {/* Left Vertical Pillar (Emerald) */}
          <path d="M8 32V8L16 16V32L8 32Z" fill="url(#emeraldGrad)" />

          {/* Diagonal Slash (Gold Accent) */}
          <path d="M16 16L24 32H32L16 8V16Z" fill="url(#goldGrad)" />

          {/* Right Vertical Pillar (Emerald) */}
          <path d="M24 8V24L32 32V8L24 8Z" fill="url(#emeraldGrad)" opacity="0.9" />
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col justify-center">
        <div className="flex items-baseline tracking-tight leading-none">
          <span className={`font-black ${title} ${
            variant === 'light' ? 'text-white' : 'text-slate-900'
          }`}>
            Nex<span className="text-emerald-500">varya</span>
          </span>
        </div>
        {showSubtitle && (
          <span className={`${sub} font-black uppercase tracking-[0.24em] mt-1 ${
            variant === 'light' ? 'text-amber-400' : 'text-amber-600'
          }`}>
            Technologies
          </span>
        )}
      </div>
    </div>
  );
};
