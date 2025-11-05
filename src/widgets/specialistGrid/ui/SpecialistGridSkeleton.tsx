'use client';

import { SpecialistCardSkeleton } from '@/widgets/specialistCard';

export function SpecialistGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 12 }).map((_, i) => (
        <SpecialistCardSkeleton key={i} />
      ))}
    </div>
  );
}
