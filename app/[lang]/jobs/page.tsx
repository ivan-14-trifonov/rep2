'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PageLayout } from '@/components/layout/PageLayout';
import { JobGrid } from '@/components/jobs/JobGrid';
import { JobFilters } from '@/components/jobs/JobFilters';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Briefcase, TrendingUp, MapPin } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { mockJobs } from '@/lib/mock-jobs';

export default function JobsPage() {
  const { 
    isAuthenticated, 
    filteredJobs, 
    setJobs, 
    isLoading, 
    setLoading 
  } = useAppStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    // Simulate loading jobs
    const loadJobs = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setJobs(mockJobs);
      setLoading(false);
    };

    if (mockJobs.length === 0 || filteredJobs.length === 0) {
      loadJobs();
    }
  }, [isAuthenticated, router, setJobs, setLoading, filteredJobs.length]);

  if (!isAuthenticated) {
    return null;
  }

  const totalJobs = mockJobs.length;
  const openJobs = mockJobs.filter(job => job.status === 'Open').length;
  const remoteJobs = mockJobs.filter(job => job.remote).length;

  return (
    <PageLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-3xl font-bold">Job Opportunities</h1>
            <p className="text-muted-foreground">
              Discover your next career opportunity from our curated job listings
            </p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Post a Job
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
                  <div className="text-sm text-muted-foreground">Total Jobs</div>
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
                  <div className="text-sm text-muted-foreground">Open Positions</div>
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
                  <div className="text-sm text-muted-foreground">Remote Jobs</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Featured Jobs */}
        <Card>
          <CardHeader>
            <CardTitle>Featured Opportunities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">Senior Positions</Badge>
              <Badge variant="outline">Remote Work</Badge>
              <Badge variant="outline">Tech Companies</Badge>
              <Badge variant="outline">Competitive Salary</Badge>
              <Badge variant="outline">Great Benefits</Badge>
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
                  {filteredJobs.length} Job{filteredJobs.length !== 1 ? 's' : ''} Found
                </h2>
                <div className="text-sm text-muted-foreground">
                  Sorted by relevance
                </div>
              </div>
            </div>
            <JobGrid jobs={filteredJobs} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </PageLayout>
  );
}