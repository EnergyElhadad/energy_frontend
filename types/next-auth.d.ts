import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      first_name?: string | null;
      last_name?: string | null;
      phone_number?: string | null;
      accessToken?: string;
    } & DefaultSession["user"];
  }

  interface User {
    first_name?: string | null;
    last_name?: string | null;
    phone_number?: string | null;
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
  }
}
