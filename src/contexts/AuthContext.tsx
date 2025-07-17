import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../services/firebase';
import { AuthService, AuthUser } from '../services/auth';
import { ErrorHandler, AppError } from '../utils/errorHandler';
import { useNetworkStatus } from '../hooks/useNetworkStatus';

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  error: AppError | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName?: string) => Promise<void>;
  signOut: () => Promise<void>;
  clearError: () => void;
  retryLastOperation: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AppError | null>(null);
  const [lastOperation, setLastOperation] = useState<{
    type: 'signIn' | 'signUp' | 'signOut';
    params: any[];
  } | null>(null);
  
  const networkStatus = useNetworkStatus();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: User | null) => {
      if (firebaseUser) {
        setUser(AuthService.convertFirebaseUser(firebaseUser));
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Clear error when network comes back online
  useEffect(() => {
    if (networkStatus.isConnected && error?.type === 'network') {
      setError(null);
    }
  }, [networkStatus.isConnected, error]);

  const clearError = () => {
    setError(null);
  };

  const signIn = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    setError(null);
    setLastOperation({ type: 'signIn', params: [email, password] });
    
    try {
      await ErrorHandler.handleWithRetry(
        () => AuthService.signIn(email, password),
        3,
        1000
      );
    } catch (error: any) {
      const appError = ErrorHandler.handleAuthError(error);
      setError(appError);
      ErrorHandler.logError(appError, 'AuthContext.signIn');
      setLoading(false);
      throw appError;
    }
  };

  const signUp = async (email: string, password: string, displayName?: string): Promise<void> => {
    setLoading(true);
    setError(null);
    setLastOperation({ type: 'signUp', params: [email, password, displayName] });
    
    try {
      await ErrorHandler.handleWithRetry(
        () => AuthService.signUp(email, password, displayName),
        3,
        1000
      );
    } catch (error: any) {
      const appError = ErrorHandler.handleAuthError(error);
      setError(appError);
      ErrorHandler.logError(appError, 'AuthContext.signUp');
      setLoading(false);
      throw appError;
    }
  };

  const signOut = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    setLastOperation({ type: 'signOut', params: [] });
    
    try {
      await ErrorHandler.handleWithRetry(
        () => AuthService.signOut(),
        2,
        500
      );
    } catch (error: any) {
      const appError = ErrorHandler.handleAuthError(error);
      setError(appError);
      ErrorHandler.logError(appError, 'AuthContext.signOut');
      setLoading(false);
      throw appError;
    }
  };

  const retryLastOperation = async (): Promise<void> => {
    if (!lastOperation) return;
    
    switch (lastOperation.type) {
      case 'signIn':
        await signIn(lastOperation.params[0], lastOperation.params[1]);
        break;
      case 'signUp':
        await signUp(lastOperation.params[0], lastOperation.params[1], lastOperation.params[2]);
        break;
      case 'signOut':
        await signOut();
        break;
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    clearError,
    retryLastOperation,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};