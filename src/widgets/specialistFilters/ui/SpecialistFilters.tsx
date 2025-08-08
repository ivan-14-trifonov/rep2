'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@ui/card';
import { Button } from '@ui/button';
import { Separator } from '@ui/separator';
import { Filter } from 'lucide-react';
import { useState } from 'react';
import { useAppStore } from '@/shared/lib/store';
import { useTranslation } from '@/shared/hooks/use-translation';
import { SpecialistFilterSection } from './SpecialistFilterSection';
import { SpecialistSkillInput } from './SpecialistSkillInput';

export function SpecialistFilters() {
  const { searchQuery, filters, setSearchQuery, setFilters, filteredCandidates } = useAppStore();
  const { t } = useTranslation();

  const [skillInput, setSkillInput] = useState('');

  const addSkill = (skill: string) => {
    if (skill && !filters.skills.includes(skill)) {
      setFilters({ skills: [...filters.skills, skill] });
    }
    setSkillInput('');
  };

  const removeSkill = (skillToRemove: string) => {
    setFilters({
      skills: filters.skills.filter((skill) => skill !== skillToRemove),
    });
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setFilters({
      location: '',
      minExperience: 0,
      maxExperience: 20,
      skills: [],
      minMatchScore: 0,
    });
  };

  const hasActiveFilters =
    searchQuery || filters.location || filters.minExperience > 0 || filters.maxExperience < 20 || filters.skills.length > 0 || filters.minMatchScore > 0;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            {t('searchFilters.title')}
          </CardTitle>
          {hasActiveFilters && (
            <Button variant="outline" size="sm" onClick={clearAllFilters}>
              {t('searchFilters.clearAll')}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <SpecialistFilterSection searchQuery={searchQuery} filters={filters} onSearchQueryChange={setSearchQuery} onFiltersChange={setFilters} />

        <Separator />

        <SpecialistSkillInput skills={filters.skills} onAddSkill={addSkill} onRemoveSkill={removeSkill} />

        <Separator />

        {/* Results Count */}
        <div className="text-center py-2">
          <div className="text-lg font-semibold">
            {filteredCandidates.length === 1 && t('searchFilters.candidatesFound_one', { count: filteredCandidates.length })}
            {filteredCandidates.length > 1 && t('searchFilters.candidatesFound_other', { count: filteredCandidates.length })}
          </div>
          <div className="text-sm text-muted-foreground">{t('searchFilters.matchingCriteria')}</div>
        </div>
      </CardContent>
    </Card>
  );
}
