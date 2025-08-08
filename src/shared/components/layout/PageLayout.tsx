'use client';

import { cn } from '@/shared/lib/utils';
import { Header } from './Header';
import type { ReactNode } from 'react';

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

export function PageLayout({ children, className, maxWidth = 'xl' }: PageLayoutProps) {
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-7xl',
    '2xl': 'max-w-2xl',
    full: 'max-w-full',
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className={cn('container mx-auto px-4 py-8', maxWidthClasses[maxWidth], className)}>{children}</main>
    </div>
  );
}
