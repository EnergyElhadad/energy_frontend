import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { Axios } from "@/core/lib/axios";
import { z } from "zod";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        phone_number: { label: "Phone Number", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const { phone_number, password } = await z
            .object({
              phone_number: z.string(),
              password: z.string(),
            })
            .parseAsync(credentials);

          const response = await Axios.post("/users/login", {
            phone_number,
            password,
          });

          const user = response.data.user;
          const token = response.data.token;

          if (user && token) {
            return {
              ...user,
              accessToken: token,
            };
          }
          return null;
        } catch (error) {
          console.error("Auth Error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        token.accessToken = (user as any).accessToken;
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
