'use client';

import { useAppStore } from '@/shared/lib/store';
import { Dashboard } from '@/widgets/dashboard/ui';

export default function CandidatesPage() {
  const { jobDescription } = useAppStore();

  if (!jobDescription) {
    return null;
  }

  return <Dashboard />;
}
