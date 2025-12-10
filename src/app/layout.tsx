import '@/styles/globals.css';
import type { ReactNode } from 'react';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { Metadata } from 'next';
import { AuthProvider } from '@/contexts/AuthContext';
import Layout from '@/components/Layout/Layout';

export const metadata: Metadata = { title: 'learn-note-repeat' };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="neonNights" data-mode="light">
      <body>
        <AuthProvider>
          <ThemeProvider>
            <Layout>{children}</Layout>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
