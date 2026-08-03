'use client';

import { forwardRef } from 'react';
import LoadingSpinner from './LoadingSpinner';

const variants = {
  primary: 'bg-primary-600 hover:bg-primary-700 text-white shadow-sm shadow-primary-200 dark:shadow-primary-900/30',
  secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300',
  danger: 'bg-red-500 hover:bg-red-600 text-white shadow-sm shadow-red-200 dark:shadow-red-900/30',
  ghost: 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300',
  outline: 'border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

const Button = forwardRef(function Button(
  { children, variant = 'primary', size = 'md', loading = false, icon: Icon, className = '', disabled, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center gap-2 font-medium rounded-xl
        transition-all duration-200 ease-out
        disabled:opacity-50 disabled:cursor-not-allowed
        active:scale-[0.98]
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <LoadingSpinner size="sm" className="w-4 h-4 border-2" />
      ) : Icon ? (
        <Icon className="w-4 h-4" />
      ) : null}
      {children}
    </button>
  );
});

export default Button;