'use client';

import { PageLayout } from '@/shared/components/layout/PageLayout';
import { SpecialistGrid } from '@/widgets/specialistGrid';
import { SpecialistLinkActions } from '@/features/specialist/SpecialistLinkActions';
import { DashboardHeader } from './DashboardHeader';
import { JobSummaryCard } from './JobSummaryCard';
import { useDashboardData } from '../hooks/useDashboardData';
import { SpecialistFilters } from '@/widgets/specialistFilters';

export function Dashboard() {
  const { jobDescription, filteredCandidates, isLoading, router } = useDashboardData();

  return (
    <PageLayout>
      <div className="space-y-8">
        <DashboardHeader candidateCount={filteredCandidates.length} onEditJob={() => router.push('/')} />
        {jobDescription && <JobSummaryCard jobDescription={jobDescription} />}

        {/* Main Content */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <SpecialistFilters />
          </div>

          {/* Candidates Grid */}
          <div className="lg:col-span-3">
            <SpecialistGrid
              candidates={filteredCandidates}
              isLoading={isLoading}
              specialistCardFooter={(candidate) => <SpecialistLinkActions candidate={candidate} />}
            />
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
