export const READING_STATUS = {
  WANT_TO_READ: 'Want To Read',
  READING: 'Reading',
  COMPLETED: 'Completed',
};

export const READING_STATUS_OPTIONS = [
  { value: 'Want To Read', label: 'Want To Read', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' },
  { value: 'Reading', label: 'Reading', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' },
  { value: 'Completed', label: 'Completed', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' },
];

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'title_asc', label: 'Title (A-Z)' },
  { value: 'title_desc', label: 'Title (Z-A)' },
  { value: 'author_asc', label: 'Author (A-Z)' },
];

export const BOOKS_PER_PAGE = 12;

export const PLACEHOLDER_COVER = '/images/book-placeholder.svg';

export const CHART_COLORS = [
  '#5c7cfa',
  '#ff9800',
  '#4caf50',
  '#e91e63',
  '#9c27b0',
  '#00bcd4',
];