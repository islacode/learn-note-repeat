import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { ENV } from '@/constants';

export type CookieToSet = { name: string; value: string; options: CookieOptions };

export type CookieAdapter = {
  getAll: () => { name: string; value: string }[];
  setAll: (cookies: CookieToSet[]) => void;
};

// Factory: builds a Supabase client that reads from request cookies and mirrors updates to response.
export function createSupabaseClient(adapter: CookieAdapter) {
  return createServerClient(ENV.SUPABASE_URL, ENV.SUPABASE_PUBLISHABLE_KEY, { cookies: adapter });
}
