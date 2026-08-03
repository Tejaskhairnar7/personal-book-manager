import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Public paths that don't require authentication
  const publicPaths = [
    '/login',
    '/register',
    '/',
    '/api/auth/register',
    '/api/auth/login',
    '/api/auth/logout',
  ];

  // Check if the current path is public
  const isPublicPath = publicPaths.some((path) => pathname === path);

  // Allow Next.js internals, static files, and public assets
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon') ||
    pathname.endsWith('.ico') ||
    pathname.endsWith('.png') ||
    pathname.endsWith('.jpg') ||
    pathname.endsWith('.svg') ||
    pathname.endsWith('.json') ||
    pathname.endsWith('.txt') ||
    pathname.endsWith('.css') ||
    pathname.endsWith('.js') ||
    pathname.endsWith('.woff') ||
    pathname.endsWith('.woff2')
  ) {
    return NextResponse.next();
  }

  if (isPublicPath) {
    return NextResponse.next();
  }

  const token = request.cookies.get('token')?.value;

  if (!token) {
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.set('token', '', { maxAge: 0, path: '/' });
    return response;
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-user-id', decoded.userId);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|manifest.json|robots.txt|sw.js|workbox-*.js|icon-*.png).*)',
  ],
};