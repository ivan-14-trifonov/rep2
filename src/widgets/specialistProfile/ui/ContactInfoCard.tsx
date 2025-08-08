import { useTranslation } from '@/shared/hooks/use-translation';
import { Card, CardContent, CardHeader, CardTitle } from '@ui/card';
import { ExternalLink, Mail, Phone } from 'lucide-react';
import type { Candidate } from '@/types';

export function ContactInfoCard({ candidate }: { candidate: Candidate }) {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('specialistProfile.contactInformation')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center space-x-3">
          <Mail className="h-4 w-4 text-muted-foreground" />
          <a href={`mailto:${candidate.email}`} className="text-sm hover:text-primary transition-colors">
            {candidate.email}
          </a>
        </div>
        <div className="flex items-center space-x-3">
          <Phone className="h-4 w-4 text-muted-foreground" />
          <a href={`tel:${candidate.phone}`} className="text-sm hover:text-primary transition-colors">
            {candidate.phone}
          </a>
        </div>
        <div className="flex items-center space-x-3">
          <ExternalLink className="h-4 w-4 text-muted-foreground" />
          <a href={candidate.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-primary transition-colors">
            {t('specialistProfile.linkedinProfile')}
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
