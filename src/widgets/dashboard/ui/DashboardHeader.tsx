'use client';

import { Edit } from 'lucide-react';
import { useTranslation } from '@/shared/hooks/use-translation';
import { Button } from '@ui/button';

interface DashboardHeaderProps {
  candidateCount: number;
  onEditJob: () => void;
}

export function DashboardHeader({ candidateCount, onEditJob }: DashboardHeaderProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
      <div>
        <h1 className="text-3xl font-bold">{t('dashboard.candidateSearchResults')}</h1>
        <p className="text-muted-foreground">{t('dashboard.foundCandidates', { count: candidateCount })}</p>
      </div>
      <Button variant="outline" onClick={onEditJob}>
        <Edit className="h-4 w-4 mr-2" />
        {t('dashboard.editJobDescription')}
      </Button>
    </div>
  );
}
