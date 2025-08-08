import { useTranslation } from '@/shared/hooks/use-translation';
import { Badge } from '@ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@ui/card';

export function SkillsCard({ skills }: { skills: string[] }) {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('specialistProfile.keySkills')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill: string) => (
            <Badge key={skill} variant="secondary">
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
