'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import { formatDate } from '@/utils/helpers';
import { PLACEHOLDER_COVER } from '@/utils/constants';

export default function RecentBooks({ books = [] }) {
  if (books.length === 0) {
    return (
      <div className="glass-card p-8 text-center">
        <BookOpen className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
        <p className="text-gray-500 dark:text-gray-400">No books yet. Start adding some!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {books.map((book, i) => (
        <motion.div
          key={book._id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05 }}
        >
          <Link
            href={`/books/${book._id}`}
            className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
          >
            <div className="w-12 h-16 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 flex-shrink-0">
              <img
                src={book.coverImage || PLACEHOLDER_COVER}
                alt={book.title}
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => { e.currentTarget.src = PLACEHOLDER_COVER; }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate group-hover:text-primary-600 transition-colors">
                {book.title}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{book.author}</p>
            </div>
            <div className="hidden sm:block">
              <Badge status={book.readingStatus} />
            </div>
            <span className="text-xs text-gray-400 hidden md:block">{formatDate(book.createdAt)}</span>
            <ArrowRight className="w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-primary-500 transition-colors" />
          </Link>
        </motion.div>
      ))}
    </div>
  );
}