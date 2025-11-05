'use client';

import {
  Pagination as ShadcnPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/shared/ui/pagination';
import { usePathname, useSearchParams } from 'next/navigation';

interface PaginationProps {
  page: number;
  pagesCount: number;
  hasMore: boolean;
}

export function Pagination({ page, pagesCount, hasMore }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const renderPaginationItems = () => {
    const items = [];
    const visiblePages = 5; // Number of visible page links

    if (pagesCount <= visiblePages) {
      for (let i = 1; i <= pagesCount; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink href={createPageURL(i)} isActive={i === page}>
              {i}
            </PaginationLink>
          </PaginationItem>,
        );
      }
    } else {
      const startPage = Math.max(1, page - 2);
      const endPage = Math.min(pagesCount, page + 2);

      if (startPage > 1) {
        items.push(
          <PaginationItem key="1">
            <PaginationLink href={createPageURL(1)}>1</PaginationLink>
          </PaginationItem>,
        );
        if (startPage > 2) {
          items.push(<PaginationEllipsis key="start-ellipsis" />);
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink href={createPageURL(i)} isActive={i === page}>
              {i}
            </PaginationLink>
          </PaginationItem>,
        );
      }

      if (endPage < pagesCount) {
        if (endPage < pagesCount - 1) {
          items.push(<PaginationEllipsis key="end-ellipsis" />);
        }
        items.push(
          <PaginationItem key={pagesCount}>
            <PaginationLink href={createPageURL(pagesCount)}>{pagesCount}</PaginationLink>
          </PaginationItem>,
        );
      }
    }

    return items;
  };

  return (
    <ShadcnPagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href={createPageURL(page - 1)} />
        </PaginationItem>
        {renderPaginationItems()}
        <PaginationItem>
          <PaginationNext href={createPageURL(page + 1)} />
        </PaginationItem>
      </PaginationContent>
    </ShadcnPagination>
  );
}
