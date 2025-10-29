import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/shared/hooks/useAuthStore';
import { useCandidateStore } from '@/entities/candidate/hooks/useCandidateStore';
import { useUIStore } from '@/shared/hooks/useUIStore';
import { mockCandidates } from '@/shared/lib/mock-data';

export const useDashboardData = () => {
  const { isAuthenticated, jobDescription } = useAuthStore();
  const { filteredCandidates, setCandidates } = useCandidateStore();
  const { isLoading, setLoading } = useUIStore();
  const router = useRouter();

  useEffect(() => {
    // Simulate loading candidates
    const loadCandidates = async () => {
      // If there are no mock candidates, nothing to do.
      if (mockCandidates.length > 0 && filteredCandidates.length > 0) return;

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
