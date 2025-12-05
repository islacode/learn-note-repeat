'use client';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

type ThemeName = 'neonNights' | 'arcticAurora';
type ThemeCtx = { theme: ThemeName; setTheme: (t: ThemeName) => void };

const ThemeContext = createContext<ThemeCtx | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeName>('neonNights');
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
