'use client';
import { Card, CardContent } from '@ui/card';
import { Skeleton } from '@ui/skeleton';

export function SpecialistCardSkeleton() {
  return (
    <Card className="flex flex-col border">
      <CardContent className="p-6 flex flex-col grow justify-between">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-3">
            <Skeleton className="h-12 w-12 rounded-full mt-1" />
            <div className="flex flex-col justify-start min-h-[3rem]">
              <Skeleton className="h-5 w-32 mb-1" />
              <Skeleton className="h-5 w-24" />
            </div>
          </div>
          <Skeleton className="h-6 w-12 rounded-lg" />
        </div>

        <div>
          {/* Title and Grade */}
          <div className="flex items-center justify-between mb-4">
            <Skeleton className="h-5 w-40 mr-2" />
            <Skeleton className="h-6 w-16 rounded" />
          </div>

          {/* Location & Experience */}
          <div className="mb-4 text-sm">
            <div className="space-y-1 min-h-[3.5rem] flex flex-col justify-start">
              <Skeleton className="h-4 w-48" />
              <div className="flex items-center">
                <Skeleton className="h-4 w-4 mr-1 rounded-full" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="mb-8 flex items-start">
            <div className="space-y-2 w-full min-h-[4rem]">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>

        {/* Actions (footer area) */}
        <div>
          <Skeleton className="h-10 w-full rounded" />
        </div>
      </CardContent>
    </Card>
  );
}
