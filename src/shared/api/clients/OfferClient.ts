import type { getPaginatedOffersResult } from '@imarketplace/types/contracts/offer-contract';
import type { BackendClient } from './BackendClient';
import offersData from '../data/offers.json';

export class OfferClient {
  private readonly prefix: string = '/api/offers';
  private offers: any[]; // Using any since JSON could contain various types

  constructor(private backedClient: BackendClient) {
    this.offers = offersData;
  }

  public async getPaginatedOffers(page: number): Promise<getPaginatedOffersResult> {
    try {
      // Try to get data from server first
      return await this.backedClient.get<getPaginatedOffersResult>(`${this.prefix}?page=${page}`);
    } catch (error) {
      console.warn('Failed to fetch offers from server, using mock data:', error);
      // If server request fails, return mock data
      const pageSize = 10;
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedOffers = this.offers.slice(startIndex, endIndex);
      
      return {
        data: paginatedOffers,
        page: page,
        limit: pageSize,
        total: this.offers.length,
        pagesCount: Math.ceil(this.offers.length / pageSize),
        hasMore: endIndex < this.offers.length
      };
    }
  }

  public getOffer(offerId: string): any | undefined {
    return this.offers.find(offer => offer.id === offerId);
  }
}
