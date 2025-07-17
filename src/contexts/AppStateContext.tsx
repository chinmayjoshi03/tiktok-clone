import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { StorageService, AppState } from '../services/storage';
import { useAppLifecycle } from '../hooks/useAppLifecycle';
import { ErrorHandler } from '../utils/errorHandler';

interface AppStateContextType {
  userPreferences: AppState['userPreferences'];
  updateUserPreferences: (preferences: Partial<AppState['userPreferences']>) => Promise<void>;
  clearAppData: () => Promise<void>;
  isDataLoaded: boolean;
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

interface AppStateProviderProps {
  children: ReactNode;
}

export const AppStateProvider: React.FC<AppStateProviderProps> = ({ children }) => {
  const [userPreferences, setUserPreferences] = useState<AppState['userPreferences']>({
    autoplay: true,
    soundEnabled: true,
    dataUsageMode: 'normal',
  });
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  
  const appLifecycle = useAppLifecycle();

  // Load app state on mount
  useEffect(() => {
    const loadAppState = async () => {
      try {
        const savedState = await StorageService.getAppState();
        setUserPreferences(savedState.userPreferences);
        setIsDataLoaded(true);
      } catch (error) {
        ErrorHandler.logError(
          ErrorHandler.createError('STORAGE_ERROR', 'Failed to load app state', 'storage', false),
          'AppStateContext.loadAppState'
        );
        setIsDataLoaded(true); // Still mark as loaded to prevent infinite loading
      }
    };

    loadAppState();
  }, []);

  // Save preferences when app goes to background
  useEffect(() => {
    if (appLifecycle.isBackground && isDataLoaded) {
      const savePreferences = async () => {
        try {
          await StorageService.saveUserPreferences(userPreferences);
        } catch (error) {
          ErrorHandler.logError(
            ErrorHandler.createError('STORAGE_ERROR', 'Failed to save user preferences', 'storage', false),
            'AppStateContext.savePreferences'
          );
        }
      };
      savePreferences();
    }
  }, [appLifecycle.isBackground, userPreferences, isDataLoaded]);

  const updateUserPreferences = async (newPreferences: Partial<AppState['userPreferences']>) => {
    try {
      const updatedPreferences = { ...userPreferences, ...newPreferences };
      setUserPreferences(updatedPreferences);
      await StorageService.saveUserPreferences(updatedPreferences);
    } catch (error) {
      ErrorHandler.logError(
        ErrorHandler.createError('STORAGE_ERROR', 'Failed to update user preferences', 'storage', false),
        'AppStateContext.updateUserPreferences'
      );
      // Revert the state change on error
      setUserPreferences(userPreferences);
      throw error;
    }
  };

  const clearAppData = async () => {
    try {
      await StorageService.clearAppState();
      setUserPreferences({
        autoplay: true,
        soundEnabled: true,
        dataUsageMode: 'normal',
      });
    } catch (error) {
      ErrorHandler.logError(
        ErrorHandler.createError('STORAGE_ERROR', 'Failed to clear app data', 'storage', false),
        'AppStateContext.clearAppData'
      );
      throw error;
    }
  };

  const value: AppStateContextType = {
    userPreferences,
    updateUserPreferences,
    clearAppData,
    isDataLoaded,
  };

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = (): AppStateContextType => {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};