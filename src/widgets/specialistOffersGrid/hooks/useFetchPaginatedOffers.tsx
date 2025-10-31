import { apiController } from '@/shared/api/ApiContainer';
import { useSpecialistOffersGridStore } from '../store/useSpecialistOffersGridStore';

export const useFetchPaginatedOffers = () => {
  const { setOffers, setLoading, setError } = useSpecialistOffersGridStore();

  const fetchOffers = (params: { page: number }) => {
    setLoading(true);
    setError(null);

    return apiController.offers
      .getPaginatedOffers(params.page)
      .then((response) => {
        setOffers(response.offers);
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
