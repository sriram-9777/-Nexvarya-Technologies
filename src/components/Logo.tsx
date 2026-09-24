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
    sm: { img: 'h-8 w-auto', title: 'text-base', sub: 'text-[8px]' },
    md: { img: 'h-10 w-auto', title: 'text-xl', sub: 'text-[9px]' },
    lg: { img: 'h-12 w-auto', title: 'text-2xl', sub: 'text-[10px]' },
    xl: { img: 'h-16 w-auto', title: 'text-3xl', sub: 'text-xs' }
  };

  const { img, title, sub } = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-3 select-none bg-transparent group ${className}`}>
      {/* Exact User Uploaded Brand Emblem (Transparent Background) */}
      <div className="relative shrink-0 flex items-center justify-center bg-transparent">
        <img 
          src="/nexvarya_brand_logo.png" 
          alt="Nexvarya Technologies Emblem" 
          className={`${img} max-w-none object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-xs`}
        />
      </div>

      {/* Brand Typography matching the logo's Forest Green & Gold aesthetic */}
      <div className="flex flex-col justify-center">
        <div className="flex items-baseline tracking-tight leading-none">
          <span className={`font-black ${title} ${
            variant === 'light' ? 'text-white' : 'text-slate-900'
          }`}>
            Nex<span className="text-[#0E3E2B]">varya</span>
          </span>
        </div>
        {showSubtitle && (
          <span className={`${sub} font-black uppercase tracking-[0.24em] mt-1 ${
            variant === 'light' ? 'text-[#D4AF37]' : 'text-[#B8860B]'
          }`}>
            Technologies
          </span>
        )}
      </div>
    </div>
  );
};
