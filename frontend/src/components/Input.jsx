import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

export const Input = forwardRef(({ className, label, error, ...props }, ref) => {
  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium text-gray-300 ml-1">{label}</label>}
      <div className="relative">
        <input
          ref={ref}
          className={twMerge(
            clsx(
              'w-full px-4 py-3 rounded-xl',
              'bg-white/5 border border-white/10 backdrop-blur-md',
              'text-white placeholder:text-gray-500',
              'transition-all duration-300 ease-in-out',
              'focus:outline-none focus:border-indigo-500/50 focus:bg-white/10 focus:ring-2 focus:ring-indigo-500/20',
              'shadow-inner',
              error && 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20',
              className
            )
          )}
          {...props}
        />
        {/* Subtle glow behind input when focused */}
        <div className="absolute inset-0 -z-10 rounded-xl bg-indigo-500/0 blur-md transition-colors peer-focus:bg-indigo-500/10"></div>
      </div>
      {error && <span className="text-sm text-red-400 ml-1 mt-0.5">{error}</span>}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
