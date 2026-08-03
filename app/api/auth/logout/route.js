import { NextResponse } from 'next/server';
import { handleOptions, corsHeaders } from '@/lib/apiUtils';

export async function OPTIONS() {
  return handleOptions();
}

export async function POST() {
  const response = NextResponse.json({ message: 'Logged out successfully' });

  response.cookies.set('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  });

  return corsHeaders(response);
}