import { useTranslation } from '@/shared/hooks/use-translation';
import { Badge } from '@ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@ui/card';
import { GraduationCap } from 'lucide-react';
import type { Specialist } from '@imarketplace/types/entities';

interface EducationItem {
  name?: string | null;
  level: 'secondaryGeneral' | 'CandidateOfSciences' | 'masterOfScience' | 'higher' | 'unfinishedHigher' | 'secondary' | 'other';
  major?: string | null;
  year?: number | null;
  id?: string | null;
}

export function EducationCard({ educations }: { educations: EducationItem[] }) {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <GraduationCap className="h-5 w-5 mr-2" />
          {t('specialistProfile.education')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {educations.map((edu, index) => (
          <div key={edu.id || index} className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold">{edu.name || 'Education'}</h4>
              <p className="text-muted-foreground">{edu.major}</p>
            </div>
            <Badge variant="outline">{edu.year || 'N/A'}</Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
