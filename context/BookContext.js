'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import API from '@/utils/api';
import toast from 'react-hot-toast';
import { BOOKS_PER_PAGE } from '@/utils/constants';
import { buildQueryString } from '@/utils/helpers';

const BookContext = createContext(null);

export function BookProvider({ children }) {
  const [books, setBooks] = useState([]);
  const [totalBooks, setTotalBooks] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    tags: [],
    sort: 'newest',
    page: 1,
  });

  const fetchBooks = useCallback(async (newFilters = filters) => {
    setLoading(true);
    try {
      const params = {};
      if (newFilters.search) params.search = newFilters.search;
      if (newFilters.status) params.status = newFilters.status;
      if (newFilters.tags && newFilters.tags.length > 0) params.tags = newFilters.tags.join(',');
      if (newFilters.sort) params.sort = newFilters.sort;
      params.page = newFilters.page || 1;
      params.limit = BOOKS_PER_PAGE;

      const qs = buildQueryString(params);
      const res = await API.get(`/api/books${qs}`);
      setBooks(res.data.books);
      setTotalBooks(res.data.total);
      return res.data;
    } catch (error) {
      toast.error(error.message || 'Failed to fetch books');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const createBook = async (bookData) => {
    const res = await API.post('/api/books', bookData);
    toast.success('Book added successfully!');
    return res.data;
  };

  const updateBook = async (id, bookData) => {
    const res = await API.put(`/api/books/${id}`, bookData);
    toast.success('Book updated!');
    return res.data;
  };

  const deleteBook = async (id) => {
    await API.delete(`/api/books/${id}`);
    toast.success('Book deleted');
  };

  const toggleFavorite = async (id, isFavorite) => {
    const res = await API.put(`/api/books/${id}`, { isFavorite: !isFavorite });
    return res.data;
  };

  const updateFilters = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }));
  };

  const setPage = (page) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  return (
    <BookContext.Provider
      value={{
        books,
        totalBooks,
        loading,
        filters,
        fetchBooks,
        createBook,
        updateBook,
        deleteBook,
        toggleFavorite,
        updateFilters,
        setPage,
      }}
    >
      {children}
    </BookContext.Provider>
  );
}

export function useBooks() {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks must be used within a BookProvider');
  }
  return context;
}