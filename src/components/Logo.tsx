import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  className?: string;
  variant?: 'light' | 'dark';
}

export const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  className = '',
  variant = 'dark'
}) => {
  return (
    <div className={`inline-flex items-center gap-3 select-none bg-transparent group ${className}`}>
      <img src="/nexvarya-logo.png" alt="Nexvarya Technologies" className={`${size === 'sm' ? 'w-24' : size === 'md' ? 'w-32' : size === 'lg' ? 'w-44' : 'w-56'} h-auto object-contain transition-transform duration-300 group-hover:scale-[1.02] ${variant === 'light' ? 'brightness-125 saturate-125 drop-shadow-[0_0_12px_rgba(251,191,36,0.35)]' : ''}`} />
    </div>
  );
};
