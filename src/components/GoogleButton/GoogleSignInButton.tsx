'use client';

import { useFormStatus } from 'react-dom';
import GoogleGIcon from './GoogleGIcon';

export default function GoogleSignInButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      className="inline-flex items-center justify-center gap-3 rounded-md border px-4 py-2 text-sm font-medium bg-[var(--google-surface)] text-[var(--google-text)] border-[var(--google-border)] hover:bg-[var(--google-hover)] disabled:opacity-70 cursor-pointer transition-colors"
    >
      <GoogleGIcon className="h-5 w-5" />
      {pending ? 'Redirecting…' : 'Sign in with Google'}
      <span className="sr-only" aria-live="polite">
        {pending ? 'Redirecting to Google…' : ''}
      </span>
    </button>
  );
}
