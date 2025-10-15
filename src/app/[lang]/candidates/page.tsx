'use client';

import { useAppStore } from '@/shared/lib/store';
import { Dashboard } from '@/widgets/dashboard/ui';

export default function DashboardPage() {
  const { jobDescription } = useAppStore();

  return <Dashboard />;
}
