import { headers } from 'next/headers';
import { ENV } from '@/constants';

export async function resolveOrigin(): Promise<string> {
  const h = await headers();
  const xfHost = h.get('x-forwarded-host');
  const xfProto = h.get('x-forwarded-proto') ?? 'https';
  if (xfHost) return `${xfProto}://${xfHost}`;
  return h.get('origin') ?? ENV.SITE_URL;
}
