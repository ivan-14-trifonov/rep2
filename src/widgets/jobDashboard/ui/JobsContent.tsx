'use client';

import { JobLinkActions } from '@/features/job';
import { useTranslation } from '@/shared/hooks/use-translation';
import { JobFilters } from '@/widgets/jobFilters';
import { JobGrid } from '@/widgets/JobGrid';

import type { Job } from '@imarketplace/types/entities';

interface JobsContentProps {
  jobs: Job[];
  isLoading: boolean;
  jobCount: number;
}

export function JobsContent({ jobs, isLoading, jobCount }: JobsContentProps) {
  const { t } = useTranslation();

  return (
    <div className="grid lg:grid-cols-4 gap-8">
      {/* Filters Sidebar */}
      <div className="lg:col-span-1">
        <JobFilters />
      </div>

      {/* Jobs Grid */}
      <div className="lg:col-span-3">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              {jobCount} {t('jobs.jobsFound')}
            </h2>
            <div className="text-sm text-muted-foreground">{t('jobs.sortedByRelevance')}</div>
          </div>
        </div>
        <JobGrid jobs={jobs} isLoading={isLoading} jobCardFooter={(job) => <JobLinkActions job={job} />} />
      </div>
    </div>
  );
}
