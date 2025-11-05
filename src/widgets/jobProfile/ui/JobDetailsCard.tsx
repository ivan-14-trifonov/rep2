import { Card, CardContent, CardHeader, CardTitle } from '@ui/card';
import { formatDate } from '../lib/formatDate';
import { useTranslation } from '@/shared/hooks/use-translation';
import { Badge } from '@ui/badge';
import type { Job } from '@imarketplace/types/entities';

export function JobDetailsCard({ job }: { job: Job }) {
  const { t } = useTranslation();
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('jobProfile.jobDetails')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">{t('jobProfile.posted')}</span>
          <span className="font-medium">{formatDate(job.createdAt)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">{t('jobProfile.jobType')}</span>
          <span className="font-medium">{job.employmentType}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">{t('jobProfile.applicants')}</span>
          <span className="font-medium">{job.numberOfSpecialists}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">{t('jobProfile.status')}</span>
          <Badge variant={job.status === 'selection' ? 'default' : 'secondary'}>{job.status}</Badge>
        </div>
      </CardContent>
    </Card>
  );
}
