import { BackendClient } from './clients/BackendClient';
import { OfferClient } from './clients/OfferClient';

class ApiContainer {
  private backendClient: BackendClient;
  public offers: OfferClient;

  constructor() {
    this.backendClient = new BackendClient();
    this.offers = new OfferClient(this.backendClient);
  }
}

export const apiController = new ApiContainer();
