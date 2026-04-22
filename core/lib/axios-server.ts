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

export const Axios = async () => {
  const cookieStore = await cookies();
  let session = null;
  try {
    session = await auth();
  } catch (error) {
    console.error('Failed to get auth session:', error);
  }
  let locale = 'ar';
  try {
    locale = await getLocale();
  } catch {
    locale = cookieStore.get('NEXT_LOCALE')?.value || 'ar';
  }

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
