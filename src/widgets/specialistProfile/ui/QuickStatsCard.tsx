import { useTranslation } from '@/shared/hooks/use-translation';
import { Card, CardContent, CardHeader, CardTitle } from '@ui/card';
import type { Offer, Specialist } from '@imarketplace/types/entities';

export function QuickStatsCard({ candidate }: { candidate: Offer<{ specialist: Specialist }> }) {
  const { t } = useTranslation();
  const specialist = candidate.specialist;
  const matchScore = Math.round((candidate.matched || 0) * 100); // Convert to percentage

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('specialistProfile.quickStats')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">{t('specialistProfile.experience')}</span>
          <span className="font-semibold">{specialist.experience?.length || 0} years</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">{t('specialistProfile.matchScore')}</span>
          <span className="font-semibold">{matchScore}%</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">{t('specialistProfile.skills')}</span>
          <span className="font-semibold">{specialist.skills?.length || 0}</span>
        </div>
      </CardContent>
    </Card>
  );
}
