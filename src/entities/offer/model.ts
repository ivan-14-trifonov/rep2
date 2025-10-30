import type { Specialist } from '@/entities/candidate';
import type { Job } from '@/entities/job';

interface OfferRequirement {
  id: string;
  requirement: string;
  mandatory?: boolean | null;
  matched: number;
  comment?: string | null;
  questions?:
    | {
        question?: string | null;
        answer?: string | null;
        id?: string | null;
      }[]
    | null;
}

interface DefaultOffer {
  id: string;
  specialist: string | Specialist; // -> связь с Specialist
  job: string | Job; // -> связь с Job
  agent?: string | null; // -> связь с User
  rate?: number | null;
  requirements?: OfferRequirement[] | null;
  status: string; // -> связь с OfferStatus
  salary?: {
    amount?: number | null;
    currency?: ('RUB' | 'EUR' | 'USD') | null;
    hourlyRate?: number | null;
  };
  matched?: number | null;
  comment?: string | null;
  assessmentOfRequirements?: string | null;
  createdBy?: ('user' | 'databaseСomparison' | 'loader' | 'cosineSimilarity' | 'importByLink') | null;
  respondedAt?: string | null;
  matchedBatch?: number | null;
  updatedAt: string;
  createdAt: string;
}

export type Offer<TOverride extends Partial<DefaultOffer> = {}> = Omit<DefaultOffer, keyof TOverride> & TOverride;
