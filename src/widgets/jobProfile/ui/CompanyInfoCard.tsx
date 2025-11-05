import { useTranslation } from '@/shared/hooks/use-translation';
import type { Job } from '@imarketplace/types/entities';
import { Card, CardContent, CardHeader, CardTitle } from '@ui/card';
import { Building, MapPin } from 'lucide-react';

export function CompanyInfoCard({ job }: { job: Job }) {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {t('jobProfile.aboutCompany')} {typeof job.company === 'object' && job.company !== null ? job.company.name : job.company}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Building className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{t('jobProfile.technologyCompany')}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {typeof job.city === 'object' && job.city !== null ? job.city.name : job.city}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">{t('jobProfile.aboutCompanyDescription')}</p>
        </div>
      </CardContent>
    </Card>
  );
}
