import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import { verifyToken } from '@/lib/auth';
import { handleOptions, corsHeaders } from '@/lib/apiUtils';

export async function OPTIONS() {
  return handleOptions();
}

export async function GET(request) {
  try {
    await connectDB();

    const token = request.cookies.get('token')?.value;
    if (!token) {
      return corsHeaders(NextResponse.json({ error: 'Not authenticated' }, { status: 401 }));
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return corsHeaders(NextResponse.json({ error: 'Invalid token' }, { status: 401 }));
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      return corsHeaders(NextResponse.json({ error: 'User not found' }, { status: 404 }));
    }

    return corsHeaders(NextResponse.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        bio: user.bio,
        createdAt: user.createdAt,
      },
    }));
  } catch (error) {
    console.error('Auth check error:', error);
    return corsHeaders(NextResponse.json({ error: 'Internal server error' }, { status: 500 }));
  }
}