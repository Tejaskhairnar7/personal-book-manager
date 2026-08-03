import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { BookProvider } from '@/context/BookContext';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  weight: ['500', '600', '700', '800'],
});

export const metadata = {
  title: 'Book Manager — Your Personal Reading Tracker',
  description: 'Track your reading journey with a beautiful, modern book manager. Organize, filter, and manage your personal book collection.',
  keywords: ['book manager', 'reading tracker', 'book collection', 'reading list'],
  authors: [{ name: 'Book Manager' }],
  openGraph: {
    title: 'Book Manager — Your Personal Reading Tracker',
    description: 'Track your reading journey with a beautiful, modern book manager.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#4c6ef5" />
      </head>
      <body className={`${inter.variable} ${plusJakarta.variable} font-sans min-h-screen`}>
        <ThemeProvider>
          <AuthProvider>
            <BookProvider>
              {children}
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 3000,
                  style: {
                    background: 'var(--toast-bg, #fff)',
                    color: 'var(--toast-color, #111)',
                    borderRadius: '12px',
                    padding: '12px 16px',
                    fontSize: '14px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  },
                  className: 'dark:!bg-gray-800 dark:!text-white',
                }}
              />
            </BookProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}