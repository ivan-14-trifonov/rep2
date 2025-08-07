'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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

export function JobFilters() {
  const { jobSearchQuery, jobFilters, setJobSearchQuery, setJobFilters, filteredJobs } = useAppStore();
  const { t } = useTranslation();

  const jobTypes = [
    { value: 'Full-time', label: t('jobFilters.jobTypes.fullTime') },
    { value: 'Part-time', label: t('jobFilters.jobTypes.partTime') },
    { value: 'Contract', label: t('jobFilters.jobTypes.contract') },
    { value: 'Remote', label: t('jobFilters.jobTypes.remote') },
  ];

  const [skillInput, setSkillInput] = useState('');

  const addSkill = (skill: string) => {
    if (skill && !jobFilters.skills.includes(skill)) {
      setJobFilters({ skills: [...jobFilters.skills, skill] });
    }
    setSkillInput('');
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
        {/* Search Query */}
        <div className="space-y-2">
          <Label htmlFor="jobSearch">{t('jobFilters.searchLabel')}</Label>
          <Input
            id="jobSearch"
            placeholder={t('jobFilters.searchPlaceholder')}
            value={jobSearchQuery}
            onChange={(e) => setJobSearchQuery(e.target.value)}
          />
        </div>

        <Separator />

        {/* Location Filter */}
        <div className="space-y-2">
          <Label htmlFor="location">{t('jobFilters.locationLabel')}</Label>
          <Input
            id="location"
            placeholder={t('jobFilters.locationPlaceholder')}
            value={jobFilters.location}
            onChange={(e) => setJobFilters({ location: e.target.value })}
          />
        </div>

        {/* Job Type Filter */}
        <div className="space-y-2">
          <Label>{t('jobFilters.jobTypeLabel')}</Label>
          <Select value={jobFilters.jobType || 'all'} onValueChange={(value) => setJobFilters({ jobType: value === 'all' ? '' : value })}>
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
          <Switch id="remote" checked={jobFilters.remote} onCheckedChange={(checked) => setJobFilters({ remote: checked })} />
        </div>

        {/* Salary Range */}
        <div className="space-y-3">
          <Label>{t('jobFilters.salaryRangeLabel')}</Label>
          <div className="px-2">
            <Slider
              value={[jobFilters.minSalary, jobFilters.maxSalary]}
              onValueChange={([min, max]) => setJobFilters({ minSalary: min, maxSalary: max })}
              max={500000}
              min={0}
              step={5000}
              className="w-full"
            />
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>${(jobFilters.minSalary / 1000).toFixed(0)}k</span>
            <span>${(jobFilters.maxSalary / 1000).toFixed(0)}k+</span>
          </div>
        </div>

        {/* Experience Range */}
        <div className="space-y-3">
          <Label>{t('jobFilters.experienceRangeLabel')}</Label>
          <div className="px-2">
            <Slider
              value={[jobFilters.minExperience, jobFilters.maxExperience]}
              onValueChange={([min, max]) => setJobFilters({ minExperience: min, maxExperience: max })}
              max={20}
              min={0}
              step={1}
              className="w-full"
            />
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>
              {jobFilters.minExperience} {t('jobFilters.years')}
            </span>
            <span>
              {jobFilters.maxExperience}+ {t('jobFilters.years')}
            </span>
          </div>
        </div>

        <Separator />

        {/* Skills Filter */}
        <div className="space-y-3">
          <Label htmlFor="skills">{t('jobFilters.requiredSkillsLabel')}</Label>
          <div className="flex space-x-2">
            <Input
              id="skills"
              placeholder={t('jobFilters.addSkillPlaceholder')}
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
              {t('jobFilters.addSkillButton')}
            </Button>
          </div>

          {/* Selected Skills */}
          {jobFilters.skills.length > 0 && (
            <div className="space-y-2">
              <div className="text-sm font-medium">{t('jobFilters.selectedSkillsLabel')}</div>
              <div className="flex flex-wrap gap-2">
                {jobFilters.skills.map((skill) => (
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
            <div className="text-sm font-medium">{t('jobFilters.popularSkillsLabel')}</div>
            <div className="flex flex-wrap gap-2">
              {popularSkills
                .filter((skill) => !jobFilters.skills.includes(skill))
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