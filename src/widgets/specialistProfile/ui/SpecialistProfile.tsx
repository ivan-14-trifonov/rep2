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
import { RequirementsMatchCard } from './RequirementsMatchCard';
import type { Offer, Specialist } from '@imarketplace/types/entities';

interface SpecialistProfileProps {
  candidate: Offer<{ specialist: Specialist }>;
}

export function SpecialistProfile({ candidate }: SpecialistProfileProps) {
  const { t } = useTranslation();
  // Access the specialist data from the offer object
  const specialist = candidate.specialist;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <SpecialistProfileHeader candidate={candidate} />

      <div className="grid md:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="md:col-span-2 space-y-6">
          <MatchAnalysisCard description={candidate.comment || ''} />
          <WorkExperienceCard candidate={candidate} />
          <RequirementsMatchCard candidate={candidate} />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <ContactInfoCard candidate={candidate} />
          <SkillsCard skills={specialist.skills || []} />
          <QuickStatsCard candidate={candidate} />
        </div>
      </div>
    </div>
  );
}
