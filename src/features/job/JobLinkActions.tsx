'use client';

import { useTranslation } from '@/shared/hooks/use-translation';
import { Button } from '@/shared/ui/button';
import { ExternalLink } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useJobStore } from '@/entities/job/hooks/useJobStore';
import type { Job } from '@/types';

interface JobLinkActionsProps {
  job: Job;
}

export function JobLinkActions({ job }: JobLinkActionsProps) {
  const { setSelectedJob } = useJobStore();
  const { t } = useTranslation();
  const router = useRouter();

  const handleViewJob = () => {
    setSelectedJob(job);
    router.push(`/job/${job.id}`);
  };

  return (
    <div className="flex space-x-2">
      <Button className="flex-1" size="sm" onClick={handleViewJob}>
        {t('jobCard.viewDetails')}
      </Button>
      <Button variant="outline" size="sm" asChild>
        <a target="_blank" rel="noopener noreferrer">
          <ExternalLink className="h-4 w-4" />
        </a>
      </Button>
    </div>
  );
}
