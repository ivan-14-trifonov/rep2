import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/shared/lib/store';
import { mockJobs } from '@/shared/lib/mock-jobs';

export const useJobsData = () => {
  const { filteredJobs, setJobs, isLoading, setLoading } = useAppStore();
  const router = useRouter();

  useEffect(() => {
    // Simulate loading jobs
    const loadJobs = async () => {
      if (mockJobs.length > 0 && filteredJobs.length > 0) return;

      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 5));
      setJobs(mockJobs);
      setLoading(false);
    };

    loadJobs();
  }, [setJobs, setLoading, filteredJobs.length]);

  const totalJobs = mockJobs.length;
  const openJobs = mockJobs.filter((job) => job.status === 'Open').length;
  const remoteJobs = mockJobs.filter((job) => job.remote).length;

  return {
    filteredJobs,
    isLoading,
    totalJobs,
    openJobs,
    remoteJobs,
    router,
  };
};
