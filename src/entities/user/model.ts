import type { Company } from '@/entities/company';
import type { Role, Media } from '@/entities/dictionary';

interface DefaultUser {
  id: string;
  name?: string | null;
  roles: ('admin' | 'user' | 'reader')[];
  email: string;
  confirmToken?: string | null;
  confirmedAt?: string | null;
  password?: string | null;
  company?: (string | null) | Company;
  role?: (string | null) | Role;
  img?: (string | null) | Media;
  tokens?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  useTokens?: boolean | null;
  isConfirmed?: boolean | null;
  updatedAt: string;
  createdAt: string;
}

export type User<TOverride extends Partial<DefaultUser> = {}> = Omit<DefaultUser, keyof TOverride> & TOverride;
