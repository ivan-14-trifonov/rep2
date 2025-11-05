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

export default async function RootLayout({ children, params }: { children: ReactNode; params: any }) {
  // params in Next's generated types can be a Promise or an object depending on context
  const resolvedParams = typeof params?.then === 'function' ? await params : params;
  const lang = resolvedParams?.lang ?? 'en';
  const dictionary = await getDictionary(lang as 'en' | 'ru');

  return (
    <html lang={lang}>
      <body className={inter.className}>
        <AuthProvider>
          <ClientLayout lang={lang} dictionary={dictionary}>
            {children}
          </ClientLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
