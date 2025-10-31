'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { SpecialistGrid } from '@/widgets/specialistGrid';
import { SpecialistLinkActions } from '@/features/specialist/SpecialistLinkActions';
import { useFetchPaginatedOffers } from '../hooks/useFetchPaginatedOffers';
import { useSpecialistOffersGridStore } from '../store/useSpecialistOffersGridStore';
import { ErrorMessage } from '@/shared/components/ErrorMessage';
import { LoadingMessage } from '@/shared/components/LoadingMessage';
import { useTranslation } from '@/shared/hooks/use-translation';

export function SpecialistOffersGrid() {
  const { offers, loading, error } = useSpecialistOffersGridStore();
  const { fetchOffers } = useFetchPaginatedOffers();
  const searchParams = useSearchParams();
  const { t } = useTranslation();
  const page = searchParams.get('page') ? parseInt(searchParams.get('page') as string, 10) : 1;

  const fetchedPageRef = useRef<number | null>(null);

  useEffect(() => {
    const pageChanged = fetchedPageRef.current !== page;
    const isInitialLoad = offers.length === 0 && fetchedPageRef.current === null;

    if (!loading && !error && (isInitialLoad || pageChanged)) {
      fetchedPageRef.current = page;
      fetchOffers({ page });
    }
  }, [page, offers.length, loading, error]);

  if (loading) {
    return <LoadingMessage message={t('specialistGrid.loadingCandidates') || 'Please wait while we load the candidates'} />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return <SpecialistGrid candidates={offers} isLoading={loading} specialistCardFooter={(candidate) => <SpecialistLinkActions candidate={candidate} />} />;
}
