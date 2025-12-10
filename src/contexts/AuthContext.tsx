'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { createSupabaseBrowserClient } from '@/supabase/client';
import { updateOrCreateProfile } from '@/supabase/queries/updateOrCreateProfile';

type AuthContextValue = {
  session: Session | null;
  user: User | null;
  loading: boolean;
};

const supabase = createSupabaseBrowserClient();
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    // 1) Initial session
    const initSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (!isMounted) return;

      if (error) {
        console.error(error);
      }

      const currentSession = data?.session ?? null;
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setLoading(false);

      if (currentSession?.user) {
        await updateOrCreateProfile(supabase, currentSession.user); // ← HERE (initial load)
      }
    };

    initSession();

    // 2) Listen to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      if (!isMounted) return;
      setSession(newSession);
      setUser(newSession?.user ?? null);

      if (event === 'SIGNED_IN' && newSession?.user) {
        await updateOrCreateProfile(supabase, newSession.user);
      }
    });

    // 3) Cleanup
    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const value: AuthContextValue = {
    session,
    user,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within <AuthProvider>');
  }
  return ctx;
}
