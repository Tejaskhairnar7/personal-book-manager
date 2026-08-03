import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import { validateRegister, sanitizeInput } from '@/lib/validate';
import { signToken } from '@/lib/auth';
import { handleOptions, corsHeaders } from '@/lib/apiUtils';

export async function OPTIONS() {
  return handleOptions();
}

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const data = sanitizeInput(body);

    const errors = validateRegister(data);
    if (errors.length > 0) {
      const response = NextResponse.json(
        { error: errors.join(', ') },
        { status: 400 }
      );
      return corsHeaders(response);
    }

    const existingUser = await User.findOne({ email: data.email.toLowerCase() });
    if (existingUser) {
      const response = NextResponse.json(
        { error: 'Email already registered' },
        { status: 409 }
      );
      return corsHeaders(response);
    }

    const user = await User.create({
      name: data.name,
      email: data.email.toLowerCase(),
      password: data.password,
    });

    const token = signToken({ userId: user._id });

    const response = NextResponse.json(
      {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          bio: user.bio,
        },
        message: 'Registration successful',
      },
      { status: 201 }
    );

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return corsHeaders(response);
  } catch (error) {
    console.error('Registration error:', error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return corsHeaders(NextResponse.json({ error: messages.join(', ') }, { status: 400 }));
    }
    if (error.code === 11000) {
      return corsHeaders(NextResponse.json({ error: 'Email already registered' }, { status: 409 }));
    }
    return corsHeaders(NextResponse.json({ error: 'Internal server error' }, { status: 500 }));
  }
}