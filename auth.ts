import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { Axios } from '@/core/lib/axios';
import { z } from 'zod';
import type { LoginResponse } from '@/features/auth/types';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        phone_number: { label: 'Phone Number', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async credentials => {
        try {
          const { phone_number, password } = await z
            .object({
              phone_number: z.string(),
              password: z.string(),
            })
            .parseAsync(credentials);

          const response = await Axios.post<LoginResponse>('/users/login/', {
            phone_number,
            password,
          });

          const { user, token } = response.data.result;

          if (user && token) {
            console.log('Login successful in authorize, returning user...');
            return {
              ...user,
              id: String(user.id),
              accessToken: token,
            };
          }

          console.error('User or token missing in response result object');
          return null;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          console.error('Authorize catch block - Error Type:', error.constructor.name);
          if (error.response) {
            console.error('Auth Error Response Data:', error.response.data);
            console.error('Auth Error Response Status:', error.response.status);
          } else {
            console.error('Auth Error Message:', error.message || error);
          }
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/signin',
  },
  session: {
    strategy: 'jwt',
  },
  trustHost: true,
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.user = user;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        token.accessToken = (user as any).accessToken;
      }

      if (trigger === 'update' && session?.user && token.user) {
        token.user = { ...token.user, ...session.user };
      }

      return token;
    },
    async session({ session, token }) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((token as any).user) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        session.user = (token as any).user;
      }
      return session;
    },
  },
});
