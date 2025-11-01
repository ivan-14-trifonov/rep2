import { City, Country, Grade, Job, Offer, Specialist, Specialization } from "@/entities";
export type PaginetedOffer = Offer<{
    job: Job;
    specialist: Specialist<{
        specialization: Specialization;
        grades: Grade[];
        city: City;
        country: Country;
    }>;
}>;
