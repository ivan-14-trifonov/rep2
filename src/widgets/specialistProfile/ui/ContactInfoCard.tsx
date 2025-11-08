import { useTranslation } from '@/shared/hooks/use-translation';
import { Card, CardContent, CardHeader, CardTitle } from '@ui/card';
import { ExternalLink, Mail, Phone } from 'lucide-react';
import type { Offer, Specialist } from '@imarketplace/types/entities';

export function ContactInfoCard({ candidate }: { candidate: Offer<{ specialist: Specialist }> }) {
  const { t } = useTranslation();
  const specialist = candidate.specialist;
  const contacts = specialist.contacts || {};

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('specialistProfile.contactInformation')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {contacts.email && (
          <div className="flex items-center space-x-3">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <a href={`mailto:${contacts.email}`} className="text-sm hover:text-primary transition-colors">
              {contacts.email}
            </a>
          </div>
        )}
        {contacts.phone && (
          <div className="flex items-center space-x-3">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <a href={`tel:${contacts.phone}`} className="text-sm hover:text-primary transition-colors">
              {contacts.phone}
            </a>
          </div>
        )}
        {contacts.telegram && (
          <div className="flex items-center space-x-3">
            <ExternalLink className="h-4 w-4 text-muted-foreground" />
            <a href={`https://t.me/${contacts.telegram}`} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-primary transition-colors">
              {t('specialistProfile.linkedinProfile')} - @{contacts.telegram}
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
