'use client';
import { useTranslation } from '@/shared/hooks/use-translation';
import { Search } from 'lucide-react';
import { SpecialistCard } from '@/widgets/specialistCard/ui/SpecialistCard';
import { SpecialistGridSkeleton } from './SpecialistGridSkeleton';
import type { ReactNode } from 'react';
import type { Offer, Specialist } from '@imarketplace/types/entities';

interface SpecialistGridProps {
  offers: Offer<{ specialist: Specialist }>[];
  isLoading?: boolean;
  specialistCardFooter?: (offer: Offer<{ specialist: Specialist }>) => ReactNode;
}

export function SpecialistGrid({ offers, isLoading, specialistCardFooter }: SpecialistGridProps) {
  const { t } = useTranslation();

  if (isLoading || offers.length === 0) {
    return <SpecialistGridSkeleton />;
  }

  if (offers.length === 0) {
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
      {offers.map((offer) => (
        <SpecialistCard key={offer.id} candidate={offer} footer={specialistCardFooter ? specialistCardFooter(offer) : undefined} />
      ))}
    </div>
  );
}
