import '@/styles/globals.css';
import type { ReactNode } from 'react';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { Metadata } from 'next';

export const metadata: Metadata = { title: 'learn-note-repeat' };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="orchid">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
