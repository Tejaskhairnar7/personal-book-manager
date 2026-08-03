'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Bookmark, CheckCircle2, Clock, Plus, TrendingUp, Heart } from 'lucide-react';
import AuthGuard from '@/components/AuthGuard';
import { useAuth } from '@/context/AuthContext';
import { useBooks } from '@/context/BookContext';
import { useBookStats } from '@/hooks/useBookStats';
import StatsCard from '@/components/dashboard/StatsCard';
import RecentBooks from '@/components/dashboard/RecentBooks';
import { StatusPieChart, MonthlyBarChart } from '@/components/dashboard/Charts';
import { DashboardSkeleton } from '@/components/ui/Skeleton';
import Button from '@/components/ui/Button';
import Link from 'next/link';

function DashboardContent() {
  const { user } = useAuth();
  const { fetchBooks, filters } = useBooks();
  const { stats, loading } = useBookStats();

  useEffect(() => {
    fetchBooks({ ...filters, limit: 1000 });
  }, []);

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (!stats) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500">Unable to load dashboard data.</p>
      </div>
    );
  }

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-gray-900 dark:text-white">
            {greeting()}, {user?.name?.split(' ')[0]} 👋
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Here&apos;s an overview of your reading journey
          </p>
        </div>
        <Link href="/books/new">
          <Button icon={Plus} size="lg">
            Add Book
          </Button>
        </Link>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard icon={BookOpen} label="Total Books" value={stats.total} color="primary" delay={0} />
        <StatsCard icon={Bookmark} label="Want To Read" value={stats.wantToRead} color="blue" delay={0.05} />
        <StatsCard icon={Clock} label="Currently Reading" value={stats.reading} color="amber" delay={0.1} />
        <StatsCard icon={CheckCircle2} label="Completed" value={stats.completed} color="emerald" delay={0.15} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-display font-semibold text-gray-900 dark:text-white">
              Reading Status
            </h2>
            <TrendingUp className="w-5 h-5 text-gray-400" />
          </div>
          <StatusPieChart data={stats.statusDistribution} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-display font-semibold text-gray-900 dark:text-white">
              Monthly Activity
            </h2>
            <TrendingUp className="w-5 h-5 text-gray-400" />
          </div>
          <MonthlyBarChart data={stats.monthlyStats} />
        </motion.div>
      </div>

      {/* Recent Books & Top Tags */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="lg:col-span-2 glass-card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-display font-semibold text-gray-900 dark:text-white">
              Recently Added
            </h2>
            <Link href="/books" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
              View all
            </Link>
          </div>
          <RecentBooks books={stats.recentBooks} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-display font-semibold text-gray-900 dark:text-white">
              Top Tags
            </h2>
            <Heart className="w-5 h-5 text-gray-400" />
          </div>
          {stats.topTags.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {stats.topTags.map(({ tag, count }) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-lg text-sm font-medium"
                >
                  {tag} ({count})
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center py-8">No tags yet</p>
          )}

          <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-500 dark:text-gray-400">Favorites</span>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">{stats.favorites}</span>
            </div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-500 dark:text-gray-400">Completion Rate</span>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {stats.total > 0
                  ? Math.round((stats.completed / stats.total) * 100)
                  : 0}
                %
              </span>
            </div>
            <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2 mt-2">
              <div
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2 rounded-full transition-all duration-500"
                style={{
                  width: `${stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}%`,
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <AuthGuard>
      <DashboardContent />
    </AuthGuard>
  );
}