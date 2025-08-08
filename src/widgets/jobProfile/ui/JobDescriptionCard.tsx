import { useTranslation } from '@/shared/hooks/use-translation';
import { Card, CardContent, CardHeader, CardTitle } from '@ui/card';
import type { Job } from '@/types';

export function JobDescriptionCard({ job }: { job: Job }) {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('jobProfile.jobDescription')}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{job.description}</p>
      </CardContent>
    </Card>
  );
}
