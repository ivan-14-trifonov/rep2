import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/shared/lib/store';
import { mockCandidates } from '@/shared/lib/mock-data';

export const useDashboardData = () => {
  const { isAuthenticated, jobDescription, filteredCandidates, setCandidates, isLoading, setLoading } = useAppStore();
  const router = useRouter();

  useEffect(() => {
    if (!jobDescription) {
      router.push('/');
      return;
    }

    // Simulate loading candidates
    const loadCandidates = async () => {
      if (mockCandidates.length > 0 && filteredCandidates.length > 0) return;

      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 5));
      setCandidates(mockCandidates);
      setLoading(false);
    };

    loadCandidates();
  }, [jobDescription, router, setCandidates, setLoading, filteredCandidates.length]);

  return {
    jobDescription,
    filteredCandidates,
    isLoading,
    router,
  };
};
