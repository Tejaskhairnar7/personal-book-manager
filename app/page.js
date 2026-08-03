'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  BookOpen, Library, BarChart3, Moon, Sun, Monitor,
  ArrowRight, CheckCircle2, Star, Shield, Sparkles,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';

const features = [
  {
    icon: Library,
    title: 'Organize Your Library',
    description: 'Add books with details like title, author, description, cover images, and custom tags.',
  },
  {
    icon: BarChart3,
    title: 'Track Reading Progress',
    description: 'Set reading statuses — Want to Read, Reading, or Completed — and track your progress.',
  },
  {
    icon: Star,
    title: 'Favorite & Filter',
    description: 'Mark your favorite books, search instantly, filter by status or tags, and sort your collection.',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Your data stays yours. JWT authentication, hashed passwords, and per-user book collections.',
  },
];

const stats = [
  { value: '3', label: 'Reading Statuses' },
  { value: '∞', label: 'Books to Track' },
  { value: '1', label: 'Beautiful Dashboard' },
  { value: '100%', label: 'Free & Open Source' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

export default function Home() {
  const { isAuthenticated, loading } = useAuth();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.replace('/dashboard');
    }
  }, [isAuthenticated, loading, router]);

  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  if (loading) return null;
  if (isAuthenticated) return null;

  const ThemeIcon = resolvedTheme === 'dark' ? Moon : Sun;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 gradient-bg rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-display font-bold gradient-text">BookManager</span>
            </Link>

            <div className="flex items-center gap-3">
              <button
                onClick={cycleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                title="Toggle theme"
              >
                <ThemeIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-xl transition-colors shadow-sm"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent-400/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                Your Personal Reading Companion
              </span>
            </motion.div>

            <motion.h1
              initial="hidden"
              animate="visible"
              custom={0.1}
              variants={fadeUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-gray-900 dark:text-white leading-tight"
            >
              Track every book
              <span className="gradient-text"> you&apos;ve ever read</span>
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="visible"
              custom={0.2}
              variants={fadeUp}
              className="mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed"
            >
              A beautiful, modern book manager to organize your reading journey.
              Add books, track progress, discover insights — all in one place.
            </motion.p>

            <motion.div
              initial="hidden"
              animate="visible"
              custom={0.3}
              variants={fadeUp}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="/register"
                className="group inline-flex items-center gap-2 px-8 py-3.5 text-base font-semibold text-white gradient-bg rounded-xl shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all hover:scale-[1.02]"
              >
                Start for Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 px-8 py-3.5 text-base font-semibold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-750 transition-all"
              >
                Sign In
              </Link>
            </motion.div>

            {/* Mini dashboard preview */}
            <motion.div
              initial="hidden"
              animate="visible"
              custom={0.5}
              variants={fadeUp}
              className="mt-16 relative"
            >
              <div className="glass-card p-1 rounded-2xl shadow-2xl shadow-gray-200/50 dark:shadow-gray-900/50">
                <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden">
                  {/* Mock top bar */}
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                    <div className="flex-1 mx-8">
                      <div className="h-5 bg-gray-100 dark:bg-gray-700 rounded-md max-w-xs mx-auto" />
                    </div>
                  </div>
                  {/* Mock dashboard content */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 gradient-bg rounded-xl" />
                      <div className="flex-1">
                        <div className="h-4 bg-gray-100 dark:bg-gray-700 rounded-md w-32" />
                        <div className="h-3 bg-gray-50 dark:bg-gray-800 rounded-md w-48 mt-2" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                      {[
                        { color: 'bg-primary-500', label: 'Total' },
                        { color: 'bg-blue-500', label: 'Want to Read' },
                        { color: 'bg-amber-500', label: 'Reading' },
                        { color: 'bg-emerald-500', label: 'Completed' },
                      ].map((card) => (
                        <div key={card.label} className="bg-gray-50 dark:bg-gray-750 rounded-xl p-4">
                          <div className={`w-8 h-8 ${card.color} rounded-lg mb-3`} />
                          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-md w-8 mb-1" />
                          <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded-md w-20" />
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gray-50 dark:bg-gray-750 rounded-xl p-4 h-32" />
                      <div className="bg-gray-50 dark:bg-gray-750 rounded-xl p-4 h-32" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 sm:py-28 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl font-display font-bold text-gray-900 dark:text-white"
            >
              Everything you need to manage your books
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={0.1}
              className="mt-4 text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
            >
              A thoughtfully designed app that makes tracking your reading a joy, not a chore.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i * 0.1}
                variants={fadeUp}
                className="glass-card p-6 card-hover group"
              >
                <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-primary-200 dark:shadow-primary-900/30 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-display font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 sm:py-28 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl font-display font-bold text-gray-900 dark:text-white"
            >
              Get started in seconds
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: '1',
                title: 'Create an Account',
                description: 'Sign up for free in seconds. No credit card required.',
              },
              {
                step: '2',
                title: 'Add Your Books',
                description: 'Add books with details, covers, tags, and set your reading status.',
              },
              {
                step: '3',
                title: 'Track & Discover',
                description: 'View your stats, track progress, and manage your entire library.',
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i * 0.15}
                variants={fadeUp}
                className="text-center"
              >
                <div className="w-14 h-14 mx-auto gradient-bg rounded-2xl flex items-center justify-center text-white text-xl font-display font-bold shadow-lg shadow-primary-200 dark:shadow-primary-900/30 mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-display font-semibold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 gradient-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i * 0.1}
                variants={fadeUp}
                className="text-center"
              >
                <div className="text-3xl sm:text-4xl font-display font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-white/70 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-28 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl font-display font-bold text-gray-900 dark:text-white"
            >
              Ready to start your reading journey?
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={0.1}
              className="mt-4 text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto"
            >
              Join thousands of readers who organize and track their books with BookManager.
            </motion.p>
            <motion.div
              variants={fadeUp}
              custom={0.2}
              className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="/register"
                className="group inline-flex items-center gap-2 px-8 py-3.5 text-base font-semibold text-white gradient-bg rounded-xl shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all hover:scale-[1.02]"
              >
                Create Free Account
                <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 px-8 py-3.5 text-base font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                Already have an account? Sign In
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 gradient-bg rounded-lg flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-bold text-gray-900 dark:text-white">BookManager</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} BookManager. Built with ❤️
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}