import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { type User } from './types';

type AuthContextType = {
  user: Partial<User> | null;
  login: (user: Partial<User>) => void;
  logout: () => void;
  isAuthenticated: boolean;
  token: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
 const [user, setUser] = useState<Partial<User> | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

 useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
    }
  }, []);

   const login = (userData: Partial<User>) => {
    if (userData.token) {
      setToken(userData.token);
      localStorage.setItem('token', userData.token); // switching 
      setIsAuthenticated(true);
      setUser(userData); 
    }
  };


  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, token }}>
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