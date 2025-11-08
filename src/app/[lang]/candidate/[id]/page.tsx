'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { PageLayout } from '@/shared/components/layout/PageLayout';
import { useTranslation } from '@/shared/hooks/use-translation';
import { mockCandidates } from '@/shared/lib/mock-data';
import { SpecialistProfile } from '@/widgets/specialistProfile';
import { BackButton } from '@/shared/components/BackButton';
import { useAppStore } from '@/shared/lib/store';
import type { Candidate } from '@/types';

export default function CandidatePage() {
  const params = useParams<{ id: string }>();
  const { selectedCandidate, setSelectedCandidate } = useAppStore();
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    // Always find and set candidate by the current ID in URL params
    const candidate = mockCandidates.find((c) => c.id === params.id);
    if (candidate) {
      setSelectedCandidate(candidate);
    } else {
      router.push('/candidates');
    }
  }, [params.id, setSelectedCandidate, router]);

  if (!selectedCandidate) {
    return null;
  }

  // Cast to any to pass to SpecialistProfile which expects Offer type
  return (
    <PageLayout>
      <div className="space-y-6">
        <BackButton t={t} router={router} />
        <SpecialistProfile candidate={selectedCandidate as any} />
      </div>
    </PageLayout>
  );
}
