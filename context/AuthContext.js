'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import API from '@/utils/api';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    try {
      const res = await API.get('/api/auth/me');
      setUser(res.data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (email, password) => {
    const res = await API.post('/api/auth/login', { email, password });
    setUser(res.data.user);
    toast.success('Welcome back!');
    return res.data;
  };

  const register = async (name, email, password) => {
    const res = await API.post('/api/auth/register', { name, email, password });
    setUser(res.data.user);
    toast.success('Account created successfully!');
    return res.data;
  };

  const logout = async () => {
    await API.post('/api/auth/logout');
    setUser(null);
    toast.success('Logged out successfully');
  };

  const updateProfile = async (data) => {
    const res = await API.put('/api/auth/profile', data);
    setUser(res.data.user);
    toast.success('Profile updated!');
    return res.data;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateProfile,
        checkAuth,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}