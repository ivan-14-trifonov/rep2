import { useTranslation } from '@/shared/hooks/use-translation';
import { Badge } from '@ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@ui/card';
import { GraduationCap } from 'lucide-react';
import type { Eductation } from '@/types';

export function EducationCard({ educations }: { educations: Eductation[] }) {
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
        {educations.map((edu: Eductation, index: number) => (
          <div key={index} className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold">{edu.degree}</h4>
              <p className="text-muted-foreground">{edu.institution}</p>
            </div>
            <Badge variant="outline">{edu.year}</Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
