'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import AuthGuard from '@/components/AuthGuard';
import BookForm from '@/components/books/BookForm';
import { useBooks } from '@/context/BookContext';
import toast from 'react-hot-toast';
import Link from 'next/link';

function NewBookContent() {
  const [loading, setLoading] = useState(false);
  const { createBook } = useBooks();
  const router = useRouter();

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      await createBook(data);
      router.push('/books');
    } catch (error) {
      toast.error(error.message || 'Failed to create book');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <Link
          href="/books"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Books
        </Link>
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-gray-900 dark:text-white">
          Add New Book
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Add a new book to your collection
        </p>
      </motion.div>

      <div className="glass-card p-6">
        <BookForm onSubmit={handleSubmit} loading={loading} />
      </div>
    </div>
  );
}

export default function NewBookPage() {
  return (
    <AuthGuard>
      <NewBookContent />
    </AuthGuard>
  );
}