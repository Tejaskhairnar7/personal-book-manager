import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Book from '@/models/Book';
import { verifyToken } from '@/lib/auth';

export async function GET(request) {
  try {
    await connectDB();

    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    const tags = searchParams.get('tags') || '';
    const sort = searchParams.get('sort') || 'newest';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '12', 10);

    const query = { user: decoded.userId };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } },
      ];
    }

    if (status) {
      query.readingStatus = status;
    }

    if (tags) {
      const tagList = tags.split(',').map((t) => t.trim().toLowerCase());
      query.tags = { $in: tagList };
    }

    let sortOption = { createdAt: -1 };
    if (sort === 'oldest') sortOption = { createdAt: 1 };
    if (sort === 'title_asc') sortOption = { title: 1 };
    if (sort === 'title_desc') sortOption = { title: -1 };
    if (sort === 'author_asc') sortOption = { author: 1 };

    const skip = (page - 1) * limit;

    const [books, total] = await Promise.all([
      Book.find(query).sort(sortOption).skip(skip).limit(limit).lean(),
      Book.countDocuments(query),
    ]);

    return NextResponse.json({
      books,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Get books error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();

    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const body = await request.json();
    const { title, author, description, coverImage, tags, readingStatus, isFavorite, readingProgress } = body;

    if (!title || !title.trim()) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }
    if (!author || !author.trim()) {
      return NextResponse.json({ error: 'Author is required' }, { status: 400 });
    }

    const book = await Book.create({
      title: title.trim(),
      author: author.trim(),
      description: description?.trim() || '',
      coverImage: coverImage || '',
      tags: tags || [],
      readingStatus: readingStatus || 'Want To Read',
      isFavorite: isFavorite || false,
      readingProgress: readingProgress || 0,
      user: decoded.userId,
    });

    return NextResponse.json({ book }, { status: 201 });
  } catch (error) {
    console.error('Create book error:', error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return NextResponse.json({ error: messages.join(', ') }, { status: 400 });
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}