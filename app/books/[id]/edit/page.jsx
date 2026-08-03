'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import AuthGuard from '@/components/AuthGuard';
import BookForm from '@/components/books/BookForm';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useBooks } from '@/context/BookContext';
import toast from 'react-hot-toast';
import API from '@/utils/api';
import Link from 'next/link';

function EditBookContent() {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { updateBook } = useBooks();
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    async function fetchBook() {
      try {
        const res = await API.get(`/api/books/${params.id}`);
        setBook(res.data.book);
      } catch {
        toast.error('Book not found');
        router.push('/books');
      } finally {
        setLoading(false);
      }
    }
    fetchBook();
  }, [params.id]);

  const handleSubmit = async (data) => {
    setSubmitting(true);
    try {
      await updateBook(book._id, data);
      router.push(`/books/${book._id}`);
    } catch (error) {
      toast.error(error.message || 'Failed to update book');
    } finally {
      setSubmitting(false);
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
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <Link
          href={`/books/${book._id}`}
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Book
        </Link>
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-gray-900 dark:text-white">
          Edit Book
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Update details for &quot;{book.title}&quot;
        </p>
      </motion.div>

      <div className="glass-card p-6">
        <BookForm
          initialData={book}
          onSubmit={handleSubmit}
          onCancel={() => router.push(`/books/${book._id}`)}
          loading={submitting}
        />
      </div>
    </div>
  );
}

export default function EditBookPage() {
  return (
    <AuthGuard>
      <EditBookContent />
    </AuthGuard>
  );
}