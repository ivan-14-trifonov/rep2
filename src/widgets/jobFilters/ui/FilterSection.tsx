'use client';

import { useTranslation } from '@/shared/hooks/use-translation';
import { Input } from '@ui/input';
import { Label } from '@ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/select';
import { Separator } from '@ui/separator';
import { Slider } from '@ui/slider';
import { Switch } from '@ui/switch';

interface FilterSectionProps {
  filters: {
    location: string;
    jobType: string;
    minSalary: number;
    maxSalary: number;
    minExperience: number;
    maxExperience: number;
    remote: boolean;
    skills: string[];
  };
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
  // @ts-ignore
  onFiltersChange: (filters: Partial<typeof filters>) => void;
  onClearAll: () => void;
  hasActiveFilters: boolean | string;
}

export function FilterSection({ filters, searchQuery, onSearchQueryChange, onFiltersChange, onClearAll, hasActiveFilters }: FilterSectionProps) {
  const { t } = useTranslation();

  const jobTypes = [
    { value: 'Full-time', label: t('jobFilters.jobTypes.fullTime') },
    { value: 'Part-time', label: t('jobFilters.jobTypes.partTime') },
    { value: 'Contract', label: t('jobFilters.jobTypes.contract') },
    { value: 'Remote', label: t('jobFilters.jobTypes.remote') },
  ];

  return (
    <>
      {/* Search Query */}
      <div className="space-y-2">
        <Label htmlFor="jobSearch">{t('jobFilters.searchLabel')}</Label>
        <Input id="jobSearch" placeholder={t('jobFilters.searchPlaceholder')} value={searchQuery} onChange={(e) => onSearchQueryChange(e.target.value)} />
      </div>

      <Separator />

      {/* Location Filter */}
      <div className="space-y-2">
        <Label htmlFor="location">{t('jobFilters.locationLabel')}</Label>
        <Input
          id="location"
          placeholder={t('jobFilters.locationPlaceholder')}
          value={filters.location}
          onChange={(e) => onFiltersChange({ location: e.target.value })}
        />
      </div>

      {/* Job Type Filter */}
      <div className="space-y-2">
        <Label>{t('jobFilters.jobTypeLabel')}</Label>
        <Select value={filters.jobType || 'all'} onValueChange={(value) => onFiltersChange({ jobType: value === 'all' ? '' : value })}>
          <SelectTrigger>
            <SelectValue placeholder={t('jobFilters.jobTypePlaceholder')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('jobFilters.allTypes')}</SelectItem>
            {jobTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Remote Work */}
      <div className="flex items-center justify-between">
        <Label htmlFor="remote">{t('jobFilters.remoteOnlyLabel')}</Label>
        <Switch id="remote" checked={filters.remote} onCheckedChange={(checked) => onFiltersChange({ remote: checked })} />
      </div>

      {/* Salary Range */}
      <div className="space-y-3">
        <Label>{t('jobFilters.salaryRangeLabel')}</Label>
        <div className="px-2">
          <Slider
            value={[filters.minSalary, filters.maxSalary]}
            onValueChange={([min, max]) => onFiltersChange({ minSalary: min, maxSalary: max })}
            max={500000}
            min={0}
            step={5000}
            className="w-full"
          />
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>${(filters.minSalary / 1000).toFixed(0)}k</span>
          <span>${(filters.maxSalary / 1000).toFixed(0)}k+</span>
        </div>
      </div>

      {/* Experience Range */}
      <div className="space-y-3">
        <Label>{t('jobFilters.experienceRangeLabel')}</Label>
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
            {filters.minExperience} {t('jobFilters.years')}
          </span>
          <span>
            {filters.maxExperience}+ {t('jobFilters.years')}
          </span>
        </div>
      </div>
    </>
  );
}
