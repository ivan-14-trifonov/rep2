'use client';
import { useTranslation } from '@/shared/hooks/use-translation';
import { Search } from 'lucide-react';
import { SpecialistCard } from '@/entities/specialist/SpecialistCard/ui/SpecialistCard';
import type { ReactNode } from 'react';
import type { Candidate } from '@/types';
import { SpecialistGridSkeleton } from './SpecialistGridSkeleton';

interface SpecialistGridProps {
  candidates: Candidate[];
  isLoading?: boolean;
  specialistCardFooter?: (candidate: Candidate) => ReactNode;
}

export function SpecialistGrid({ candidates, isLoading, specialistCardFooter }: SpecialistGridProps) {
  const { t } = useTranslation();
  if (isLoading) {
    return <SpecialistGridSkeleton />;
  }

  const visibleCandidates = candidates
    .filter((c) => (typeof c.matchScore === 'number' ? c.matchScore >= 50 : true))
    .sort((a, b) => (b.matchScore ?? 0) - (a.matchScore ?? 0));

  if (visibleCandidates.length === 0) {
    return (
      <div className="text-center py-12">
        <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-muted-foreground mb-2">{t('specialistGrid.noCandidatesFound')}</h3>
        <p className="text-muted-foreground">{t('specialistGrid.tryAdjustingSearch')}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {visibleCandidates.map((candidate) => (
        <SpecialistCard key={candidate.id} candidate={candidate} footer={specialistCardFooter ? specialistCardFooter(candidate) : undefined} />
      ))}
    </div>
  );
}
