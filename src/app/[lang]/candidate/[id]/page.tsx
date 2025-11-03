'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { PageLayout } from '@/shared/components/layout/PageLayout';
import { useAppStore } from '@/shared/lib/store';
import { useTranslation } from '@/shared/hooks/use-translation';
import { mockCandidates } from '@/shared/lib/mock-data';
import { SpecialistProfile } from '@/widgets/specialistProfile';
import { BackButton } from '@/shared/components/BackButton';

export default function CandidatePage() {
  const params = useParams<{ id: string }>();
  const { selectedCandidate, setSelectedCandidate } = useAppStore(); // Remove isAuthenticated from destructure
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
      return;
    }

    // If no selected candidate, try to find by ID
    if (!selectedCandidate) {
      const candidate = mockCandidates.find((c) => c.id === params.id);
      if (candidate) {
        setSelectedCandidate(candidate);
      } else {
        router.push('/dashboard');
      }
    }
  }, [isAuthenticated, isLoading, selectedCandidate, params.id, router, setSelectedCandidate]);

  if (!isAuthenticated && !isLoading) {
    return null;
  }

  if (!selectedCandidate) {
    return null;
  }

  return (
    <PageLayout>
      <div className="space-y-6">
        <BackButton t={t} router={router} />
        <SpecialistProfile candidate={selectedCandidate} />
      </div>
    </PageLayout>
  );
}
