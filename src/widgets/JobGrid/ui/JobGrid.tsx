'use client';

import { JobCard } from './JobCard';
import { useTranslation } from '@/shared/hooks/use-translation';
import { Briefcase } from 'lucide-react';
import { JobGridSkeleton } from './JobGridSkeleton';
import type { ReactNode } from 'react';
import type { Job } from '@imarketplace/types/entities';

interface JobGridProps {
  jobs: Job[];
  isLoading?: boolean;
  jobCardFooter?: (job: Job) => ReactNode;
}

export function JobGrid({ jobs, isLoading, jobCardFooter }: JobGridProps) {
  const { t } = useTranslation();

  if (isLoading) {
    return <JobGridSkeleton />;
  }

  if (jobs.length === 0) {
    return (
      <div className="text-center py-12">
        <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-muted-foreground mb-2">{t('jobs.noJobsFound')}</h3>
        <p className="text-muted-foreground">{t('jobs.tryAdjustingSearch')}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} footer={jobCardFooter ? jobCardFooter(job) : undefined} />
      ))}
    </div>
  );
}
