'use client';

import { useTranslation } from '@/shared/hooks/use-translation';
import { JobProfileHeader } from './JobProfileHeader';
import { JobDescriptionCard } from './JobDescriptionCard';
import { RequirementsCard } from './RequirementsCard';

import { JobDetailsCard } from './JobDetailsCard';
import { RequiredSkillsCard } from './RequiredSkillsCard';
import { CompanyInfoCard } from './CompanyInfoCard';
import { ApplyCard } from './ApplyCard';
import type { Job } from '@imarketplace/types/entities';

interface JobProfileProps {
  job: Job;
}

export function JobProfile({ job }: JobProfileProps) {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <JobProfileHeader job={job} />

      <div className="grid md:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="md:col-span-2 space-y-6">
          <JobDescriptionCard job={job} />
          <RequirementsCard requirements={job.requirements} />

        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <JobDetailsCard job={job} />
          <RequiredSkillsCard skills={job.requiredSkills} />
          <CompanyInfoCard job={job} />
          <ApplyCard />
        </div>
      </div>
    </div>
  );
}
