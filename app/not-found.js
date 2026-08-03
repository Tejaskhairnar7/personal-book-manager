'use client';

import { motion } from 'framer-motion';
import { BookX, Home } from 'lucide-react';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50 dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
          className="w-24 h-24 mx-auto mb-8 bg-gray-100 dark:bg-gray-800 rounded-3xl flex items-center justify-center"
        >
          <BookX className="w-12 h-12 text-gray-400" />
        </motion.div>

        <h1 className="text-6xl font-display font-bold gradient-text mb-4">404</h1>
        <h2 className="text-xl font-display font-semibold text-gray-900 dark:text-white mb-2">
          Page not found
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <Link href="/dashboard">
          <Button icon={Home}>Go to Dashboard</Button>
        </Link>
      </motion.div>
    </div>
  );
}