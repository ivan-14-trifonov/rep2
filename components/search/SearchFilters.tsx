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

const popularSkills = [
  'React', 'Node.js', 'TypeScript', 'Python', 'AWS',
  'Docker', 'Kubernetes', 'GraphQL', 'MongoDB', 'PostgreSQL',
  'Vue.js', 'Angular', 'Express', 'Next.js', 'TailwindCSS'
];

export function SearchFilters() {
  const { 
    searchQuery, 
    filters, 
    setSearchQuery, 
    setFilters,
    filteredCandidates 
  } = useAppStore();

  const [skillInput, setSkillInput] = useState('');

  const addSkill = (skill: string) => {
    if (skill && !filters.skills.includes(skill)) {
      setFilters({ skills: [...filters.skills, skill] });
    }
    setSkillInput('');
  };

  const removeSkill = (skillToRemove: string) => {
    setFilters({ 
      skills: filters.skills.filter(skill => skill !== skillToRemove) 
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
    searchQuery || 
    filters.location || 
    filters.minExperience > 0 || 
    filters.maxExperience < 20 || 
    filters.skills.length > 0 || 
    filters.minMatchScore > 0;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Search & Filters
          </CardTitle>
          {hasActiveFilters && (
            <Button variant="outline" size="sm" onClick={clearAllFilters}>
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search Query */}
        <div className="space-y-2">
          <Label htmlFor="search">Search Candidates</Label>
          <Input
            id="search"
            placeholder="Search by name, title, or skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Separator />

        {/* Location Filter */}
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            placeholder="e.g., San Francisco, Remote"
            value={filters.location}
            onChange={(e) => setFilters({ location: e.target.value })}
          />
        </div>

        {/* Experience Range */}
        <div className="space-y-3">
          <Label>Experience Range</Label>
          <div className="px-2">
            <Slider
              value={[filters.minExperience, filters.maxExperience]}
              onValueChange={([min, max]) => 
                setFilters({ minExperience: min, maxExperience: max })
              }
              max={20}
              min={0}
              step={1}
              className="w-full"
            />
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{filters.minExperience} years</span>
            <span>{filters.maxExperience}+ years</span>
          </div>
        </div>

        {/* Match Score */}
        <div className="space-y-3">
          <Label>Minimum Match Score</Label>
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
            {filters.minMatchScore}% minimum match
          </div>
        </div>

        <Separator />

        {/* Skills Filter */}
        <div className="space-y-3">
          <Label htmlFor="skills">Skills</Label>
          <div className="flex space-x-2">
            <Input
              id="skills"
              placeholder="Add skill..."
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addSkill(skillInput);
                }
              }}
            />
            <Button 
              type="button" 
              onClick={() => addSkill(skillInput)}
              disabled={!skillInput.trim()}
              size="sm"
            >
              Add
            </Button>
          </div>

          {/* Selected Skills */}
          {filters.skills.length > 0 && (
            <div className="space-y-2">
              <div className="text-sm font-medium">Selected Skills:</div>
              <div className="flex flex-wrap gap-2">
                {filters.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                    {skill}
                    <X
                      className="h-3 w-3 cursor-pointer hover:text-destructive"
                      onClick={() => removeSkill(skill)}
                    />
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Popular Skills */}
          <div className="space-y-2">
            <div className="text-sm font-medium">Popular Skills:</div>
            <div className="flex flex-wrap gap-2">
              {popularSkills
                .filter(skill => !filters.skills.includes(skill))
                .slice(0, 8)
                .map((skill) => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className="cursor-pointer hover:bg-secondary"
                    onClick={() => addSkill(skill)}
                  >
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
            {filteredCandidates.length} candidate{filteredCandidates.length !== 1 ? 's' : ''} found
          </div>
          <div className="text-sm text-muted-foreground">
            Matching your criteria
          </div>
        </div>
      </CardContent>
    </Card>
  );
}