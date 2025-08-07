'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PageLayout } from '@/components/layout/PageLayout';
import { SpecialistGrid } from '@/components/candidates/SpecialistGrid';
import { SearchFilters } from '@/components/search/SearchFilters';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, MapPin, Building, Users } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { mockCandidates } from '@/lib/mock-data';
import { useTranslation } from '@/hooks/use-translation';

export default function DashboardPage() {
  const { isAuthenticated, jobDescription, filteredCandidates, setCandidates, isLoading, setLoading } = useAppStore();
  const router = useRouter();
  const { t } = useTranslation();

  console.log('jobDescription', jobDescription, !jobDescription);
  useEffect(() => {
    // if (!isAuthenticated) {
    //   router.push('/login');
    //   return;
    // }

    if (!jobDescription) {
      router.push('/');
      return;
    }

    // Simulate loading candidates
    const loadCandidates = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setCandidates(mockCandidates);
      setLoading(false);
    };

    if (mockCandidates.length === 0 || filteredCandidates.length === 0) {
      loadCandidates();
    }
  }, [isAuthenticated, jobDescription, router, setCandidates, setLoading, filteredCandidates.length]);

  // if (!isAuthenticated || !jobDescription) {
  //   return null;
  // }

  if (!jobDescription) {
    return null;
  }

  return (
    <PageLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-3xl font-bold">{t('dashboard.candidateSearchResults')}</h1>
            <p className="text-muted-foreground">{t('dashboard.foundCandidates', { count: filteredCandidates.length })}</p>
          </div>
          <Button variant="outline" onClick={() => router.push('/')}>
            <Edit className="h-4 w-4 mr-2" />
            {t('dashboard.editJobDescription')}
          </Button>
        </div>

        {/* Job Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building className="h-5 w-5 mr-2" />
              {t('dashboard.jobSummary')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-4">
                <h3 className="text-lg font-semibold">{jobDescription.title}</h3>
                <Badge variant="secondary">{jobDescription.company}</Badge>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  {jobDescription.location}
                </div>
              </div>

              {jobDescription.skills.length > 0 && (
                <div className="space-y-2">
                  <div className="text-sm font-medium">{t('dashboard.requiredSkills')}</div>
                  <div className="flex flex-wrap gap-2">
                    {jobDescription.skills.map((skill) => (
                      <Badge key={skill} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <SearchFilters />
          </div>

          {/* Candidates Grid */}
          <div className="lg:col-span-3">
            <SpecialistGrid candidates={filteredCandidates} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
