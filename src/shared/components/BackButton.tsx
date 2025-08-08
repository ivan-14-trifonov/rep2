import { Button } from '@ui/button';
import { ArrowLeft } from 'lucide-react';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import type { Ttype } from '@/shared/hooks/use-translation';
import type { ReactNode } from 'react';

interface BackButtonProps {
  t: Ttype;
  router: AppRouterInstance;
}

export function BackButton({ t, router }: BackButtonProps): ReactNode {
  return (
    <Button variant="outline" onClick={() => router.back()} className="flex items-center">
      <ArrowLeft className="h-4 w-4 mr-2" />
      {t('backToResults')}
    </Button>
  );
}
