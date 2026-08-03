'use client';

import { useState, useEffect, useCallback } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import { READING_STATUS_OPTIONS, SORT_OPTIONS } from '@/utils/constants';
import { useDebounce } from '@/hooks/useDebounce';

export default function BookFilters({ filters, onFilterChange, totalResults = 0 }) {
  const [search, setSearch] = useState(filters.search || '');
  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    onFilterChange({ search: debouncedSearch });
  }, [debouncedSearch]);

  const clearFilters = () => {
    setSearch('');
    onFilterChange({
      search: '',
      status: '',
      tags: [],
      sort: 'newest',
    });
  };

  const hasFilters = filters.search || filters.status || (filters.tags && filters.tags.length > 0);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <Input
            placeholder="Search by title or author..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={Search}
          />
        </div>
        <div className="flex gap-3">
          <Select
            value={filters.status}
            onChange={(e) => onFilterChange({ status: e.target.value })}
            options={READING_STATUS_OPTIONS}
            placeholder="All Status"
            className="min-w-[150px]"
          />
          <Select
            value={filters.sort}
            onChange={(e) => onFilterChange({ sort: e.target.value })}
            options={SORT_OPTIONS}
            className="min-w-[150px]"
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {totalResults} book{totalResults !== 1 ? 's' : ''} found
        </p>
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
          >
            <X className="w-3 h-3" />
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}