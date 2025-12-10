import { isMode, isScheme } from '@/components/theme/types';

export function readThemeFromCookie(cookieValue: string = '') {
  const [mode, scheme] = cookieValue.split(':');

  return {
    initialScheme: isScheme(scheme) ? scheme : 'neonNights',
    initialMode: isMode(mode) ? mode : 'light',
  };
}
