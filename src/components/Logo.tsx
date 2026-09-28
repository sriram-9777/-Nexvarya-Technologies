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
    sm: { box: 'w-9 h-9', svg: 'w-8 h-8', title: 'text-base', sub: 'text-[8px]' },
    md: { box: 'w-12 h-12', svg: 'w-11 h-11', title: 'text-xl', sub: 'text-[9px]' },
    lg: { box: 'w-16 h-16', svg: 'w-15 h-15', title: 'text-2xl', sub: 'text-[10px]' },
    xl: { box: 'w-20 h-20', svg: 'w-18 h-18', title: 'text-3xl', sub: 'text-xs' }
  };

  const { box, title, sub } = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-3 select-none bg-transparent group ${className}`}>
      <img src="/nexvarya-logo.png" alt="Nexvarya Technologies" className={`${size === 'sm' ? 'w-24' : size === 'md' ? 'w-32' : size === 'lg' ? 'w-44' : 'w-56'} h-auto object-contain transition-transform duration-300 group-hover:scale-[1.02] ${variant === 'light' ? 'brightness-125 saturate-125 drop-shadow-[0_0_12px_rgba(251,191,36,0.35)]' : ''}`} />
    </div>
  );
};
