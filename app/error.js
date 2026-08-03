'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function Error({ error, reset }) {
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
          className="w-24 h-24 mx-auto mb-8 bg-red-100 dark:bg-red-900/30 rounded-3xl flex items-center justify-center"
        >
          <AlertTriangle className="w-12 h-12 text-red-500" />
        </motion.div>

        <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-2">
          Something went wrong
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          An unexpected error occurred. Please try again.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={reset} icon={RefreshCw}>
            Try Again
          </Button>
          <Link href="/dashboard">
            <Button variant="secondary" icon={Home}>
              Go Home
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}