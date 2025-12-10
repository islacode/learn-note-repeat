import '@/styles/globals.css';
import type { ReactNode } from 'react';
import { cookies } from 'next/headers';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { Metadata } from 'next';
import { AuthProvider } from '@/contexts/AuthContext';
import Layout from '@/components/Layout/Layout';
import { COOKIE_THEME_NAME } from '@/constants';
import { readThemeFromCookie } from '@/helpers/cookie';

export const metadata: Metadata = { title: 'learn-note-repeat' };

export default async function RootLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const { initialScheme, initialMode } = readThemeFromCookie(
    cookieStore.get(COOKIE_THEME_NAME)?.value,
  );

  return (
    <html lang="en" data-theme={initialScheme} data-mode={initialMode}>
      <body>
        <AuthProvider>
          <ThemeProvider initialScheme={initialScheme} initialMode={initialMode}>
            <Layout>{children}</Layout>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
