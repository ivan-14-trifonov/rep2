'use client';

import { Building, MapPin } from 'lucide-react';
import { useTranslation } from '@/shared/hooks/use-translation';
import { Card, CardContent, CardHeader, CardTitle } from '@ui/card';
import { Badge } from '@ui/badge';
import type { JobDescription } from '@/types';

interface JobSummaryCardProps {
  jobDescription: JobDescription;
}

export function JobSummaryCard({ jobDescription }: JobSummaryCardProps) {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Building className="h-5 w-5 mr-2" />
          {t('dashboard.jobSummary')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            <h3 className="text-lg font-semibold">{jobDescription.title}</h3>
            <Badge variant="secondary">{jobDescription.company}</Badge>
            <div className="flex items-center text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              {jobDescription.location}
            </div>
          </div>

          {jobDescription.skills.length > 0 && (
            <div className="space-y-2">
              <div className="text-sm font-medium">{t('dashboard.requiredSkills')}</div>
              <div className="flex flex-wrap gap-2">
                {jobDescription.skills.map((skill) => (
                  <Badge key={skill} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
