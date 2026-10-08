'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, LoginPayload, RegisterPayload } from '../types';
import { loginApi, registerApi } from '../services/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('aurum_user');
      const storedToken = localStorage.getItem('aurum_token');
      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      }
    } catch (e) {
      console.warn('No se pudo restaurar sesión previa:', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (payload: LoginPayload) => {
    setIsLoading(true);
    try {
      const session = await loginApi(payload);
      setUser(session.user);
      setToken(session.token);
      localStorage.setItem('aurum_user', JSON.stringify(session.user));
      localStorage.setItem('aurum_token', session.token);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (payload: RegisterPayload) => {
    setIsLoading(true);
    try {
      const session = await registerApi(payload);
      setUser(session.user);
      setToken(session.token);
      localStorage.setItem('aurum_user', JSON.stringify(session.user));
      localStorage.setItem('aurum_token', session.token);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('aurum_user');
    localStorage.removeItem('aurum_token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
  }
  return context;
};
