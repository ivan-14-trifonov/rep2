import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import axios from 'axios';
import { basePath } from '../next.config';

const backendUrl = process.env.BACKEND_URL;

export const authOptions: NextAuthOptions = {
  basePath: '/api/auth',
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        console.log('authorize credentials', credentials);
        try {
          const res = await axios.post(`${backendUrl}/auth/signin`, {
            email: credentials?.email,
            password: credentials?.password,
          });

          console.log('authorize response', res.data);

          if (res.data?.token) {
            return {
              id: res.data.user?.id || '1',
              email: credentials?.email || '',
              name: res.data.user?.name || credentials?.email?.split('@')[0] || 'User',
              accessToken: res.data.token,
            };
          }
          return null;
        } catch (e) {
          console.error('authorize error', e);
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
          image: profile.picture,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        try {
          const backendUrl = process.env.BACKEND_URL;
          const signInRes = await axios.post(`${backendUrl}/auth/signin`, {
            email: user.email,
            password: `google:${profile?.sub}`,
          });

          if (signInRes.data?.token) {
            return true;
          }
        } catch (signInError) {
          try {
            const backendUrl = process.env.BACKEND_URL;
            const registerRes = await axios.post(`${backendUrl}/auth/signup`, {
              email: user.email,
              password: `google:${profile?.sub}`,
              name: user.name,
            });

            if (registerRes.status === 200 || registerRes.status === 201) {
              return true;
            } else {
              return false;
            }
          } catch (registerError) {
            console.error('Registration error:', registerError);
            return false;
          }
        }
      }
      return true;
    },
    async jwt({ token, user, account, profile }) {
      if (account && user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;

        // For credentials provider
        if (account.provider === 'credentials' && 'accessToken' in user) {
          token.accessToken = user.accessToken;
        }

        // For Google provider
        if (account.provider === 'google') {
          try {
            const backendUrl = process.env.BACKEND_URL;
            const res = await axios.post(`${backendUrl}/auth/signin`, {
              email: user.email,
              password: `google:${profile?.sub}`,
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
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
};
