'use client';

import { useAuthStore } from '@/shared/hooks/useAuthStore';
import { Dashboard } from '@/widgets/dashboard/ui';

export default function DashboardPage() {
  const { jobDescription } = useAuthStore();

  return <Dashboard />;
}
