import { useTranslation } from '@/shared/hooks/use-translation';
import { Button } from '@ui/button';
import { Card, CardContent } from '@ui/card';
import { ExternalLink } from 'lucide-react';

export function ApplyCard() {
  const { t } = useTranslation();

  return (
    <Card>
      <CardContent className="p-4">
        <Button className="w-full" size="lg">
          <ExternalLink className="h-4 w-4 mr-2" />
          {t('jobProfile.applyForPosition')}
        </Button>
        <p className="text-xs text-muted-foreground text-center mt-2">{t('jobProfile.applyRedirect')}</p>
      </CardContent>
    </Card>
  );
}
