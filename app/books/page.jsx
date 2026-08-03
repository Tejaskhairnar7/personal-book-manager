'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Plus, LayoutGrid, List } from 'lucide-react';
import AuthGuard from '@/components/AuthGuard';
import { useBooks } from '@/context/BookContext';
import BookCard from '@/components/books/BookCard';
import BookFilters from '@/components/books/BookFilters';
import EmptyState from '@/components/ui/EmptyState';
import { BookCardSkeleton } from '@/components/ui/Skeleton';
import Pagination from '@/components/ui/Pagination';
import Button from '@/components/ui/Button';
import { PLACEHOLDER_COVER } from '@/utils/constants';
import Link from 'next/link';
import toast from 'react-hot-toast';

function BooksContent() {
  const { books, totalBooks, loading, filters, fetchBooks, updateFilters, setPage, toggleFavorite } = useBooks();
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    fetchBooks();
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    updateFilters(newFilters);
  };

  const handleFavorite = async (id, isFavorite) => {
    try {
      await toggleFavorite(id, isFavorite);
      toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites');
      fetchBooks();
    } catch {
      toast.error('Failed to update favorite');
    }
  };

  const totalPages = Math.ceil(totalBooks / 12);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-gray-900 dark:text-white">
            My Books
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage your personal collection
          </p>
        </div>
        <Link href="/books/new">
          <Button icon={Plus}>Add Book</Button>
        </Link>
      </motion.div>

      {/* Filters */}
      <BookFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        totalResults={totalBooks}
      />

      {/* View Toggle & Books */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {[...Array(8)].map((_, i) => (
            <BookCardSkeleton key={i} />
          ))}
        </div>
      ) : books.length === 0 ? (
        <EmptyState
          title="No books found"
          description={
            filters.search || filters.status
              ? 'Try adjusting your search or filters.'
              : 'Start building your collection by adding your first book.'
          }
          action={
            <Link href="/books/new">
              <Button icon={Plus}>Add Your First Book</Button>
            </Link>
          }
        />
      ) : (
        <>
          <div className="flex justify-end">
            <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-gray-700 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list'
                    ? 'bg-white dark:bg-gray-700 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {books.map((book, i) => (
                <BookCard
                  key={book._id}
                  book={book}
                  index={i}
                  onFavorite={handleFavorite}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {books.map((book, i) => (
                <motion.div
                  key={book._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.02 }}
                >
                  <Link href={`/books/${book._id}`}>
                    <div className="glass-card p-4 hover:shadow-md transition-all flex items-center gap-4">
                      <div className="w-12 h-16 rounded-lg bg-gray-100 dark:bg-gray-700 overflow-hidden flex-shrink-0">
                        <img
                          src={book.coverImage || PLACEHOLDER_COVER}
                          alt={book.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          onError={(e) => { e.currentTarget.src = PLACEHOLDER_COVER; }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 dark:text-white truncate">{book.title}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{book.author}</p>
                      </div>
                      <span className="hidden sm:block text-sm text-gray-400">{book.readingStatus}</span>
                      {book.isFavorite && <span className="text-red-500">❤️</span>}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          <Pagination
            currentPage={filters.page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
}

export default function BooksPage() {
  return (
    <AuthGuard>
      <BooksContent />
    </AuthGuard>
  );
}