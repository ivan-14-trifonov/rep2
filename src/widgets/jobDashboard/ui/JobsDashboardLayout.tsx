'use client';

import { StatsCards } from './StatsCards';
import { FeaturedJobsCard } from './FeaturedJobsCard';
import { JobsContent } from './JobsContent';
import { useJobsData } from '../hooks/useJobsData';
import { PageLayout } from '@/shared/components/layout/PageLayout';
import { JobsHeader } from './JobsHeader';

export function JobsDashboardLayout() {
  const { filteredJobs, isLoading, totalJobs, openJobs, remoteJobs } = useJobsData();

  return (
    <PageLayout>
      <div className="space-y-8">
        {/* Header */}
        <JobsHeader />

        {/* Stats Cards */}
        <StatsCards totalJobs={totalJobs} openJobs={openJobs} remoteJobs={remoteJobs} />

        {/* Featured Jobs */}
        <FeaturedJobsCard />

        {/* Main Content */}
        <JobsContent jobs={filteredJobs} isLoading={isLoading} jobCount={filteredJobs.length} />
      </div>
    </PageLayout>
  );
}
