'use server';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { createSupabaseServerClientSSR } from '@/supabase/server';
import { ENV, OAUTH, ROUTES, QUERY, ERRORS } from '@/constants';
import { buildAbsoluteUrl, sanitizeNextPath } from '@/helpers/urls';

export async function signInWithGoogle(formData: FormData) {
  const supabase = await createSupabaseServerClientSSR();
  const h = await headers(); // Next.js 16: async headers()
  const origin = (h.get('origin') ?? ENV.SITE_URL) as string;
  const nextParam = sanitizeNextPath((formData.get('next') as string) || ROUTES.DASHBOARD);
  const callbackUrl = buildAbsoluteUrl(origin, ROUTES.AUTH_CALLBACK, { [QUERY.NEXT]: nextParam });

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: OAUTH.PROVIDERS.GOOGLE,
    options: {
      redirectTo: callbackUrl,
      queryParams: OAUTH.QUERY_PARAMS, // refresh token intent
    },
  });

  if (error || !data?.url) redirect(`${ROUTES.LOGIN}?${QUERY.ERROR}=${ERRORS.OAUTH_INIT_FAILED}`);
  redirect(data.url);
}

export async function signOut() {
  const supabase = await createSupabaseServerClientSSR();
  await supabase.auth.signOut();
  redirect(ROUTES.LOGIN);
}
