'use client';

import { useTranslation } from '@/shared/hooks/use-translation';
import { Badge } from '@ui/badge';
import { Button } from '@ui/button';
import { Input } from '@ui/input';
import { Label } from '@ui/label';
import { X } from 'lucide-react';
import { useState } from 'react';

interface SpecialistSkillInputProps {
  skills: string[];
  onAddSkill: (skill: string) => void;
  onRemoveSkill: (skill: string) => void;
}

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

export function SpecialistSkillInput({ skills, onAddSkill, onRemoveSkill }: SpecialistSkillInputProps) {
  const { t } = useTranslation();
  const [skillInput, setSkillInput] = useState('');

  const handleAddSkill = () => {
    if (skillInput.trim()) {
      onAddSkill(skillInput.trim());
      setSkillInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  return (
    <div className="space-y-3">
      <Label htmlFor="skills">{t('searchFilters.skillsLabel')}</Label>
      <div className="flex space-x-2">
        <Input
          id="skills"
          placeholder={t('searchFilters.addSkillPlaceholder')}
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <Button type="button" onClick={handleAddSkill} disabled={!skillInput.trim()} size="sm">
          {t('searchFilters.addButton')}
        </Button>
      </div>

      {/* Selected Skills */}
      {skills.length > 0 && (
        <div className="space-y-2">
          <div className="text-sm font-medium">{t('searchFilters.selectedSkillsLabel')}</div>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                {skill}
                <X className="h-3 w-3 cursor-pointer hover:text-destructive" onClick={() => onRemoveSkill(skill)} />
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
            .filter((skill) => !skills.includes(skill))
            .slice(0, 8)
            .map((skill) => (
              <Badge key={skill} variant="outline" className="cursor-pointer hover:bg-secondary" onClick={() => onAddSkill(skill)}>
                {skill}
              </Badge>
            ))}
        </div>
      </div>
    </div>
  );
}
