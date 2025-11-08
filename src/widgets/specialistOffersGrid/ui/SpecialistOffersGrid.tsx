'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { SpecialistGrid } from '@/widgets/specialistGrid';
import { SpecialistLinkActions } from '@/features/specialist/SpecialistLinkActions';
import { useFetchPaginatedOffers } from '../hooks/useFetchPaginatedOffers';
import { useSpecialistOffersGridStore } from '../store/useSpecialistOffersGridStore';
import { ErrorMessage } from '@/shared/components/ErrorMessage';
import { Pagination } from '@/shared/components/Pagination';

export function SpecialistOffersGrid() {
  const { offers, loading, error, page, pagesCount, hasMore } = useSpecialistOffersGridStore();
  const { fetchOffers } = useFetchPaginatedOffers();
  const searchParams = useSearchParams();
  const currentPage = searchParams.get('page') ? parseInt(searchParams.get('page') as string, 10) : 1;

  useEffect(() => {
    const pageChanged = page !== currentPage;
    const isInitialLoad = offers.length === 0 && page === 1;

    if (!loading && !error && (isInitialLoad || pageChanged)) {
      fetchOffers({ page: currentPage });
    }
  }, [currentPage, offers.length, loading, error, page, fetchOffers]);

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <>
      <SpecialistGrid offers={offers} isLoading={loading} specialistCardFooter={(candidate) => <SpecialistLinkActions candidate={candidate} />} />
      <div className="py-4">
        <Pagination page={page} pagesCount={pagesCount} hasMore={hasMore} />
      </div>
    </>
  );
}
