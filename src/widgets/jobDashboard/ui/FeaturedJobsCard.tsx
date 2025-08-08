'use client';

import { useTranslation } from '@/shared/hooks/use-translation';
import { Card, CardContent, CardHeader, CardTitle } from '@ui/card';
import { Badge } from '@ui/badge';

export function FeaturedJobsCard() {
  const { t } = useTranslation();

  const featuredTags = [t('jobs.seniorPositions'), t('jobs.remoteWork'), t('jobs.techCompanies'), t('jobs.competitiveSalary'), t('jobs.greatBenefits')];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('jobs.featuredOpportunities')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {featuredTags.map((tag, index) => (
            <Badge key={index} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
