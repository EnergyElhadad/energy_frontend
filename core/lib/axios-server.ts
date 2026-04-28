import axios from 'axios';
import { cookies } from 'next/headers';
import https from 'https';
import { auth } from '@/auth';
import { getLocale } from 'next-intl/server';

const forceHttps = (data: unknown): unknown => {
  const apiHost = process.env.NEXT_PUBLIC_API_URL
    ? new URL(process.env.NEXT_PUBLIC_API_URL).host
    : null;
  if (!apiHost) return data;

  const rewrite = (val: unknown): unknown => {
    if (typeof val === 'string') {
      return val.startsWith(`http://${apiHost}`)
        ? val.replace(`http://${apiHost}`, `https://${apiHost}`)
        : val;
    }
    if (Array.isArray(val)) return val.map(rewrite);
    if (val && typeof val === 'object') {
      return Object.fromEntries(
        Object.entries(val as Record<string, unknown>).map(([k, v]) => [k, rewrite(v)])
      );
    }
    return val;
  };

  return rewrite(data);
};

/**
 * Tries to read the session and request locale from the current request scope.
 * Returns safe anonymous defaults when there is no request scope (build time,
 * `generateStaticParams`, ISR regeneration). This is what lets public pages
 * (home, products, categories, sitemap) actually be statically rendered/ISR'd
 * — without this guard, even a single `cookies()` call forces the page into
 * dynamic rendering on every request.
 */
const readRequestContext = async () => {
  let cookieLocale: string | undefined;
  try {
    const cookieStore = await cookies();
    cookieLocale = cookieStore.get('NEXT_LOCALE')?.value;
  } catch {
    // No request scope — that's fine, we'll fetch as anonymous with default locale.
  }

  // `auth()` from NextAuth has overloads (middleware vs server-call); strip
  // them down to the direct-call shape we use here.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let session: any = null;
  try {
    session = await (auth as () => Promise<unknown>)();
  } catch (error) {
    // `auth()` reads cookies internally — same story. Anonymous fallback.
    if (process.env.NODE_ENV !== 'production') {
      console.error('Failed to get auth session:', error);
    }
  }

  let locale = 'ar';
  try {
    locale = await getLocale();
  } catch {
    locale = cookieLocale || 'ar';
  }

  return { session, locale };
};

export const Axios = async () => {
  const { session, locale } = await readRequestContext();

  const headers: Record<string, string> = {
    'Accept-Language': locale,
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (session?.user && (session.user as any).accessToken) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    headers['Authorization'] = `token ${(session.user as any).accessToken}`;
  }

  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers,
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
  });

  instance.interceptors.response.use(response => {
    response.data = forceHttps(response.data);
    return response;
  });

  return instance;
};
