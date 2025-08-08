'use client';

import { useTranslation } from '@/shared/hooks/use-translation';
import { SpecialistProfileHeader } from './SpecialistProfileHeader';
import { MatchAnalysisCard } from './MatchAnalysisCard';
import { ProfessionalSummaryCard } from './ProfessionalSummaryCard';
import { WorkExperienceCard } from './WorkExperienceCard';
import { EducationCard } from './EducationCard';
import { ContactInfoCard } from './ContactInfoCard';
import { SkillsCard } from './SkillsCard';
import { QuickStatsCard } from './QuickStatsCard';
import type { Candidate } from '@/types';

interface SpecialistProfileProps {
  candidate: Candidate;
}

export function SpecialistProfile({ candidate }: SpecialistProfileProps) {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <SpecialistProfileHeader candidate={candidate} />

      <div className="grid md:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="md:col-span-2 space-y-6">
          <MatchAnalysisCard description={candidate.matchDescription} />
          <ProfessionalSummaryCard summary={candidate.summary} />
          <WorkExperienceCard candidate={candidate} />
          <EducationCard educations={candidate.education} />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <ContactInfoCard candidate={candidate} />
          <SkillsCard skills={candidate.skills} />
          <QuickStatsCard candidate={candidate} />
        </div>
      </div>
    </div>
  );
}
