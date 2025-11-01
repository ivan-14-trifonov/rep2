export interface PaginatedResult<T> {
    data: T[];
    page: number;
    limit: number;
    total: number;
    pagesCount: number;
    hasMore: boolean;
}
