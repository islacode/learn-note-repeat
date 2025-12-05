import { ROUTES } from '@/constants';

/**
 * Returns the absolute OAuth redirect URL.
 * - Browser: builds from window.location.origin
 * - Server: pass an origin (e.g., from request headers) to be explicit
 */
export function getAuthRedirectUrl(origin?: string): string {
  // Prefer explicit origin when provided (server/middleware).
  if (origin) {
    return createAuthRedirectUrl(stripTrailingSlash(origin));
  }

  // Browser-safe fallback.
  if (typeof window !== 'undefined' && window?.location?.origin) {
    return createAuthRedirectUrl(window.location.origin);
  }

  // If neither is available, fail loudly to avoid silent misconfigurations.
  throw new Error(
    'getAuthRedirectUrl: origin is required on the server. Pass an origin or use getAuthRedirectUrlFromHeaders().',
  );
}

/**
 * Server helper: derive origin from Next.js Request headers.
 * Use in route handlers/middleware when you need an absolute URL server-side.
 */
export function getAuthRedirectUrlFromHeaders(headers: Headers): string {
  // WHY: standard reverse-proxy headers used by Vercel/Next
  const proto = headers.get('x-forwarded-proto') ?? 'https';
  const host = headers.get('x-forwarded-host') ?? headers.get('host');
  if (!host) {
    throw new Error('getAuthRedirectUrlFromHeaders: missing Host header');
  }
  const origin = `${proto}://${host}`;
  return getAuthRedirectUrl(origin);
}

function stripTrailingSlash(s: string): string {
  return s.endsWith('/') ? s.slice(0, -1) : s;
}

export function createAuthRedirectUrl(origin: string) {
  return `${origin}${ROUTES.AUTH_CALLBACK}`;
}

export function buildAbsoluteUrl(
  origin: string,
  path: string,
  search?: Record<string, string | undefined>,
) {
  const url = new URL(path, origin);
  if (search) for (const [k, v] of Object.entries(search)) if (v) url.searchParams.set(k, v);
  return url.toString();
}

export function sanitizeNextPath(p: string | null | undefined): string {
  if (!p) return ROUTES.ROOT;
  if (!p.startsWith('/')) return ROUTES.ROOT;
  if (p.startsWith('//')) return ROUTES.ROOT;
  if (p.includes('\\')) return ROUTES.ROOT;
  try {
    const decoded = decodeURIComponent(p);
    if (decoded.startsWith('//')) return ROUTES.ROOT;
  } catch {}
  return p;
}
