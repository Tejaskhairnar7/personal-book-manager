'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Edit3, Save, X, BookOpen, Bookmark, CheckCircle2, Calendar } from 'lucide-react';
import AuthGuard from '@/components/AuthGuard';
import { useAuth } from '@/context/AuthContext';
import { useBookStats } from '@/hooks/useBookStats';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { getInitials, formatDate } from '@/utils/helpers';
import toast from 'react-hot-toast';

function ProfileContent() {
  const { user, updateProfile } = useAuth();
  const { stats } = useBookStats();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error('Name is required');
      return;
    }
    setLoading(true);
    try {
      await updateProfile({ name: name.trim(), bio });
      setEditing(false);
    } catch (error) {
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-gray-900 dark:text-white">
          Profile
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Manage your account settings
        </p>
      </motion.div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-6 sm:p-8"
      >
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-primary-200 dark:shadow-primary-900/30">
              {getInitials(user?.name)}
            </div>
            <div>
              <h2 className="text-xl font-display font-bold text-gray-900 dark:text-white">
                {user?.name}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" />
                {user?.email}
              </p>
            </div>
          </div>
          <Button
            variant={editing ? 'secondary' : 'outline'}
            size="sm"
            icon={editing ? X : Edit3}
            onClick={() => {
              if (editing) {
                setName(user?.name || '');
                setBio(user?.bio || '');
              }
              setEditing(!editing);
            }}
          >
            {editing ? 'Cancel' : 'Edit'}
          </Button>
        </div>

        {editing ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-700"
          >
            <Input
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              icon={User}
            />
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Bio
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us about yourself..."
                rows={3}
                maxLength={200}
                className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all px-4 py-2.5 text-sm resize-none"
              />
              <p className="text-xs text-gray-400">{bio.length}/200</p>
            </div>
            <Button onClick={handleSave} loading={loading} icon={Save}>
              Save Changes
            </Button>
          </motion.div>
        ) : (
          <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
            {user?.bio ? (
              <p className="text-gray-600 dark:text-gray-400">{user.bio}</p>
            ) : (
              <p className="text-gray-400 dark:text-gray-500 italic">No bio yet. Click edit to add one.</p>
            )}
          </div>
        )}
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-6 sm:p-8"
      >
        <h3 className="text-lg font-display font-semibold text-gray-900 dark:text-white mb-4">
          Reading Stats
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
            <BookOpen className="w-5 h-5 text-primary-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats?.total || 0}</p>
            <p className="text-xs text-gray-500">Total</p>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
            <Bookmark className="w-5 h-5 text-blue-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats?.wantToRead || 0}</p>
            <p className="text-xs text-gray-500">Want to Read</p>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
            <BookOpen className="w-5 h-5 text-amber-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats?.reading || 0}</p>
            <p className="text-xs text-gray-500">Reading</p>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats?.completed || 0}</p>
            <p className="text-xs text-gray-500">Completed</p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center gap-2 text-sm text-gray-400">
          <Calendar className="w-4 h-4" />
          Member since {formatDate(user?.createdAt)}
        </div>
      </motion.div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <AuthGuard>
      <ProfileContent />
    </AuthGuard>
  );
}