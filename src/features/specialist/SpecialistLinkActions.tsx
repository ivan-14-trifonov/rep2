'use client';

import { useTranslation } from '@/shared/hooks/use-translation';
import { Button } from '@/shared/ui/button';
import { ExternalLink, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCandidateStore } from '@/entities/candidate/hooks/useCandidateStore';
import type { Candidate } from '@/types';

interface SpecialistLinkActionsProps {
  candidate: Candidate;
}

export function SpecialistLinkActions({ candidate }: SpecialistLinkActionsProps) {
  const router = useRouter();
  const { setSelectedCandidate } = useCandidateStore();
  const { t } = useTranslation();

  const handleViewProfile = () => {
    // TODO: only redirect on url and id
    setSelectedCandidate(candidate);
    router.push(`/candidate/${candidate.id}`);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 w-full">
      <Button onClick={handleViewProfile} className="flex-1 min-w-0 h-auto px-3 py-2" size="sm">
        <span className="text-center leading-tight whitespace-normal">{t('candidateCard.viewProfile')}</span>
      </Button>
      <Button className="flex-1 min-w-0 h-auto px-3 py-2" size="sm" onClick={() => {}}>
        <span className="text-center leading-tight whitespace-normal">{t('candidateCard.viewResume')}</span>
      </Button>
    </div>
  );
}
