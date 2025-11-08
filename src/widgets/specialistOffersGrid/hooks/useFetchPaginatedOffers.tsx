import { useSpecialistOffersGridStore } from '../store/useSpecialistOffersGridStore';
import { useApiContainer } from '@/shared/hooks/useApiContainer';
import type { getPaginatedOffersResult } from '@imarketplace/types/contracts/offer-contract';

export const useFetchPaginatedOffers = () => {
  const { setPaginatedResult, setLoading, setError } = useSpecialistOffersGridStore();
  const apiController = useApiContainer();

  const fetchOffers = async (params: { page: number }) => {
    setLoading(true);
    setError(null);

    return apiController.offers
      .getPaginatedOffers(params.page)
      .then((response: getPaginatedOffersResult) => {
        setPaginatedResult(response);
      })
      .catch((error) => {
        if (error instanceof Error) {
          setError({ code: 'UNKNOWN', message: error.message });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { fetchOffers };
};
