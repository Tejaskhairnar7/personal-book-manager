'use client';

import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

export default function EmptyState({ icon: Icon = BookOpen, title, description, action }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mb-6">
        <Icon className="w-10 h-10 text-gray-400 dark:text-gray-500" />
      </div>
      <h3 className="text-xl font-display font-semibold text-gray-900 dark:text-white mb-2">
        {title || 'Nothing here yet'}
      </h3>
      <p className="text-gray-500 dark:text-gray-400 max-w-md mb-6">
        {description || 'Get started by adding your first item.'}
      </p>
      {action && (
        <div>{action}</div>
      )}
    </motion.div>
  );
}