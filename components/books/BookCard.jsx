'use client';

import { motion } from 'framer-motion';
import { BookOpen, Heart, MoreVertical } from 'lucide-react';
import Link from 'next/link';
import Badge from '@/components/ui/Badge';
import { PLACEHOLDER_COVER } from '@/utils/constants';
import { truncate } from '@/utils/helpers';

export default function BookCard({ book, index = 0, onFavorite }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.3 }}
    >
      <Link href={`/books/${book._id}`}>
        <div className="glass-card overflow-hidden group card-hover">
          {/* Cover Image */}
          <div className="relative h-56 bg-gray-100 dark:bg-gray-700 overflow-hidden">
            {book.coverImage ? (
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <BookOpen className="w-16 h-16 text-gray-300 dark:text-gray-600" />
              </div>
            )}

            {/* Favorite button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onFavorite?.(book._id, book.isFavorite);
              }}
              className="absolute top-3 right-3 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700 transition-colors shadow-sm"
            >
              <Heart
                className={`w-4 h-4 ${
                  book.isFavorite
                    ? 'fill-red-500 text-red-500'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              />
            </button>

            {/* Reading status badge */}
            <div className="absolute bottom-3 left-3">
              <Badge status={book.readingStatus} />
            </div>
          </div>

          {/* Card Content */}
          <div className="p-4">
            <h3 className="font-display font-semibold text-gray-900 dark:text-white line-clamp-1 group-hover:text-primary-600 transition-colors">
              {book.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{book.author}</p>

            {book.description && (
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 line-clamp-2">
                {truncate(book.description, 80)}
              </p>
            )}

            {/* Tags */}
            {book.tags && book.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {book.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-md text-xs"
                  >
                    {tag}
                  </span>
                ))}
                {book.tags.length > 3 && (
                  <span className="px-2 py-0.5 text-gray-400 text-xs">
                    +{book.tags.length - 3}
                  </span>
                )}
              </div>
            )}

            {/* Reading Progress */}
            {book.readingStatus === 'Reading' && book.readingProgress > 0 && (
              <div className="mt-3">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Progress</span>
                  <span>{book.readingProgress}%</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5">
                  <div
                    className="bg-gradient-to-r from-amber-500 to-amber-600 h-1.5 rounded-full transition-all"
                    style={{ width: `${book.readingProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}