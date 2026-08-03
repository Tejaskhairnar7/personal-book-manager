import { useState, useEffect } from 'react';
import API from '@/utils/api';

export function useBookStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await API.get('/api/books?limit=1000');
        const books = res.data.books;
        const total = res.data.total;

        const wantToRead = books.filter((b) => b.readingStatus === 'Want To Read').length;
        const reading = books.filter((b) => b.readingStatus === 'Reading').length;
        const completed = books.filter((b) => b.readingStatus === 'Completed').length;
        const favorites = books.filter((b) => b.isFavorite).length;

        const recentBooks = [...books]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5);

        const allTags = books.flatMap((b) => b.tags || []);
        const tagCounts = {};
        allTags.forEach((t) => {
          tagCounts[t] = (tagCounts[t] || 0) + 1;
        });
        const topTags = Object.entries(tagCounts)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 8)
          .map(([tag, count]) => ({ tag, count }));

        const monthlyData = {};
        books.forEach((b) => {
          const date = new Date(b.createdAt);
          const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
          if (!monthlyData[key]) {
            monthlyData[key] = { month: key, added: 0, completed: 0 };
          }
          monthlyData[key].added += 1;
          if (b.readingStatus === 'Completed') {
            monthlyData[key].completed += 1;
          }
        });
        const monthlyStats = Object.values(monthlyData)
          .sort((a, b) => a.month.localeCompare(b.month))
          .slice(-6);

        setStats({
          total,
          wantToRead,
          reading,
          completed,
          favorites,
          recentBooks,
          topTags,
          monthlyStats,
          statusDistribution: [
            { name: 'Want To Read', value: wantToRead, fill: '#5c7cfa' },
            { name: 'Reading', value: reading, fill: '#ff9800' },
            { name: 'Completed', value: completed, fill: '#4caf50' },
          ],
        });
      } catch {
        setStats(null);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  return { stats, loading };
}