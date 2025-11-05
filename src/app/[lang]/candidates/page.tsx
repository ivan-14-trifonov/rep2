'use client';

import { useAppStore } from '@/shared/lib/store';
import { useAuth } from '@/shared/hooks/use-auth';
import { Dashboard } from '@/widgets/dashboard/ui';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { jobDescription } = useAppStore();
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

  if (!jobDescription) {
    return null;
  }

  return <Dashboard />;
}
