import type { Job } from '@imarketplace/types/entities';
import { Badge } from '@ui/badge';
import { Button } from '@ui/button';
import { Card, CardContent } from '@ui/card';
import { Building, Clock, DollarSign, ExternalLink, Heart, Mail, MapPin, Share, Users } from 'lucide-react';
import { getJobTypeColor } from '../lib/getJobTypeColor';
import { useTranslation } from '@/shared/hooks/use-translation';
import { formatSalary } from '../lib/formatSalary';

export function JobProfileHeader({ job }: { job: Job }) {
  const { t } = useTranslation();

  return (
    <Card>
      <CardContent className="p-8">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col md:flex-row md:items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl font-bold">{job.name}</h1>
                <div className={`px-3 py-1 rounded-lg text-sm font-medium border ${getJobTypeColor(job.employmentType)}`}>
                  {job.employmentType}
                </div>
              </div>

              <div className="flex items-center space-x-2 mb-4">
                <Building className="h-5 w-5 text-muted-foreground" />
                <span className="text-xl text-muted-foreground">
                  {typeof job.company === 'object' && job.company !== null ? job.company.name : job.company}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {typeof job.city === 'object' && job.city !== null ? job.city.name : job.city}
                </div>
                {job.workFormat === 'remote' && <Badge variant="outline">{t('jobProfile.remote')}</Badge>}
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  {job.numberOfSpecialists} {t('jobProfile.applicants')}
                </div>
              </div>

              <div className="flex items-center text-green-600 text-lg font-semibold mb-6">
                <DollarSign className="h-5 w-5 mr-1" />
                {formatSalary(t, job)}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button size="lg" className="flex-1 md:flex-none">
              <ExternalLink className="h-4 w-4 mr-2" />
              {t('jobProfile.applyNow')}
            </Button>
            <Button variant="outline" size="lg">
              <Heart className="h-4 w-4 mr-2" />
              {t('jobProfile.saveJob')}
            </Button>
            <Button variant="outline" size="lg">
              <Share className="h-4 w-4 mr-2" />
              {t('jobProfile.share')}
            </Button>
            <Button variant="outline" size="lg">
              <Mail className="h-4 w-4 mr-2" />
              {t('jobProfile.contactHR')}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
