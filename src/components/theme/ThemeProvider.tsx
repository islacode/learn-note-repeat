'use client';
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type Scheme = 'neonNights' | 'arcticAurora';
export type Mode = 'light' | 'dark';
export type ThemeCtx = {
  scheme: Scheme;
  mode: Mode;
  setScheme: (s: Scheme) => void;
  toggleMode: () => void;
};

const ThemeContext = createContext<ThemeCtx | undefined>(undefined);
const LS_KEY_SCHEME = 'ui.scheme';
const LS_KEY_MODE = 'ui.mode';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [scheme, setScheme] = useState<Scheme>(() =>
    typeof window !== 'undefined'
      ? (localStorage.getItem(LS_KEY_SCHEME) as Scheme) || 'neonNights'
      : 'neonNights',
  );
  const [mode, setMode] = useState<Mode>(() =>
    typeof window !== 'undefined'
      ? (localStorage.getItem(LS_KEY_MODE) as Mode) || 'light'
      : 'light',
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', scheme);
    try {
      localStorage.setItem(LS_KEY_SCHEME, scheme);
    } catch {}
  }, [scheme]);

  useEffect(() => {
    document.documentElement.setAttribute('data-mode', mode);
    try {
      localStorage.setItem(LS_KEY_MODE, mode);
    } catch {}
  }, [mode]);

  const value = useMemo<ThemeCtx>(
    () => ({
      scheme,
      mode,
      setScheme,
      toggleMode: () => setMode((m) => (m === 'light' ? 'dark' : 'light')),
    }),
    [scheme, mode],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
