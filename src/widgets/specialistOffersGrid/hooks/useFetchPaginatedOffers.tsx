import { apiController } from '@/shared/api/ApiContainer';
import { useSpecialistOffersGridStore } from '../store/useSpecialistOffersGridStore';
import type { getPaginatedOffersResult } from '@imarketplace/types/contracts/offer-contract';

export const useFetchPaginatedOffers = () => {
  const { setPaginatedResult, setLoading, setError } = useSpecialistOffersGridStore();

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
          // @ts-ignore
          setError({ code: error.code || 'UNKNOWN', message: error.message, name: error.name });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { fetchOffers };
};
