'use client';
import { Card, CardContent } from '@ui/card';
import { Badge } from '@ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@ui/avatar';
import { MapPin, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/shared/hooks/use-translation';
import type { Candidate } from '@/types';
import type { ReactNode } from 'react';

interface SpecialistCardProps {
  candidate: Candidate;
  footer?: ReactNode;
}

export function SpecialistCard({ candidate, footer }: SpecialistCardProps) {
  const router = useRouter();

  const { t } = useTranslation();

  const getMatchScoreColor = (score: number) => {
    return score >= 80 ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50';
  };

  const displayName = candidate.name && candidate.name.trim() ? candidate.name : t('candidateCard.candidate');
  const initials = displayName
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-1 flex flex-col h-[400px]">
      <CardContent className="p-6 flex flex-col grow">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={candidate.avatar} alt={displayName} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{displayName}</h3>
              <p className="text-sm text-black">{candidate.title}</p>
            </div>
          </div>
          <div className={`px-2 py-1 rounded-lg text-xs font-medium ${getMatchScoreColor(candidate.matchScore)}`}>
            <Star className="h-3 w-3 inline mr-1" />
            {candidate.matchScore}%
          </div>
        </div>

        {/* Location & Experience */}
        <div className="flex items-center space-x-4 mb-4 text-sm">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            {candidate.location}
          </div>
          <div>{`${t('candidateCard.experience')}: ${candidate.experience} ${t('candidateCard.years')}`}</div>
        </div>

        {/* Skills */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {candidate.skills.slice(0, 4).map((skill) => (
              <Badge key={skill} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
            {candidate.skills.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{candidate.skills.length - 4} {t('candidateCard.more')}
              </Badge>
            )}
          </div>
        </div>

        {/* Match Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 grow">{candidate.matchDescription}</p>

        {/* Actions */}
        {footer && footer}
      </CardContent>
    </Card>
  );
}
