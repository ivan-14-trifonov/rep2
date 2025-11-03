'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/shared/hooks/use-translation';
import { useAuth } from '@/shared/hooks/use-auth';
import { mockJobs } from '@/shared/lib/mock-jobs';
import { JobsDashboardLayout } from '@/widgets/jobDashboard/ui/JobsDashboardLayout';

export default function JobsPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (!isAuthenticated && !isLoading) {
    return null;
  }

  return <JobsDashboardLayout />;
}
