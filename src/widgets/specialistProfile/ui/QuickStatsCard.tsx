import { useTranslation } from '@/shared/hooks/use-translation';
import { Card, CardContent, CardHeader, CardTitle } from '@ui/card';
import type { Candidate } from '@/types';

export function QuickStatsCard({ candidate }: { candidate: Candidate }) {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('specialistProfile.quickStats')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">{t('specialistProfile.experience')}</span>
          <span className="font-semibold">{candidate.experience} years</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">{t('specialistProfile.matchScore')}</span>
          <span className="font-semibold">{candidate.matchScore}%</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">{t('specialistProfile.skills')}</span>
          <span className="font-semibold">{candidate.skills.length}</span>
        </div>
      </CardContent>
    </Card>
  );
}
