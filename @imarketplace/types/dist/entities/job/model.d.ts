import type { City, Country, Industry, Grade, Language, DataSource, Specialization } from '@/entities/dictionary';
import type { Company } from '@/entities/company';
interface JobRequirement {
    requirement: string;
    mandatory?: boolean | null;
    id?: string | null;
}
interface JobTask {
    name?: string | null;
    id?: string | null;
}
interface JobLanguage {
    language?: (string | null) | Language;
    level?: ('A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'L1' | '-') | null;
    id?: string | null;
}
interface DefaultJob {
    id: string;
    name?: string | null;
    top?: boolean | null;
    externId?: string | null;
    requirements?: JobRequirement[] | null;
    tasks?: [] | null;
    description?: string | null;
    descriptionTeam?: JobTask[] | null;
    projectConditions?: string | null;
    industry?: (string | null) | Industry;
    specialization?: (string | null) | Specialization;
    grades: (string | Grade)[];
    amount?: number | null;
    currency?: ('RUB' | 'EUR' | 'USD') | null;
    numberOfSpecialists: number;
    attractionPeriod?: {
        from?: number | null;
        to?: number | null;
        text?: string | null;
    };
    workFormat?: ('remote' | 'office' | 'mixed') | null;
    employmentType?: ('full' | 'short') | null;
    schedule?: string | null;
    workingHours?: string | null;
    projectStart?: string | null;
    city?: (string | null) | City;
    country?: (string | null) | Country;
    language?: [] | null;
    requiredCitizenship?: JobLanguage[] | null;
    status: 'created' | 'selection' | 'suspended' | 'archive' | 'hidden';
    requiredSkills?: {
        [k: string]: unknown;
    } | unknown[] | string | number | boolean | null;
    company?: (string | null) | Company;
    dataSource?: (string | null) | DataSource;
    parent?: (string | null) | Job;
    visibility?: ('visible' | 'hidden') | null;
    priority?: number | null;
    customer?: (string | null) | Company;
    link?: string | null;
    searchQuery?: string | null;
    createdBy?: ('user' | 'telegram') | null;
    updatedAt: string;
    createdAt: string;
}
export type Job<TOverride extends Partial<DefaultJob> = {}> = Omit<DefaultJob, keyof TOverride> & TOverride;
export {};
