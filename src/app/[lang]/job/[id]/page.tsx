'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAppStore } from '@/shared/lib/store';
import { useTranslation } from '@/shared/hooks/use-translation';
import { PageLayout } from '@/shared/components/layout/PageLayout';
import { mockJobs } from '@/shared/lib/mock-jobs';
import { JobProfile } from '@/widgets/jobProfile';
import { BackButton } from '@/shared/components/BackButton';

export default function JobPage() {
  const params = useParams<{ id: string }>();
  const { isAuthenticated, selectedJob, setSelectedJob } = useAppStore();
  const router = useRouter();

  useEffect(() => {
    // if (!isAuthenticated) {
    //   router.push('/login');
    //   return;
    // }

    // If no selected job, try to find by ID
    if (!selectedJob) {
      const job = mockJobs.find((j) => j.id === params.id);
      if (job) {
        setSelectedJob(job);
      } else {
        router.push('/jobs');
      }
    }
  }, [isAuthenticated, selectedJob, params.id, router, setSelectedJob]);

  // if (!isAuthenticated || !selectedJob) {
  //   return null;
  // }

  if (!selectedJob) {
    return null;
  }

  const { t } = useTranslation();

  return (
    <PageLayout>
      <div className="space-y-6">
        <BackButton router={router} t={t} />
        <JobProfile job={selectedJob} />
      </div>
    </PageLayout>
  );
}
