import type { Media, Service } from '@/entities/dictionary';

interface DefaultCompany {
  id: string;
  name: string;
  inn?: string | null;
  entityType: 'INDIVIDUAL' | 'LEGAL_ENTITY' | 'SOLE_PROPRIETOR' | 'SELF_EMPLOYED';
  entityRole: 'CUSTOMER' | 'AGENCY' | 'SPECIALIST';
  data?: {
    ogrn?: string | null;
    kpp?: string | null;
    okved?: string | null;
    regDate?: string | null;
    regAddress?: string | null;
    factAddress?: string | null;
    director?: string | null;
    taxForm?: string | null;
    bik?: string | null;
    bankName?: string | null;
    accountNumber?: string | null;
  };
  services?: (string | Service)[] | null;
  dossier?:
    | {
        code: 'CV' | 'CHECKLIST';
        content?: (string | null) | Media;
        id?: string | null;
      }[]
    | null;
  telegramChatId?: string | null;
  telegramChatNotificationId?: string | null;
  isSpecialistNotificationSub?: boolean | null;
  updatedAt: string;
  createdAt: string;
}

export type Company<TOverride extends Partial<DefaultCompany> = {}> = Omit<DefaultCompany, keyof TOverride> & TOverride;
