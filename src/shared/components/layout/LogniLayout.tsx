'use client';
import { useTranslation } from '@/shared/hooks/use-translation';
import { BrandLogo } from '../BrandLogo';
import type { ReactNode } from 'react';

export function LoginLayout({ children }: { children?: ReactNode }) {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <BrandLogo />
          <p className="text-muted-foreground">{t('login.slogan')}</p>
        </div>

        {/* Login Form */}
        {children && children}

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          <p>{t('login.copyright')}</p>
        </div>
      </div>
    </div>
  );
}
