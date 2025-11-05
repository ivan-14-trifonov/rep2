import NextAuth from 'next-auth';
import { authOptions } from './auth.config';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  // @ts-ignore todo fix
} = NextAuth(authOptions);
