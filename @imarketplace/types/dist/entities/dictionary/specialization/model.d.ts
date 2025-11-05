import type { Category } from '@/entities/dictionary';
export interface DefaultSpecialization {
    id: string;
    name: string;
    category?: (string | null) | Category;
    updatedAt: string;
    createdAt: string;
}
export type Specialization<TOverride extends Partial<DefaultSpecialization> = {}> = Omit<DefaultSpecialization, keyof TOverride> & TOverride;
