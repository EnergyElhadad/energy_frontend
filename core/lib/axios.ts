import axios from 'axios';
import https from 'https';
import { getCookie } from 'cookies-next';
import { getSession } from 'next-auth/react';

export const Axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,

  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

Axios.interceptors.request.use(async config => {
  if (typeof document !== 'undefined') {
    const cookieLang = getCookie('NEXT_LOCALE');

    const lang = cookieLang || document.documentElement.lang || 'en';

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
