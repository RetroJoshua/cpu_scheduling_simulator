
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AppContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  fontSize: number;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [fontSize, setFontSize] = useState(16);

  useEffect(() => {
    // Apply theme to document
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    // Apply font size to document
    document.documentElement.style.fontSize = `${fontSize}px`;
  }, [fontSize]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const increaseFontSize = () => {
    setFontSize(prev => Math.min(prev + 2, 24));
  };

  const decreaseFontSize = () => {
    setFontSize(prev => Math.max(prev - 2, 12));
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        fontSize,
        increaseFontSize,
        decreaseFontSize
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
}
