import React from 'react';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

export default function Card({ children, className, hoverEffect = false, ...props }) {
  return (
    <div
      className={twMerge(
        clsx(
          'relative rounded-2xl p-6 md:p-8',
          'bg-[#1a1c23]/60 backdrop-blur-xl border border-white/10',
          'shadow-[0_8px_30px_rgb(0,0,0,0.12)]',
          'overflow-hidden',
          hoverEffect && 'transition-all duration-300 hover:border-white/20 hover:shadow-[0_8px_30px_rgba(79,70,229,0.15)] hover:-translate-y-1',
          className
        )
      )}
      {...props}
    >
      {/* Top subtle highlight simulating light reflection */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      
      {/* Content wrapper to ensure z-index above absolute decorations if added */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}
