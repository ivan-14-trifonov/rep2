'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, Plus } from 'lucide-react';
import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { useRouter } from 'next/navigation';

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
    setSkills(skills.filter(skill => skill !== skillToRemove));
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
    await new Promise(resolve => setTimeout(resolve, 1500));
    
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
        <CardTitle className="text-2xl">Find Your Perfect Candidate</CardTitle>
        <CardDescription>
          Describe your job requirements and we'll match you with the best candidates
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Job Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Job Title</Label>
            <Input
              id="title"
              placeholder="e.g., Senior Full Stack Developer"
              {...register('title')}
              className={errors.title ? 'border-destructive' : ''}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>

          {/* Company */}
          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              placeholder="e.g., Tech Solutions Inc."
              {...register('company')}
              className={errors.company ? 'border-destructive' : ''}
            />
            {errors.company && (
              <p className="text-sm text-destructive">{errors.company.message}</p>
            )}
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="e.g., San Francisco, CA or Remote"
              {...register('location')}
              className={errors.location ? 'border-destructive' : ''}
            />
            {errors.location && (
              <p className="text-sm text-destructive">{errors.location.message}</p>
            )}
          </div>

          {/* Job Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Job Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the role, responsibilities, and what you're looking for..."
              rows={4}
              {...register('description')}
              className={errors.description ? 'border-destructive' : ''}
            />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description.message}</p>
            )}
          </div>

          {/* Requirements */}
          <div className="space-y-2">
            <Label htmlFor="requirements">Requirements</Label>
            <Textarea
              id="requirements"
              placeholder="List the required qualifications, experience, and skills..."
              rows={4}
              {...register('requirements')}
              className={errors.requirements ? 'border-destructive' : ''}
            />
            {errors.requirements && (
              <p className="text-sm text-destructive">{errors.requirements.message}</p>
            )}
          </div>

          {/* Skills */}
          <div className="space-y-2">
            <Label htmlFor="skills">Key Skills</Label>
            <div className="flex space-x-2">
              <Input
                id="skills"
                placeholder="e.g., React, Node.js, Python"
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
                    <X
                      className="h-3 w-3 cursor-pointer hover:text-destructive"
                      onClick={() => removeSkill(skill)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={!isValid || isLoading}
            size="lg"
          >
            {isLoading ? 'Searching Candidates...' : 'Find Candidates'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}