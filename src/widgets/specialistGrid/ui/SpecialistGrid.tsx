'use client';
import { useTranslation } from '@/shared/hooks/use-translation';
import { Search } from 'lucide-react';
import { SpecialistCard } from '@/widgets/specialistCard/ui/SpecialistCard';
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

  const normalizeScore = (c: any) => {
    // Use only candidate.matched as the single source of truth (0..1) -> percent
    return typeof c.matched === 'number' ? Math.round(c.matched * 100) : undefined;
  };

  const visibleCandidates = candidates
    .filter((c) => {
      const score = normalizeScore(c);
      // enforce hard minimum of 50%: exclude candidates without numeric score or with score < 50
      return typeof score === 'number' ? score >= 50 : false;
    })
    .sort((a, b) => (normalizeScore(b) ?? 0) - (normalizeScore(a) ?? 0));

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
