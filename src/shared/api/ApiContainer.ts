import { BackendClient } from './clients/BackendClient';
import { OfferClient } from './clients/OfferClient';

export class ApiContainer {
  private backendClient: BackendClient;
  public offers: OfferClient;

  constructor(token: string) {
    this.backendClient = new BackendClient(token);
    this.offers = new OfferClient(this.backendClient);
  }
}
