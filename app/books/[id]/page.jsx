'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Edit3, Trash2, Heart, Calendar, Tag } from 'lucide-react';
import AuthGuard from '@/components/AuthGuard';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useBooks } from '@/context/BookContext';
import { formatDate } from '@/utils/helpers';
import { PLACEHOLDER_COVER } from '@/utils/constants';
import toast from 'react-hot-toast';
import API from '@/utils/api';
import Link from 'next/link';

function BookDetailContent() {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDelete, setShowDelete] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const { deleteBook } = useBooks();
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    async function fetchBook() {
      try {
        const res = await API.get(`/api/books/${params.id}`);
        setBook(res.data.book);
        setIsFav(res.data.book.isFavorite);
      } catch {
        toast.error('Book not found');
        router.push('/books');
      } finally {
        setLoading(false);
      }
    }
    fetchBook();
  }, [params.id]);

  const handleDelete = async () => {
    try {
      await deleteBook(book._id);
      router.push('/books');
    } catch {
      toast.error('Failed to delete book');
    }
  };

  const handleFavorite = async () => {
    try {
      const res = await API.put(`/api/books/${book._id}`, { isFavorite: !isFav });
      setIsFav(!isFav);
      setBook(res.data.book);
      toast.success(!isFav ? 'Added to favorites' : 'Removed from favorites');
    } catch {
      toast.error('Failed to update favorite');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!book) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {/* Back button */}
        <Link
          href="/books"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Books
        </Link>

        <div className="glass-card overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Cover */}
            <div className="w-full md:w-72 lg:w-80 flex-shrink-0">
              <div className="aspect-[2/3] md:aspect-auto md:h-full bg-gray-100 dark:bg-gray-700 relative">
                <img
                  src={book.coverImage || PLACEHOLDER_COVER}
                  alt={book.title}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.src = PLACEHOLDER_COVER; }}
                />

                {/* Favorite overlay */}
                <button
                  onClick={handleFavorite}
                  className="absolute top-4 right-4 p-3 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg hover:scale-110 transition-transform"
                >
                  <Heart
                    className={`w-6 h-6 ${
                      isFav ? 'fill-red-500 text-red-500' : 'text-gray-400'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0 p-6 md:p-8">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-display font-bold text-gray-900 dark:text-white">
                    {book.title}
                  </h1>
                  <p className="text-lg text-gray-500 dark:text-gray-400 mt-1">by {book.author}</p>
                </div>
                <Badge status={book.readingStatus} />
              </div>

              {book.description && (
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-4 mb-6">
                  {book.description}
                </p>
              )}

              {/* Reading Progress */}
              {book.readingStatus === 'Reading' && (
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-500 dark:text-gray-400">Reading Progress</span>
                    <span className="font-medium text-gray-900 dark:text-white">{book.readingProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-amber-500 to-amber-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${book.readingProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Tags */}
              {book.tags && book.tags.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap mb-6">
                  <Tag className="w-4 h-4 text-gray-400" />
                  {book.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Meta Info */}
              <div className="flex items-center gap-4 text-sm text-gray-400 mb-8">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  Added {formatDate(book.createdAt)}
                </span>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3 pt-6 border-t border-gray-100 dark:border-gray-700">
                <Link href={`/books/${book._id}/edit`}>
                  <Button variant="primary" icon={Edit3}>
                    Edit Book
                  </Button>
                </Link>
                <Button variant="danger" icon={Trash2} onClick={() => setShowDelete(true)}>
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <ConfirmDialog
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDelete}
        title="Delete Book"
        message={`Are you sure you want to delete "${book.title}"? This action cannot be undone.`}
      />
    </div>
  );
}

export default function BookDetailPage() {
  return (
    <AuthGuard>
      <BookDetailContent />
    </AuthGuard>
  );
}