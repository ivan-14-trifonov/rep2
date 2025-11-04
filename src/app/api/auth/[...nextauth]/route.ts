
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
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
            return {
              id: res.data.user?.id || '1',
              email: credentials?.email || '',
              name: res.data.user?.name || credentials?.email?.split('@')[0] || 'User',
              accessToken: res.data.token 
            };
          }
          return null;
        } catch (e) {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      async profile(profile) {
        return {
          id: profile.sub,
          name: profile.name || profile.email?.split('@')[0] || 'User',
          email: profile.email,
          image: profile.picture
        }
      }
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        try {
          // Check if user exists in our database
          const backendUrl = process.env.BACKEND_URL;
          
          // Try to sign in first to check if user exists
          const signInRes = await axios.post(`${backendUrl}/auth/signin`, {
            email: user.email,
            password: `google:${profile?.sub}`
          });

          if (signInRes.data?.token) {
            // User exists, continue with the session
            return true;
          }
        } catch (signInError) {
          // User doesn't exist, so we'll register them
          try {
            const backendUrl = process.env.BACKEND_URL;
            const registerRes = await axios.post(`${backendUrl}/auth/signup`, {
              email: user.email,
              password: `google:${profile?.sub}`, // Use profile.sub as password with prefix for security
              name: user.name, // Include name if available
            });

            if (registerRes.status === 200 || registerRes.status === 201) {
              // Registration successful, allow sign in
              return true;
            } else {
              return false;
            }
          } catch (registerError) {
            // Registration failed
            console.error('Registration error:', registerError);
            return false;
          }
        }
      }
      return true;
    },
    async jwt({ token, user, account, profile }) {
      // Handle Google provider token update
      if (account && user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;

        // For Google sign in, we need to handle the access token from backend after sign in
        if (account.provider === 'google') {
          try {
            const backendUrl = process.env.BACKEND_URL;
            const res = await axios.post(`${backendUrl}/auth/signin`, {
              email: user.email,
              password: `google:${profile?.sub}`
            });

            if (res.data?.token) {
              token.accessToken = res.data.token;
            }
          } catch (e) {
            console.error('Error getting backend token after Google sign in:', e);
          }
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        email: token.email as string,
        name: token.name as string,
        image: token.picture as string,
      };
      (session as any).accessToken = token.accessToken;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST, authOptions };