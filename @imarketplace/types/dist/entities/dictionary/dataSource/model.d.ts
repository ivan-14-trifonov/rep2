export interface DataSource {
    id: string;
    name: string;
    href?: string | null;
    type: 'website' | 'telegram' | 'other';
    updatedAt: string;
    createdAt: string;
}
