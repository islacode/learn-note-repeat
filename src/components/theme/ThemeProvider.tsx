'use client';

import { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { OptionsType, setCookie } from 'cookies-next/client';
import { Mode, Scheme, ThemeCtx } from './types';
import { COOKIE_OPTIONS, COOKIE_THEME_NAME } from '@/constants';

const ThemeContext = createContext<ThemeCtx | undefined>(undefined);

export interface ThemeProviderProps {
  children: ReactNode;
  initialScheme: Scheme;
  initialMode: Mode;
}

export function ThemeProvider({ children, initialScheme, initialMode }: ThemeProviderProps) {
  const [scheme, setScheme] = useState<Scheme>(initialScheme);
  const [mode, setMode] = useState<Mode>(initialMode);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', scheme);
    document.documentElement.setAttribute('data-mode', mode);
    try {
      setCookie(COOKIE_THEME_NAME, `${mode}:${scheme}`, COOKIE_OPTIONS as OptionsType);
    } catch {}
  }, [scheme, mode]);

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
