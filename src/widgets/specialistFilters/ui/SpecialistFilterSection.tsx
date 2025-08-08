'use client';

import { useTranslation } from '@/shared/hooks/use-translation';
import { Input } from '@ui/input';
import { Label } from '@ui/label';
import { Slider } from '@ui/slider';
import { Separator } from '@ui/separator';

interface SpecialistFilterSectionProps {
  searchQuery: string;
  filters: {
    location: string;
    minExperience: number;
    maxExperience: number;
    minMatchScore: number;
    skills: string[];
  };
  onSearchQueryChange: (value: string) => void;
  // @ts-ignore
  onFiltersChange: (filters: Partial<typeof filters>) => void;
}

export function SpecialistFilterSection({ searchQuery, filters, onSearchQueryChange, onFiltersChange }: SpecialistFilterSectionProps) {
  const { t } = useTranslation();

  return (
    <>
      {/* Search Query */}
      <div className="space-y-2">
        <Label htmlFor="search">{t('searchFilters.searchCandidatesLabel')}</Label>
        <Input
          id="search"
          placeholder={t('searchFilters.searchCandidatesPlaceholder')}
          value={searchQuery}
          onChange={(e) => onSearchQueryChange(e.target.value)}
        />
      </div>

      <Separator />

      {/* Location Filter */}
      <div className="space-y-2">
        <Label htmlFor="location">{t('searchFilters.locationLabel')}</Label>
        <Input
          id="location"
          placeholder={t('searchFilters.locationPlaceholder')}
          value={filters.location}
          onChange={(e) => onFiltersChange({ location: e.target.value })}
        />
      </div>

      {/* Experience Range */}
      <div className="space-y-3">
        <Label>{t('searchFilters.experienceRangeLabel')}</Label>
        <div className="px-2">
          <Slider
            value={[filters.minExperience, filters.maxExperience]}
            onValueChange={([min, max]) => onFiltersChange({ minExperience: min, maxExperience: max })}
            max={20}
            min={0}
            step={1}
            className="w-full"
          />
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>
            {filters.minExperience} {t('searchFilters.years')}
          </span>
          <span>
            {filters.maxExperience}+ {t('searchFilters.years')}
          </span>
        </div>
      </div>

      {/* Match Score */}
      <div className="space-y-3">
        <Label>{t('searchFilters.minimumMatchScoreLabel')}</Label>
        <div className="px-2">
          <Slider
            value={[filters.minMatchScore]}
            onValueChange={([value]) => onFiltersChange({ minMatchScore: value })}
            max={100}
            min={0}
            step={5}
            className="w-full"
          />
        </div>
        <div className="text-sm text-muted-foreground">
          {filters.minMatchScore}% {t('searchFilters.minimumMatch')}
        </div>
      </div>
    </>
  );
}
