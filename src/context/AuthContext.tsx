import { createContext, useContext, useState, type ReactNode } from 'react';
import { type User } from './types';
import { mockAuth } from '../lib/mockAuth';

type AuthContextType = {
  user: Partial<User> | null;
  login: (user: Partial<User>) => void;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<Partial<User> | null>(mockAuth.getUser())
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(mockAuth.isAuthenticated());


 const login = (userData: Partial<User>) => {
    mockAuth.login(userData.email || '');
    setUser(userData);
    setIsAuthenticated(true);
    window.location.href = '/app/discover';
  };


   const logout = () => {
    mockAuth.logout();
    setUser(null);
    setIsAuthenticated(false);
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