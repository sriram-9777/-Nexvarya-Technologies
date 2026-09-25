import React, { useState } from 'react';

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
  const [imgError, setImgError] = useState(false);

  const sizeMap = {
    sm: { img: 'h-8 w-auto', icon: 'w-7 h-7 text-xs', title: 'text-base', sub: 'text-[8px]' },
    md: { img: 'h-10 w-auto', icon: 'w-9 h-9 text-sm', title: 'text-xl', sub: 'text-[9px]' },
    lg: { img: 'h-12 w-auto', icon: 'w-11 h-11 text-base', title: 'text-2xl', sub: 'text-[10px]' },
    xl: { img: 'h-16 w-auto', icon: 'w-14 h-14 text-xl', title: 'text-3xl', sub: 'text-xs' }
  };

  const { img, icon, title, sub } = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-3 select-none bg-transparent group ${className}`}>
      {/* Brand Emblem */}
      <div className="relative shrink-0 flex items-center justify-center bg-transparent">
        {!imgError ? (
          <img 
            src="./nexvarya_brand_logo.png" 
            alt="Nexvarya Technologies" 
            onError={() => setImgError(true)}
            className={`${img} max-w-none object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-xs`}
          />
        ) : (
          <div className={`${icon} rounded-xl bg-gradient-to-br from-emerald-600 via-teal-700 to-emerald-800 border border-emerald-400/40 text-amber-300 font-black flex items-center justify-center shadow-md`}>
            N
          </div>
        )}
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col justify-center">
        <div className="flex items-baseline tracking-tight leading-none">
          <span className={`font-black ${title} ${
            variant === 'light' ? 'text-white' : 'text-slate-900'
          }`}>
            Nex<span className="text-[#059669]">varya</span>
          </span>
        </div>
        {showSubtitle && (
          <span className={`${sub} font-black uppercase tracking-[0.24em] mt-1 ${
            variant === 'light' ? 'text-[#f59e0b]' : 'text-[#d97706]'
          }`}>
            Technologies
          </span>
        )}
      </div>
    </div>
  );
};
