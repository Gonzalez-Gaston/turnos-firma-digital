import React, { createContext, useContext, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002/api';

interface AuthContextType {
  user: {
    id: number;
    email: string;
    role: string;
  } | null;
  isAdmin: boolean;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{ id: number; email: string; role: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({ email, password, role: 'admin' }),
        credentials: 'include',
        mode: 'cors'
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Error al iniciar sesión');
      }

      const data = await response.json();
      if (!data.user) {
        throw new Error('No se recibieron datos del usuario');
      }
      setUser(data.user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } finally {
      setUser(null);
    }
  };

  const value = {
    user,
    isAdmin: user?.role === 'admin',
    loading,
    error,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}