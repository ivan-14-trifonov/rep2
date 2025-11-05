import { PaginetedOffer } from "@/services/offer-service";
import { PaginatedResult } from "@/types";
export type getPaginatedOffersResult = PaginatedResult<PaginetedOffer>;
export interface OfferContract {
    getPaginatedOffers: {
        params: {
            page: number;
        };
        result: getPaginatedOffersResult;
    };
}
