import { Badge } from '@ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@ui/card';
import { Separator } from '@ui/separator';
import { Building, Calendar } from 'lucide-react';
import { useTranslation } from '@/shared/hooks/use-translation';
import type { Candidate } from '@/types';

export function WorkExperienceCard({ candidate }: { candidate: Candidate }) {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Building className="h-5 w-5 mr-2" />
          {t('specialistProfile.workExperience')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
  {candidate.previousRoles.map((role: any, index: number) => (
          <div key={index}>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
              <h4 className="font-semibold text-lg">{role.position}</h4>
              <Badge variant="outline" className="w-fit">
                <Calendar className="h-3 w-3 mr-1" />
                {role.duration}
              </Badge>
            </div>
            <p className="text-primary font-medium mb-2">{role.company}</p>
            <p className="text-muted-foreground leading-relaxed">{role.description}</p>
            {index < candidate.previousRoles.length - 1 && <Separator className="mt-6" />}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
