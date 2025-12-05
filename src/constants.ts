export const ROUTES = {
  ROOT: '/' as const,
  LOGIN: '/login' as const,
  DASHBOARD: '/dashboard' as const,
  AUTH_CALLBACK: '/auth/callback' as const,
};

export const QUERY = {
  NEXT: 'next' as const,
  ERROR: 'error' as const,
};

export const ERRORS = {
  OAUTH_INIT_FAILED: 'oauth_init_failed' as const,
  CALLBACK_FAILED: 'callback_failed' as const,
};

export const ENV = {
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL as string,
  SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  SUPABASE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY as string,
};

export const OAUTH = {
  PROVIDERS: {
    GOOGLE: 'google' as const,
  },
  QUERY_PARAMS: {
    access_type: 'offline',
    prompt: 'consent',
  } as const,
};

export type OAuthProvider = (typeof OAUTH.PROVIDERS)[keyof typeof OAUTH.PROVIDERS];
