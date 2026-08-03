'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Select from '@/components/ui/Select';
import TagInput from '@/components/ui/TagInput';
import Button from '@/components/ui/Button';
import { READING_STATUS_OPTIONS } from '@/utils/constants';
import { Save, X } from 'lucide-react';

export default function BookForm({ initialData, onSubmit, onCancel, loading = false }) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [author, setAuthor] = useState(initialData?.author || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [coverImage, setCoverImage] = useState(initialData?.coverImage || '');
  const [tags, setTags] = useState(initialData?.tags || []);
  const [readingStatus, setReadingStatus] = useState(initialData?.readingStatus || 'Want To Read');
  const [readingProgress, setReadingProgress] = useState(initialData?.readingProgress || 0);
  const [isFavorite, setIsFavorite] = useState(initialData?.isFavorite || false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      author,
      description,
      coverImage,
      tags,
      readingStatus,
      readingProgress: Number(readingProgress),
      isFavorite,
    });
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input
          label="Title *"
          placeholder="The Great Gatsby"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <Input
          label="Author *"
          placeholder="F. Scott Fitzgerald"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </div>

      <Textarea
        label="Description"
        placeholder="A brief description of the book..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <Input
        label="Cover Image URL"
        placeholder="https://example.com/cover.jpg"
        value={coverImage}
        onChange={(e) => setCoverImage(e.target.value)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Select
          label="Reading Status"
          value={readingStatus}
          onChange={(e) => setReadingStatus(e.target.value)}
          options={READING_STATUS_OPTIONS}
        />
        {readingStatus === 'Reading' && (
          <Input
            label="Reading Progress (%)"
            type="number"
            min="0"
            max="100"
            value={readingProgress}
            onChange={(e) => setReadingProgress(e.target.value)}
          />
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Tags
        </label>
        <TagInput value={tags} onChange={setTags} />
      </div>

      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={isFavorite}
          onChange={(e) => setIsFavorite(e.target.checked)}
          className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
        />
        <span className="text-sm text-gray-700 dark:text-gray-300">Add to favorites</span>
      </label>

      <div className="flex gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
        <Button type="submit" loading={loading} icon={Save}>
          {initialData ? 'Update Book' : 'Add Book'}
        </Button>
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel} icon={X}>
            Cancel
          </Button>
        )}
      </div>
    </motion.form>
  );
}