import { NextResponse } from 'next/server';

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Public paths that don't require authentication
  const publicPaths = [
    '/login',
    '/register',
    '/api/auth/register',
    '/api/auth/login',
    '/api/auth/logout',
  ];

  // Landing page is public, but logged-in users should go to dashboard
  const isLandingPage = pathname === '/';

  // Check if the current path is public
  const isPublicPath = publicPaths.some((path) => pathname === path);

  // Allow Next.js internals and static assets
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

  // If user is logged in and visits landing page, redirect to dashboard
  if (isLandingPage && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // If user is not logged in and visits a public page (like landing), let them through
  if (isLandingPage && !token) {
    return NextResponse.next();
  }

  if (!token) {
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Token exists — let the request through.
  // Full JWT verification happens in the API routes themselves.
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|manifest.json|robots.txt|sw.js|workbox-*.js|icon-*.png).*)',
  ],
};