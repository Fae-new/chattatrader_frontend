import { createContext, useContext, type ReactNode } from 'react';
import { type User } from './types';
import { mockAuth } from '../lib/mockAuth';

type AuthContextType = {
  user: Partial<User> | null;
  login: (email: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const isAuthenticated = mockAuth.isAuthenticated();
  const user = mockAuth.getUser();

  const login = (email: string) => {
    mockAuth.login(email);
    window.location.href = 'app/discover';
  };

  const logout = () => {
    mockAuth.logout();
    window.location.href = '/';
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
