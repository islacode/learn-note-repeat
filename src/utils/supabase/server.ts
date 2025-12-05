import { cookies } from 'next/headers';
import { CookieAdapter, CookieToSet, createSupabaseClient } from './supabaseClient';

export async function createSupabaseServerClientSSR() {
  const cookieStore = await cookies();
  const adapter: CookieAdapter = {
    getAll: () => cookieStore.getAll(),
    setAll: (cookiesToSet: CookieToSet[]) => {
      try {
        cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
      } catch {
        // some server contexts can't mutate headers; ok to ignore
      }
    },
  };

  return createSupabaseClient(adapter);
}
