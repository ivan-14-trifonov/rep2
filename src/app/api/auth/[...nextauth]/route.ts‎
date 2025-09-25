
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { JWT } from "next-auth/jwt";

const backendUrl = process.env.BACKEND_URL;

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await axios.post(`${backendUrl}/auth/signin`, {
            email: credentials?.email,
            password: credentials?.password,
          });

          if (res.data?.token) {
            return { accessToken: res.data.token };
          }
          return null;
        } catch (e) {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user && typeof user === "object") {
        token.accessToken = (user as any).accessToken;
        token.id = (user as any).id;
        token.email = (user as any).email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.accessToken) {
        session.user = {
          id: token.id as string,
          email: token.email as string,
        } as any;
        (session as any).accessToken = token.accessToken;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST, authOptions };