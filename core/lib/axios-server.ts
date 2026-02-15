import axios from 'axios';
import { cookies } from 'next/headers';
import https from 'https';
import { auth } from '@/auth';

export const Axios = async () => {
  const cookieStore = await cookies();
  const session = await auth();
  const locale = cookieStore.get('NEXT_LOCALE')?.value || 'en';

  const headers: Record<string, string> = {
    'Accept-Language': locale,
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (session?.user && (session.user as any).accessToken) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    headers['Authorization'] = `token ${(session.user as any).accessToken}`;
  }

  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers,
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
  });
};
