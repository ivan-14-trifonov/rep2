'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@ui/avatar';
import { Button } from '@ui/button';
import { Mail, Phone, ExternalLink, Star, MapPin, Award } from 'lucide-react';
import { useTranslation } from '@/shared/hooks/use-translation';
import { Card, CardContent } from '@ui/card';
import { getMatchScoreColor } from '@/entities/offer/lib/getMatchScoreColor';
import { computeExperience } from '@/entities/candidate/lib/computeExperience';
import { formatSpecialistDuration } from '@/entities/specialist/lib/formatSpecialistDuration';
import { useLanguage } from '@/shared/hooks/use-language';
import type { Offer, Specialist } from '@imarketplace/types/entities';

interface SpecialistProfileHeaderProps {
  candidate: Offer<{ specialist: Specialist }>;
}

export function SpecialistProfileHeader({ candidate }: SpecialistProfileHeaderProps) {
  const { t } = useTranslation();
  const lang = useLanguage();
  const specialist = candidate.specialist;

  // Extract information from the specialist object
  const name = specialist.name || `${specialist.firstName || ''} ${specialist.lastName || ''}`.trim();
  const title = specialist.title || specialist.specialization?.name || '';
  const location = (() => {
    const city = specialist.city?.name ?? '';
    const country = specialist.country && typeof specialist?.country === 'object' ? specialist.country.name : (specialist.country as any) ?? '';
    if (city && country) return `${city}, ${country}`;
    return city || country || '';
  })();
  const experience = computeExperience(specialist?.experience || []);
  const avatar = specialist.img || '';
  const email = specialist.contacts?.email || '';
  const phone = specialist.contacts?.phone || '';
  const linkedin = specialist.contacts?.telegram || ''; // Using telegram as a proxy for linkedin if available
  const matchScore = Math.round((candidate.matched || 0) * 100); // Convert to percentage

  return (
    <Card>
      <CardContent className="p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
              {name
                .split(' ')
                .map((n: string) => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
              <h1 className="text-3xl font-bold">{name}</h1>
              <div className={`px-4 py-2 rounded-lg text-sm font-medium border ${getMatchScoreColor(matchScore)} mt-2 md:mt-0`}>
                <Star className="h-4 w-4 inline mr-2" />
                {matchScore}% {t('specialistProfile.match')}
              </div>
            </div>

            <p className="text-xl text-muted-foreground mb-3">{title}</p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {location}
              </div>
              <div className="flex items-center">
                <Award className="h-4 w-4 mr-1" />
                {formatSpecialistDuration(experience, { lang, t })}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <a href={`mailto:${email}`}>
                  <Mail className="h-4 w-4 mr-2" />
                  {t('specialistProfile.contact')}
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href={`tel:${phone}`}>
                  <Phone className="h-4 w-4 mr-2" />
                  {t('specialistProfile.call')}
                </a>
              </Button>
              {linkedin && (
                <Button variant="outline" size="lg" asChild>
                  <a href={`https://t.me/${linkedin}`} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    {t('specialistProfile.linkedin')}
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
