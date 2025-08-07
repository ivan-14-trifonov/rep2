'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { X, Filter } from 'lucide-react';
import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { useTranslation } from '@/hooks/use-translation';

const popularSkills = [
  'React',
  'Node.js',
  'TypeScript',
  'Python',
  'AWS',
  'Docker',
  'Kubernetes',
  'GraphQL',
  'MongoDB',
  'PostgreSQL',
  'Vue.js',
  'Angular',
  'Express',
  'Next.js',
  'TailwindCSS',
];

export function SearchFilters() {
  const { searchQuery, filters, setSearchQuery, setFilters, filteredCandidates } = useAppStore();

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

  const { t } = useTranslation();

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
        {/* Search Query */}
        <div className="space-y-2">
          <Label htmlFor="search">{t('searchFilters.searchCandidatesLabel')}</Label>
          <Input
            id="search"
            placeholder={t('searchFilters.searchCandidatesPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
            onChange={(e) => setFilters({ location: e.target.value })}
          />
        </div>

        {/* Experience Range */}
        <div className="space-y-3">
          <Label>{t('searchFilters.experienceRangeLabel')}</Label>
          <div className="px-2">
            <Slider
              value={[filters.minExperience, filters.maxExperience]}
              onValueChange={([min, max]) => setFilters({ minExperience: min, maxExperience: max })}
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
              onValueChange={([value]) => setFilters({ minMatchScore: value })}
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

        <Separator />

        {/* Skills Filter */}
        <div className="space-y-3">
          <Label htmlFor="skills">{t('searchFilters.skillsLabel')}</Label>
          <div className="flex space-x-2">
            <Input
              id="skills"
              placeholder={t('searchFilters.addSkillPlaceholder')}
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addSkill(skillInput);
                }
              }}
            />
            <Button type="button" onClick={() => addSkill(skillInput)} disabled={!skillInput.trim()} size="sm">
              {t('searchFilters.addButton')}
            </Button>
          </div>

          {/* Selected Skills */}
          {filters.skills.length > 0 && (
            <div className="space-y-2">
              <div className="text-sm font-medium">{t('searchFilters.selectedSkillsLabel')}</div>
              <div className="flex flex-wrap gap-2">
                {filters.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                    {skill}
                    <X className="h-3 w-3 cursor-pointer hover:text-destructive" onClick={() => removeSkill(skill)} />
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Popular Skills */}
          <div className="space-y-2">
            <div className="text-sm font-medium">{t('searchFilters.popularSkillsLabel')}</div>
            <div className="flex flex-wrap gap-2">
              {popularSkills
                .filter((skill) => !filters.skills.includes(skill))
                .slice(0, 8)
                .map((skill) => (
                  <Badge key={skill} variant="outline" className="cursor-pointer hover:bg-secondary" onClick={() => addSkill(skill)}>
                    {skill}
                  </Badge>
                ))}
            </div>
          </div>
        </div>

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
