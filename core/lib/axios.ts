import axios from 'axios';
import https from 'https';
import { getCookie } from 'cookies-next';
import { getSession } from 'next-auth/react';
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

export const Axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,

  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

Axios.interceptors.response.use(response => {
  response.data = forceHttps(response.data);
  return response;
});

Axios.interceptors.request.use(async config => {
  if (typeof document !== 'undefined') {
    // const pathLocale = window.location.pathname.split('/')[1];
    // const lang = ['ar', 'en'].includes(pathLocale) ? pathLocale : (getCookie('NEXT_LOCALE') as string) || 'ar';
    const lang = await getLocale();

    config.headers['Accept-Language'] = lang;

    const session = await getSession();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (session?.user && (session.user as any).accessToken) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      config.headers['Authorization'] = `token ${(session.user as any).accessToken}`;
    }
  }

  return config;
});
