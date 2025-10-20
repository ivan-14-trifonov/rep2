import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/shared/lib/store';
import { mockCandidates } from '@/shared/lib/mock-data';

export const useDashboardData = () => {
  const { isAuthenticated, jobDescription, filteredCandidates, setCandidates, isLoading, setLoading } = useAppStore();
  const router = useRouter();

  useEffect(() => {
    // Simulate loading candidates
    const loadCandidates = async () => {
      // If there are no mock candidates, nothing to do.
      if (mockCandidates.length === 0) return;

      // Always (re)load mocks on mount to ensure the UI reflects current mock data.
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 5));
      setCandidates(mockCandidates);
      setLoading(false);
    };

    loadCandidates();
  }, [setCandidates, setLoading, filteredCandidates.length]);

  return {
    jobDescription,
    filteredCandidates,
    isLoading,
    router,
  };
};
