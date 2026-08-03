'use client';

import { forwardRef } from 'react';

const Textarea = forwardRef(function Textarea(
  { label, error, className = '', ...props },
  ref
) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        rows={4}
        className={`
          w-full rounded-xl border border-gray-200 dark:border-gray-700
          bg-white dark:bg-gray-800
          text-gray-900 dark:text-white
          placeholder:text-gray-400 dark:placeholder:text-gray-500
          focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500
          transition-all duration-200
          px-4 py-2.5 text-sm resize-none
          ${error ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500' : ''}
          ${className}
        `}
        {...props}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
});

export default Textarea;