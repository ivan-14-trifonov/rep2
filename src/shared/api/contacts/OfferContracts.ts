import type { Offer } from '@imarketplace/types/entities';

export interface OfferContact {
  getPaginatedOffers(page: number): Promise<Offer[]>;
}
