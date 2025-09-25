import '../globals.css';
import { Inter } from 'next/font/google';
import { getDictionary } from './dictionaries';
import { ClientLayout } from '@/shared/components/layout/ClientLayout';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { BRAND_NAME } from '@/shared/constants';
import AuthProvider from '../AuthProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: `${BRAND_NAME} - Smart Candidate Search Platform`,
  description: 'Find the perfect candidates for your team with AI-powered matching technology.',
};

export default async function RootLayout({ children, params: promissedParams }: { children: ReactNode; params: Promise<{ lang: 'en' | 'ru' }> }) {
  const params = await promissedParams;
  const dictionary = await getDictionary(params.lang);

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ClientLayout dictionary={dictionary}>{children}</ClientLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
