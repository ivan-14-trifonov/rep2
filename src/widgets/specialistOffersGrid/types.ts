import type { City, Country, Grade, Job, Offer, Specialist, Specialization } from '@imarketplace/types/entities';

export type PaginetedOffer = Offer<{
  job: Job;
  specialist: Specialist<{
    specialization: Specialization;
    grades: Grade[];
    city: City;
    country: Country;
  }>;
}>;
