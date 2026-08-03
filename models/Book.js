import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: [1, 'Title cannot be empty'],
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    author: {
      type: String,
      required: [true, 'Author is required'],
      trim: true,
      minlength: [1, 'Author cannot be empty'],
      maxlength: [100, 'Author cannot exceed 100 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [2000, 'Description cannot exceed 2000 characters'],
      default: '',
    },
    coverImage: {
      type: String,
      default: '',
    },
    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
        maxlength: [30, 'Tag cannot exceed 30 characters'],
      },
    ],
    readingStatus: {
      type: String,
      enum: {
        values: ['Want To Read', 'Reading', 'Completed'],
        message: 'Reading status must be Want To Read, Reading, or Completed',
      },
      default: 'Want To Read',
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
    readingProgress: {
      type: Number,
      default: 0,
      min: [0, 'Progress cannot be negative'],
      max: [100, 'Progress cannot exceed 100'],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

bookSchema.index({ user: 1, readingStatus: 1 });
bookSchema.index({ user: 1, tags: 1 });
bookSchema.index({ user: 1, title: 'text', author: 'text' });

export default mongoose.models.Book || mongoose.model('Book', bookSchema);