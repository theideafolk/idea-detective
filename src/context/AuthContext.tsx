
import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockUsers } from '../lib/mockData';

interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'member';
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (username: string, email: string, password: string, role: 'admin' | 'member') => Promise<boolean>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if user is stored in local storage
    const storedUser = localStorage.getItem('ideaFolkUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call with 800ms delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // For demo purposes, accept any user from mockUsers with matching email
      // and "password" as the password
      const foundUser = mockUsers.find(u => u.email === email);
      
      if (foundUser && password === 'password') {
        const userData = {
          id: foundUser.id,
          username: foundUser.username,
          email: foundUser.email,
          role: foundUser.role
        };
        
        setUser(userData);
        localStorage.setItem('ideaFolkUser', JSON.stringify(userData));
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ideaFolkUser');
  };

  const register = async (
    username: string, 
    email: string, 
    password: string, 
    role: 'admin' | 'member'
  ): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call with 1s delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, just succeed if email isn't already used
      const emailExists = mockUsers.some(u => u.email === email);
      
      if (!emailExists) {
        const newUser = {
          id: `user-${Date.now()}`,
          username,
          email,
          role
        };
        
        setUser(newUser);
        localStorage.setItem('ideaFolkUser', JSON.stringify(newUser));
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isLoading,
    login,
    logout,
    register,
    isAdmin: user?.role === 'admin'
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
