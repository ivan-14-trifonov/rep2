'use client';
import { Card, CardContent } from '@ui/card';
import { Badge } from '@ui/badge';
import { Avatar, AvatarFallback } from '@ui/avatar';
import { MapPin, Star, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/shared/hooks/use-translation';
import type { Candidate } from '@/types';
import type { ReactNode } from 'react';
import { getMatchScoreColor } from '@/entities/offer/lib/getMatchScoreColor';
import { getGradeStyles } from '@/entities/specialist/lib/getGradeStyles';
import { computeExperience } from '@/entities/candidate/lib/computeExperience';
import { getOfferMatchScore } from '@/entities/offer/lib/getOfferMatchScore';
import { useLanguage } from '@/shared/hooks/use-language';
import { formatSpecialistDuration } from '@/entities/specialist/lib/formatSpecialistDuration';

interface SpecialistCardProps {
  candidate: Candidate;
  footer?: ReactNode;
}

export function SpecialistCard({ candidate, footer }: SpecialistCardProps) {
  const router = useRouter();

  const { t } = useTranslation();

  const lang = useLanguage();

  // New mock stores person under candidate.specialist
  const specialist = candidate.specialist ?? ({} as any);

  const first = String(specialist.firstName ?? '').trim();
  const middle = String(specialist.middleName ?? '').trim();
  const last = String(specialist.lastName ?? '').trim();

  const hasFirst = !!first;
  const hasLast = !!last;

  const nameFallback = t('candidateCard.candidate');

  const firstLine = hasFirst ? (middle ? `${first} ${middle[0]}.` : first) : hasLast ? last : '';
  const secondLine = hasFirst && hasLast ? last : '';

  const title = specialist.specialization?.name ?? specialist.title ?? '';

  // compute experience (years and months) from specialist.experience array
  const experience = computeExperience(specialist.experience);

  const location = (() => {
    const city = specialist.city?.name ?? '';
    const country = specialist.country && typeof specialist.country === 'object' ? specialist.country.name : ((specialist.country as any) ?? '');
    if (city && country) return `${city}, ${country}`;
    return city || country || '';
  })();

  const summary = candidate.comment ?? '';

  // matchScore derived from candidate.matched (0..1) -> percent rounded, fallback 0
  const matchScore = getOfferMatchScore(candidate);

  return (
    <Card
      className={`group hover:shadow-lg transition-all duration-200 hover:-translate-y-1 flex flex-col border ${getGradeStyles(specialist.grade?.name).border}`}
    >
      <CardContent className="p-6 flex flex-col grow justify-between">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-3">
            <Avatar className="h-12 w-12 mt-1">
              <AvatarFallback className={`${getGradeStyles(specialist.grade?.name).bg} text-white`}>
                <User className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col justify-start min-h-[3rem]">
              <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                {secondLine ? (
                  <span className="leading-tight">
                    <span>{firstLine}</span>
                    <br />
                    <span>{secondLine}</span>
                  </span>
                ) : (
                  <span>{firstLine || nameFallback}</span>
                )}
              </h3>
            </div>
          </div>
          <div className={`px-2 py-1 rounded-lg text-xs font-medium ${getMatchScoreColor(matchScore)}`}>{matchScore}%</div>
        </div>

        <div>
          {/* Title and Grade */}
          {(title || specialist.grade?.name) && (
            <div className="flex items-center justify-between mb-4">
              {title && <p className="text-sm text-black flex-grow mr-2 leading-5 line-clamp-2">{title}</p>}
              {specialist.grade?.name && <Badge className={`${getGradeStyles(specialist.grade.name).bg} text-white`}>{specialist.grade.name}</Badge>}
            </div>
          )}

          {/* Location & Experience */}
          <div className="mb-4 text-sm">
            <div className="space-y-1 min-h-[3.5rem] flex flex-col justify-start">
              <div>{formatSpecialistDuration(experience, { lang, t }) || <div className="h-4">&nbsp;</div>}</div>
              {location && String(location).trim() ? (
                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{location}</span>
                </div>
              ) : (
                <div className="h-4">&nbsp;</div>
              )}
            </div>
          </div>

          {/* Summary */}
          <div className="mb-8 flex items-start">
            <p className="text-sm text-muted-foreground line-clamp-4 break-words overflow-hidden leading-4 min-h-[4rem]">{summary || '\u00A0'}</p>
          </div>
        </div>

        {/* Actions */}
        <div>{footer && footer}</div>
      </CardContent>
    </Card>
  );
}
