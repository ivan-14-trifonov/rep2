import type { getPaginatedOffersResult } from '@imarketplace/types/contracts/offer-contract';
import type { BackendClient } from './BackendClient';

export class OfferClient {
  private readonly prefix: string = '/api/offers';

  constructor(private backedClient: BackendClient) {}

  public async getPaginatedOffers(page: number): Promise<getPaginatedOffersResult> {
    return this.backedClient.get<getPaginatedOffersResult>(`${this.prefix}?page=${page}`);
  }

  // public getOffer(offerId: string): OfferContract['findOfferById']['result'] {
  //   return `${this.prefix}?page=${page}`;
  // }
}
// `${this.prefix}?page=${page}`
