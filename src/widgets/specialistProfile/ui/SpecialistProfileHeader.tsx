'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@ui/avatar';
import { Button } from '@ui/button';
import { Mail, Phone, ExternalLink, Star, MapPin, Award } from 'lucide-react';
import { useTranslation } from '@/shared/hooks/use-translation';
import { Card, CardContent } from '@ui/card';
import { getMatchScoreColor } from '../lib/getMatchScore';
import type { Candidate } from '@/types';

interface SpecialistProfileHeaderProps {
  candidate: Candidate;
}

export function SpecialistProfileHeader({ candidate }: SpecialistProfileHeaderProps) {
  const { t } = useTranslation();

  return (
    <Card>
      <CardContent className="p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src={candidate.avatar} alt={candidate.name} />
            <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
              {candidate.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
              <h1 className="text-3xl font-bold">{candidate.name}</h1>
              <div className={`px-4 py-2 rounded-lg text-sm font-medium border ${getMatchScoreColor(candidate.matchScore)} mt-2 md:mt-0`}>
                <Star className="h-4 w-4 inline mr-2" />
                {candidate.matchScore}% {t('specialistProfile.match')}
              </div>
            </div>

            <p className="text-xl text-muted-foreground mb-3">{candidate.title}</p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {candidate.location}
              </div>
              <div className="flex items-center">
                <Award className="h-4 w-4 mr-1" />
                {candidate.experience} {t('specialistProfile.yearsExperience')}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <a href={`mailto:${candidate.email}`}>
                  <Mail className="h-4 w-4 mr-2" />
                  {t('specialistProfile.contact')}
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href={`tel:${candidate.phone}`}>
                  <Phone className="h-4 w-4 mr-2" />
                  {t('specialistProfile.call')}
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href={candidate.linkedin} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  {t('specialistProfile.linkedin')}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
