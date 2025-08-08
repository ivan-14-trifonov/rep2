import { Card, CardContent, CardHeader, CardTitle } from '@ui/card';
import { formatDate } from '../lib/formatDate';
import { useTranslation } from '@/shared/hooks/use-translation';
import { Badge } from '@ui/badge';
import type { Job } from '@/types';

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
          <span className="font-medium">{formatDate(job.postedDate)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">{t('jobProfile.deadline')}</span>
          <span className="font-medium">{formatDate(job.applicationDeadline)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">{t('jobProfile.jobType')}</span>
          <span className="font-medium">{job.type}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">{t('jobProfile.experience')}</span>
          <span className="font-medium">
            {job.experience.min}-{job.experience.max} {t('jobProfile.years')}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">{t('jobProfile.applicants')}</span>
          <span className="font-medium">{job.applicants}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">{t('jobProfile.status')}</span>
          <Badge variant={job.status === 'Open' ? 'default' : 'secondary'}>{job.status}</Badge>
        </div>
      </CardContent>
    </Card>
  );
}
