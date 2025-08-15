import React, { useState, useEffect, createContext, useContext } from 'react';

// Simple local "database" structure
interface User {
  id: string;
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'user';
  createdAt: string;
  lastLogin?: string;
  loginAttempts: number;
  isLocked: boolean;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
}

interface AuthContextType extends AuthState {
  login: (username: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  register: (userData: Omit<User, 'id' | 'createdAt' | 'loginAttempts' | 'isLocked' | 'lastLogin'>) => Promise<{ success: boolean; message: string }>;
  updateProfile: (updates: Partial<User>) => void;
  resetPassword: (username: string, newPassword: string) => Promise<{ success: boolean; message: string }>;
}

// Local Storage Keys
const USERS_KEY = 'codecrafter_users';
const AUTH_KEY = 'codecrafter_auth';
const SESSION_KEY = 'codecrafter_session';

// Default admin user (created on first run)
const DEFAULT_ADMIN: User = {
  id: 'admin-001',
  username: 'admin',
  password: 'admin123', // In real app, this would be hashed
  email: 'admin@codecrafter.com',
  firstName: 'Code',
  lastName: 'Crafter',
  role: 'admin',
  createdAt: new Date().toISOString(),
  loginAttempts: 0,
  isLocked: false
};

// Local Storage Database Functions
class LocalDB {
  static getUsers(): User[] {
    try {
      const users = localStorage.getItem(USERS_KEY);
      return users ? JSON.parse(users) : [];
    } catch {
      return [];
    }
  }

  static saveUsers(users: User[]): void {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  static initializeDB(): void {
    const users = this.getUsers();
    if (users.length === 0) {
      // Create default admin user
      this.saveUsers([DEFAULT_ADMIN]);
    }
  }

  static findUser(username: string): User | null {
    const users = this.getUsers();
    return users.find(user => user.username === username) || null;
  }

  static updateUser(userId: string, updates: Partial<User>): boolean {
    const users = this.getUsers();
    const userIndex = users.findIndex(user => user.id === userId);
    
    if (userIndex === -1) return false;
    
    users[userIndex] = { ...users[userIndex], ...updates };
    this.saveUsers(users);
    return true;
  }

  static createUser(userData: Omit<User, 'id' | 'createdAt' | 'loginAttempts' | 'isLocked'>): User {
    const users = this.getUsers();
    const newUser: User = {
      ...userData,
      id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      loginAttempts: 0,
      isLocked: false
    };
    
    users.push(newUser);
    this.saveUsers(users);
    return newUser;
  }
}

// Session Management
class SessionManager {
  static saveSession(user: User): void {
    const session = {
      userId: user.id,
      loginTime: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    localStorage.setItem(AUTH_KEY, 'true');
  }

  static getSession(): { userId: string; loginTime: string; expiresAt: string } | null {
    try {
      const session = localStorage.getItem(SESSION_KEY);
      if (!session) return null;
      
      const parsedSession = JSON.parse(session);
      const now = new Date();
      const expiresAt = new Date(parsedSession.expiresAt);
      
      if (now > expiresAt) {
        this.clearSession();
        return null;
      }
      
      return parsedSession;
    } catch {
      return null;
    }
  }

  static clearSession(): void {
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(AUTH_KEY);
  }

  static isAuthenticated(): boolean {
    return localStorage.getItem(AUTH_KEY) === 'true' && this.getSession() !== null;
  }
}

// Create Auth Context
const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth Hook Implementation
export const useAuthState = (): AuthContextType => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    isLoading: true
  });

  // Initialize on mount
  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      // Initialize local database
      LocalDB.initializeDB();
      
      // Check for existing session
      const session = SessionManager.getSession();
      if (session) {
        const user = LocalDB.findUser('admin'); // For now, we assume single admin
        if (user) {
          setAuthState({
            isAuthenticated: true,
            user,
            isLoading: false
          });
          return;
        }
      }
      
      setAuthState({
        isAuthenticated: false,
        user: null,
        isLoading: false
      });
    } catch (error) {
      console.error('Auth initialization error:', error);
      setAuthState({
        isAuthenticated: false,
        user: null,
        isLoading: false
      });
    }
  };

  const login = async (username: string, password: string): Promise<{ success: boolean; message: string }> => {
    try {
      const user = LocalDB.findUser(username);
      
      if (!user) {
        return { success: false, message: 'Invalid username or password' };
      }

      if (user.isLocked) {
        return { success: false, message: 'Account is locked due to too many failed attempts' };
      }

      if (user.password !== password) {
        // Increment login attempts
        const newAttempts = user.loginAttempts + 1;
        const shouldLock = newAttempts >= 5;
        
        LocalDB.updateUser(user.id, {
          loginAttempts: newAttempts,
          isLocked: shouldLock
        });

        return { 
          success: false, 
          message: shouldLock 
            ? 'Account locked due to too many failed attempts' 
            : `Invalid password. ${5 - newAttempts} attempts remaining.`
        };
      }

      // Successful login
      LocalDB.updateUser(user.id, {
        loginAttempts: 0,
        lastLogin: new Date().toISOString()
      });

      const updatedUser = LocalDB.findUser(username)!;
      SessionManager.saveSession(updatedUser);
      
      setAuthState({
        isAuthenticated: true,
        user: updatedUser,
        isLoading: false
      });

      return { success: true, message: 'Login successful!' };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'An error occurred during login' };
    }
  };

  const logout = () => {
    SessionManager.clearSession();
    setAuthState({
      isAuthenticated: false,
      user: null,
      isLoading: false
    });
  };

  const register = async (userData: Omit<User, 'id' | 'createdAt' | 'loginAttempts' | 'isLocked' | 'lastLogin'>): Promise<{ success: boolean; message: string }> => {
    try {
      const existingUser = LocalDB.findUser(userData.username);
      if (existingUser) {
        return { success: false, message: 'Username already exists' };
      }

      const newUser = LocalDB.createUser(userData);
      return { success: true, message: 'User registered successfully!' };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, message: 'An error occurred during registration' };
    }
  };

  const updateProfile = (updates: Partial<User>) => {
    if (!authState.user) return;
    
    const success = LocalDB.updateUser(authState.user.id, updates);
    if (success) {
      const updatedUser = LocalDB.findUser(authState.user.username);
      if (updatedUser) {
        setAuthState(prev => ({
          ...prev,
          user: updatedUser
        }));
      }
    }
  };

  const resetPassword = async (username: string, newPassword: string): Promise<{ success: boolean; message: string }> => {
    try {
      const user = LocalDB.findUser(username);
      if (!user) {
        return { success: false, message: 'User not found' };
      }

      const success = LocalDB.updateUser(user.id, { 
        password: newPassword,
        loginAttempts: 0,
        isLocked: false
      });

      return success 
        ? { success: true, message: 'Password reset successfully!' }
        : { success: false, message: 'Failed to reset password' };
    } catch (error) {
      console.error('Password reset error:', error);
      return { success: false, message: 'An error occurred during password reset' };
    }
  };

  return {
    ...authState,
    login,
    logout,
    register,
    updateProfile,
    resetPassword
  };
};

// Auth Provider Component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useAuthState();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

// Export for direct usage
export default useAuthState;
