'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Briefcase, TrendingUp, MapPin } from 'lucide-react';
import { useTranslation } from '@/shared/hooks/use-translation';
import { useJobStore } from '@/entities/job/hooks/useJobStore';
import { useUIStore } from '@/shared/hooks/useUIStore';
import { mockJobs } from '@/shared/lib/mock-jobs';
import { PageLayout } from '@/shared/components/layout/PageLayout';
import { Button } from '@ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@ui/card';
import { Badge } from '@ui/badge';
import { JobGrid } from '@/entities/job/JobGrid';
import { JobLinkActions } from '@/features/job';
import { JobFilters } from '@/widgets/jobFilters';

export default function JobsPage() {
  const { filteredJobs, setJobs } = useJobStore();
  const { isLoading, setLoading } = useUIStore();
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    // if (!isAuthenticated) {
    //   router.push('/login');
    //   return;
    // }

    // Simulate loading jobs
    const loadJobs = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 5));
      setJobs(mockJobs);
      setLoading(false);
    };

    if (mockJobs.length === 0 || filteredJobs.length === 0) {
      loadJobs();
    }
  }, [isAuthenticated, router, setJobs, setLoading, filteredJobs.length]);

  // if (!isAuthenticated) {
  //   return null;
  // }

  const totalJobs = mockJobs.length;
  const openJobs = mockJobs.filter((job) => job.status === 'Open').length;
  const remoteJobs = mockJobs.filter((job) => job.remote).length;

  return (
    <PageLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-3xl font-bold">{t('jobs.title')}</h1>
            <p className="text-muted-foreground">{t('jobs.description')}</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            {t('jobs.postJob')}
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Briefcase className="h-8 w-8 text-primary" />
                <div>
                  <div className="text-2xl font-bold">{totalJobs}</div>
                  <div className="text-sm text-muted-foreground">{t('jobs.totalJobs')}</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-8 w-8 text-green-600" />
                <div>
                  <div className="text-2xl font-bold">{openJobs}</div>
                  <div className="text-sm text-muted-foreground">{t('jobs.openPositions')}</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <MapPin className="h-8 w-8 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold">{remoteJobs}</div>
                  <div className="text-sm text-muted-foreground">{t('jobs.remoteJobs')}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Featured Jobs */}
        <Card>
          <CardHeader>
            <CardTitle>{t('jobs.featuredOpportunities')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">{t('jobs.seniorPositions')}</Badge>
              <Badge variant="outline">{t('jobs.remoteWork')}</Badge>
              <Badge variant="outline">{t('jobs.techCompanies')}</Badge>
              <Badge variant="outline">{t('jobs.competitiveSalary')}</Badge>
              <Badge variant="outline">{t('jobs.greatBenefits')}</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <JobFilters />
          </div>

          {/* Jobs Grid */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  {filteredJobs.length} {t('jobs.jobsFound')}
                </h2>
                <div className="text-sm text-muted-foreground">{t('jobs.sortedByRelevance')}</div>
              </div>
            </div>
            <JobGrid jobs={filteredJobs} isLoading={isLoading} jobCardFooter={(job) => <JobLinkActions job={job} />} />
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
