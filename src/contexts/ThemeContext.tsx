import React, { createContext, useContext, useState, ReactNode } from 'react';
import { theme as defaultTheme, Theme } from '../styles/theme';

interface ThemeContextType {
  theme: Theme;
  isDarkMode: boolean;
  toggleTheme: () => void;
  setCustomTheme: (customTheme: Partial<Theme>) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: Theme;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  initialTheme = defaultTheme,
}) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(initialTheme);
  const [isDarkMode, setIsDarkMode] = useState(true); // TikTok is primarily dark

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // In the future, we could implement light theme colors here
    // For now, TikTok clone stays dark
  };

  const setCustomTheme = (customTheme: Partial<Theme>) => {
    setCurrentTheme(prevTheme => ({
      ...prevTheme,
      ...customTheme,
    }));
  };

  const contextValue: ThemeContextType = {
    theme: currentTheme,
    isDarkMode,
    toggleTheme,
    setCustomTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Hook for accessing theme values directly
export const useThemeValues = () => {
  const { theme } = useTheme();
  return theme;
};