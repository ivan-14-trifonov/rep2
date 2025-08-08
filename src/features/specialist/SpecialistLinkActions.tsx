'use client';

import { useTranslation } from '@/shared/hooks/use-translation';
import { Button } from '@/shared/ui/button';
import { ExternalLink, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/shared/lib/store';
import type { Candidate } from '@/types';

interface SpecialistLinkActionsProps {
  candidate: Candidate;
}

export function SpecialistLinkActions({ candidate }: SpecialistLinkActionsProps) {
  const router = useRouter();
  const { setSelectedCandidate } = useAppStore();
  const { t } = useTranslation();

  const handleViewProfile = () => {
    // TODO: only redirect on url and id
    setSelectedCandidate(candidate);
    router.push(`/candidate/${candidate.id}`);
  };

  return (
    <div className="flex space-x-2">
      <Button onClick={handleViewProfile} className="flex-1" size="sm">
        {t('candidateCard.viewProfile')}
      </Button>
      <Button variant="outline" size="sm" asChild>
        <a href={`mailto:${candidate.email}`}>
          <Mail className="h-4 w-4" />
        </a>
      </Button>
      <Button variant="outline" size="sm" asChild>
        <a href={candidate.linkedin} target="_blank" rel="noopener noreferrer">
          <ExternalLink className="h-4 w-4" />
        </a>
      </Button>
    </div>
  );
}
