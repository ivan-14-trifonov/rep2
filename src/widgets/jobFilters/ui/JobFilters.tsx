'use client';

import { useTranslation } from '@/shared/hooks/use-translation';
import { useAppStore } from '@/shared/lib/store';
import { Button } from '@ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@ui/card';
import { Separator } from '@ui/separator';
import { Filter } from 'lucide-react';
import { useState } from 'react';
import { FilterSection } from './FilterSection';
import { SkillInput } from './SkillInput';

export function JobFilters() {
  const { jobSearchQuery, jobFilters, setJobSearchQuery, setJobFilters, filteredJobs } = useAppStore();
  const { t } = useTranslation();

  const addSkill = (skill: string) => {
    if (skill && !jobFilters.skills.includes(skill)) {
      setJobFilters({ skills: [...jobFilters.skills, skill] });
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setJobFilters({
      skills: jobFilters.skills.filter((skill) => skill !== skillToRemove),
    });
  };

  const clearAllFilters = () => {
    setJobSearchQuery('');
    setJobFilters({
      location: '',
      jobType: '',
      minSalary: 0,
      maxSalary: 500000,
      skills: [],
      remote: false,
      minExperience: 0,
      maxExperience: 20,
    });
  };

  const hasActiveFilters =
    jobSearchQuery ||
    jobFilters.location ||
    jobFilters.jobType ||
    jobFilters.minSalary > 0 ||
    jobFilters.maxSalary < 500000 ||
    jobFilters.skills.length > 0 ||
    jobFilters.remote ||
    jobFilters.minExperience > 0 ||
    jobFilters.maxExperience < 20;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            {t('jobFilters.title')}
          </CardTitle>
          {hasActiveFilters && (
            <Button variant="outline" size="sm" onClick={clearAllFilters}>
              {t('jobFilters.clearAll')}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <FilterSection
          filters={jobFilters}
          searchQuery={jobSearchQuery}
          onSearchQueryChange={setJobSearchQuery}
          onFiltersChange={setJobFilters}
          onClearAll={clearAllFilters}
          hasActiveFilters={hasActiveFilters}
        />

        <Separator />

        <SkillInput skills={jobFilters.skills} onAddSkill={addSkill} onRemoveSkill={removeSkill} />

        <Separator />

        {/* Results Count */}
        <div className="text-center py-2">
          <div className="text-lg font-semibold">
            {t(filteredJobs.length === 1 ? 'jobFilters.jobsFound_one' : 'jobFilters.jobsFound_other', {
              count: filteredJobs.length,
            })}
          </div>
          <div className="text-sm text-muted-foreground">{t('jobFilters.matchingCriteria')}</div>
        </div>
      </CardContent>
    </Card>
  );
}
