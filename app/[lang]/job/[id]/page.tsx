'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { PageLayout } from '@/components/layout/PageLayout';
import { JobProfile } from '@/components/jobs/JobProfile';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { mockJobs } from '@/lib/mock-jobs';
import { useTranslation } from '@/hooks/use-translation';

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
        {/* Back Button */}
        <Button variant="outline" onClick={() => router.back()} className="flex items-center">
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t('backToResults')}
        </Button>

        {/* Job Profile */}
        <JobProfile job={selectedJob} />
      </div>
    </PageLayout>
  );
}
