import type { Permission } from '@/entities/dictionary';
interface DefaultRole {
    id: string;
    name: string;
    code: string;
    description?: string | null;
    permissions?: (string | Permission)[] | null;
    updatedAt: string;
    createdAt: string;
}
export type Role<TOverride extends Partial<DefaultRole> = {}> = Omit<DefaultRole, keyof TOverride> & TOverride;
export {};
