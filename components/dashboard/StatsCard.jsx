'use client';

import { motion } from 'framer-motion';

export default function StatsCard({ icon: Icon, label, value, color, delay = 0 }) {
  const colorMap = {
    blue: 'from-blue-500 to-blue-600 shadow-blue-200 dark:shadow-blue-900/30',
    amber: 'from-amber-500 to-amber-600 shadow-amber-200 dark:shadow-amber-900/30',
    emerald: 'from-emerald-500 to-emerald-600 shadow-emerald-200 dark:shadow-emerald-900/30',
    purple: 'from-purple-500 to-purple-600 shadow-purple-200 dark:shadow-purple-900/30',
    rose: 'from-rose-500 to-rose-600 shadow-rose-200 dark:shadow-rose-900/30',
    primary: 'from-primary-500 to-primary-600 shadow-primary-200 dark:shadow-primary-900/30',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="glass-card p-6 card-hover"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{label}</p>
          <p className="text-3xl font-display font-bold text-gray-900 dark:text-white">{value}</p>
        </div>
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorMap[color]} flex items-center justify-center shadow-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </motion.div>
  );
}