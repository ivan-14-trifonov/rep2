'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Edit, MapPin, Building, Users } from 'lucide-react';
import { useAppStore } from '@/shared/lib/store';
import { useTranslation } from '@/shared/hooks/use-translation';
import { mockCandidates } from '@/shared/lib/mock-data';
import { PageLayout } from '@/shared/components/layout/PageLayout';
import { Button } from '@ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@ui/card';
import { Badge } from '@ui/badge';
import { SpecialistGrid } from '@/entities/specialist/SpecialistGrid';
import { SpecialistLinkActions } from '@/features/specialist/SpecialistLinkActions';
import { SpecialistFilters } from '@/widgets/specialistFilters';
import { Dashboard } from '@/widgets/dashboard/ui';

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

  return <Dashboard />;
}
