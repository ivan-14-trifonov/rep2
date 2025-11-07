'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { PageLayout } from '@/shared/components/layout/PageLayout';
import { useTranslation } from '@/shared/hooks/use-translation';
import { mockCandidates } from '@/shared/lib/mock-data';
import { SpecialistProfile } from '@/widgets/specialistProfile';
import { BackButton } from '@/shared/components/BackButton';
import { useAppStore } from '@/shared/lib/store';

export default function CandidatePage() {
  const params = useParams<{ id: string }>();
  const { selectedCandidate, setSelectedCandidate } = useAppStore();
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    // If no selected candidate, try to find by ID
    if (!selectedCandidate) {
      const candidate = mockCandidates.find((c) => c.id === params.id);
      if (candidate) {
        setSelectedCandidate(candidate);
      } else {
        router.push('/candidates');
      }
    }
  }, [selectedCandidate, params.id, router, setSelectedCandidate]);

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
