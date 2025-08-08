'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@ui/button';
import { Input } from '@ui/input';
import { Textarea } from '@ui/textarea';
import { Label } from '@ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ui/card';
import { Badge } from '@ui/badge';
import { X, Plus } from 'lucide-react';
import { useState } from 'react';
import { useAppStore } from '@/shared/lib/store';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/shared/hooks/use-translation';

const jobDescriptionSchema = z.object({
  title: z.string().min(1, 'Job title is required').min(3, 'Job title must be at least 3 characters'),
  company: z.string().min(1, 'Company name is required'),
  location: z.string().min(1, 'Location is required'),
  description: z.string().min(10, 'Job description must be at least 10 characters'),
  requirements: z.string().min(10, 'Requirements must be at least 10 characters'),
});

type JobDescriptionFormData = z.infer<typeof jobDescriptionSchema>;

export function JobDescriptionForm() {
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState('');
  const { setJobDescription, isLoading, setLoading } = useAppStore();
  const router = useRouter();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<JobDescriptionFormData>({
    resolver: zodResolver(jobDescriptionSchema),
    mode: 'onChange',
  });

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  const onSubmit = async (data: JobDescriptionFormData) => {
    setLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setJobDescription({
      ...data,
      skills,
    });

    setLoading(false);
    router.push('/dashboard');
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">{t('jobDescriptionForm.title')}</CardTitle>
        <CardDescription>{t('jobDescriptionForm.description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Job Title */}
          <div className="space-y-2">
            <Label htmlFor="title">{t('jobDescriptionForm.jobTitle')}</Label>
            <Input
              id="title"
              placeholder={t('jobDescriptionForm.jobTitlePlaceholder')}
              {...register('title')}
              className={errors.title ? 'border-destructive' : ''}
            />
            {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
          </div>

          {/* Company */}
          <div className="space-y-2">
            <Label htmlFor="company">{t('jobDescriptionForm.company')}</Label>
            <Input
              id="company"
              placeholder={t('jobDescriptionForm.companyPlaceholder')}
              {...register('company')}
              className={errors.company ? 'border-destructive' : ''}
            />
            {errors.company && <p className="text-sm text-destructive">{errors.company.message}</p>}
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">{t('jobDescriptionForm.location')}</Label>
            <Input
              id="location"
              placeholder={t('jobDescriptionForm.locationPlaceholder')}
              {...register('location')}
              className={errors.location ? 'border-destructive' : ''}
            />
            {errors.location && <p className="text-sm text-destructive">{errors.location.message}</p>}
          </div>

          {/* Job Description */}
          <div className="space-y-2">
            <Label htmlFor="description">{t('jobDescriptionForm.jobDescription')}</Label>
            <Textarea
              id="description"
              placeholder={t('jobDescriptionForm.jobDescriptionPlaceholder')}
              rows={4}
              {...register('description')}
              className={errors.description ? 'border-destructive' : ''}
            />
            {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
          </div>

          {/* Requirements */}
          <div className="space-y-2">
            <Label htmlFor="requirements">{t('jobDescriptionForm.requirements')}</Label>
            <Textarea
              id="requirements"
              placeholder={t('jobDescriptionForm.requirementsPlaceholder')}
              rows={4}
              {...register('requirements')}
              className={errors.requirements ? 'border-destructive' : ''}
            />
            {errors.requirements && <p className="text-sm text-destructive">{errors.requirements.message}</p>}
          </div>

          {/* Skills */}
          <div className="space-y-2">
            <Label htmlFor="skills">{t('jobDescriptionForm.keySkills')}</Label>
            <div className="flex space-x-2">
              <Input
                id="skills"
                placeholder={t('jobDescriptionForm.keySkillsPlaceholder')}
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <Button type="button" onClick={addSkill} variant="outline" size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {skills.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                    {skill}
                    <X className="h-3 w-3 cursor-pointer hover:text-destructive" onClick={() => removeSkill(skill)} />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={!isValid || isLoading} size="lg">
            {isLoading ? t('jobDescriptionForm.searchingCandidates') : t('jobDescriptionForm.findCandidates')}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
