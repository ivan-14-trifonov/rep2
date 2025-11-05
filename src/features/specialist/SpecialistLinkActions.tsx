'use client';

import { useTranslation } from '@/shared/hooks/use-translation';
import { Button } from '@/shared/ui/button';
import { Briefcase } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/ui/tooltip';
import type { Offer, Specialist } from '@imarketplace/types/entities';
import Link from 'next/link';

interface SpecialistLinkActionsProps {
  candidate: Offer<{ specialist: Specialist }>;
}

export function SpecialistLinkActions({ candidate }: SpecialistLinkActionsProps) {
  const router = useRouter();
  const { t } = useTranslation();

  const handleViewProfile = () => {
    // TODO: only redirect on url and id
    // setSelectedCandidate(candidate);
    router.push(`/candidate/${candidate.id}`);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 w-full">
      <Button onClick={handleViewProfile} className="flex-1 min-w-0 h-auto px-3 py-2" size="sm">
        <span className="text-center leading-tight whitespace-normal">{t('candidateCard.viewProfile')}</span>
      </Button>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm" asChild>
              <Link href={`/candidate/${candidate.id}`} target="_blank" rel="noopener noreferrer">
                <Briefcase className="h-4 w-4" />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>{t('candidateCard.viewResume')}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
