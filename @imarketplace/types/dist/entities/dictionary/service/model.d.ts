import type { Media } from '@/entities/dictionary';
interface DefaultService {
    id: string;
    top?: boolean | null;
    name: string;
    content: {
        root: {
            type: string;
            children: {
                type: any;
                version: number;
                [k: string]: unknown;
            }[];
            direction: ('ltr' | 'rtl') | null;
            format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
            indent: number;
            version: number;
        };
        [k: string]: unknown;
    };
    content_html?: string | null;
    gallery?: {
        photo?: (string | Media)[] | null;
        id?: string | null;
    }[] | null;
    amount?: number | null;
    currency?: ('RUB' | 'EUR' | 'USD') | null;
    updatedAt: string;
    createdAt: string;
}
export type Service<TOverride extends Partial<DefaultService> = {}> = Omit<DefaultService, keyof TOverride> & TOverride;
export {};
