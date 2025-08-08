'use client';

import { Plus } from 'lucide-react';
import { useTranslation } from '@/shared/hooks/use-translation';
import { Button } from '@ui/button';

interface JobsHeaderProps {
  onPostJob?: () => void;
}

export function JobsHeader({ onPostJob }: JobsHeaderProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
      <div>
        <h1 className="text-3xl font-bold">{t('jobs.title')}</h1>
        <p className="text-muted-foreground">{t('jobs.description')}</p>
      </div>
      <Button onClick={onPostJob}>
        <Plus className="h-4 w-4 mr-2" />
        {t('jobs.postJob')}
      </Button>
    </div>
  );
}
