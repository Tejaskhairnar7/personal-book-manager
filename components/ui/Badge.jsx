'use client';

import { getStatusColor } from '@/utils/helpers';

export default function Badge({ status, className = '' }) {
  const colors = getStatusColor(status);

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium
        ${colors.bg} ${colors.text} ${className}
      `}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
      {status}
    </span>
  );
}