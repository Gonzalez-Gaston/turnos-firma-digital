import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
  user: { email: string } | null;
  isAdmin: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [loading, setLoading] = useState(false);

  // Simple admin authentication for demo purposes
  // In production, this should connect to your PostgreSQL backend
  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Demo credentials - replace with actual backend authentication
      if (email === 'admin@firmadigitalsalta.gob.ar' && password === 'admin123') {
        setUser({ email });
      } else {
        throw new Error('Credenciales inválidas');
      }
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setUser(null);
  };

  const value = {
    user,
    isAdmin: !!user, // If user exists, they are admin
    loading,
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