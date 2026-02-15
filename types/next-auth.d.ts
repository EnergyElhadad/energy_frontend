import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string;
      phone_number: string;
      full_name: string;
      email: string;
      preferred_language: 'ar' | 'en';
      accessToken?: string;
    } & DefaultSession['user'];
  }

  interface User {
    id: string;
    phone_number: string;
    full_name: string;
    email: string;
    preferred_language: 'ar' | 'en';
    accessToken?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    user?: User;
  }
}
