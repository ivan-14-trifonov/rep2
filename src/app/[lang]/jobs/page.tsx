'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/shared/hooks/use-translation';

import { mockJobs } from '@/shared/lib/mock-jobs';
import { JobsDashboardLayout } from '@/widgets/jobDashboard/ui/JobsDashboardLayout';

export default function JobsPage() {
  // if (!isAuthenticated) {
  //   return null;
  // }

  return <JobsDashboardLayout />;
}
