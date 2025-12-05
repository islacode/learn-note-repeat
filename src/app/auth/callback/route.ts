import { NextResponse } from 'next/server';
import { createSupabaseServerClientSSR } from '@/supabase/server';
import { ROUTES, QUERY, ERRORS } from '@/constants';
import { sanitizeNextPath } from '@/helpers/urls';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const nextParam = sanitizeNextPath(searchParams.get(QUERY.NEXT));

  if (code) {
    const supabase = await createSupabaseServerClientSSR();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(`${origin}${nextParam}`);
  }
  return NextResponse.redirect(`${origin}${ROUTES.LOGIN}?${QUERY.ERROR}=${ERRORS.CALLBACK_FAILED}`);
}
