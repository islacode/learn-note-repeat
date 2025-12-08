'use client';

import GoogleSignOutForm from '@/components/GoogleButton/GoogleSignOutForm';
import GoogleSignInForm from '@/components/GoogleButton/GoogleSignInForm';
import ThemeSwitcher from '@/components/theme/ThemeSwitcher';
import { useAuth } from '@/contexts/AuthContext';

export default function Header() {
  const { user } = useAuth();
  return (
    <header className="border-b bg-[color:var(--bg-alt)] border-[color:var(--border)]">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4">
        <div className="flex items-center gap-3">
          <div
            className="h-10 w-10 rounded-xl border shadow border-[color:var(--border)]"
            style={{
              background: `linear-gradient(135deg, var(--primary), var(--accent))`,
            }}
            aria-label="Logo"
          />
          <div className="text-base font-semibold text-[color:var(--text)]" aria-label="App name">
            learn-note-repeat
          </div>
        </div>
        <div className="flex items-center gap-3">
          <ThemeSwitcher />
          {user ? <GoogleSignOutForm /> : <GoogleSignInForm />}
        </div>
      </div>
    </header>
  );
}
