import { useTranslation } from '@/shared/hooks/use-translation';
import { Card, CardContent, CardHeader, CardTitle } from '@ui/card';
import { CheckCircle } from 'lucide-react';

export function RequirementsCard({ requirements }: { requirements: string[] }) {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('jobProfile.requirements')}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {requirements.map((requirement, index) => (
            <li key={index} className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
              <span className="text-muted-foreground">{requirement}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
