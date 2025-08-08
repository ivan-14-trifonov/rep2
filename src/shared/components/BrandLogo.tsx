'use client';

import { useTranslation } from '@/shared/hooks/use-translation';
import { BRAND_NAME } from '../constants';
import BRAND_LOGO from './assets/logo.svg';
import Image from 'next/image';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
}

export function BrandLogo({ size = 'md' }: BrandLogoProps) {
  const { t } = useTranslation();

  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      <Image priority src={BRAND_LOGO} alt="Follow us on Twitter" className={sizeClasses[size]} />
      <span className={`font-bold ${size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-3xl' : 'text-2xl'}`}>{BRAND_NAME}</span>
    </div>
  );
}
