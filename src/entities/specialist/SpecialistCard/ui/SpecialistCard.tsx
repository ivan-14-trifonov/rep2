'use client';
import { Card, CardContent } from '@ui/card';
import { Badge } from '@ui/badge';
import { Avatar, AvatarFallback } from '@ui/avatar';
import { MapPin, Star, User } from 'lucide-react';
import plural from 'plural-ru';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/shared/hooks/use-translation';
import type { Candidate } from '@/types';
import type { ReactNode } from 'react';
import { getMatchScoreColor } from '@/entities/offers/lib/getMatchScoreColor';
import { getGradeStyles } from '@/entities/specialist/lib/get-grade-styles';

interface SpecialistCardProps {
  candidate: Candidate;
  footer?: ReactNode;
}

export function SpecialistCard({ candidate, footer }: SpecialistCardProps) {
  const router = useRouter();

  const { t } = useTranslation();


  // New mock stores person under candidate.specialist
  const specialist = candidate.specialist ?? ({} as any);

  const first = String(specialist.firstName ?? '').trim();
  const middle = String(specialist.middleName ?? '').trim();
  const last = String(specialist.lastName ?? '').trim();

  const hasFirst = !!first;
  const hasLast = !!last;

  const nameFallback = t('candidateCard.candidate');

  const firstLine = hasFirst ? (middle ? `${first} ${middle[0]}.` : first) : (hasLast ? last : '');
  const secondLine = hasFirst && hasLast ? last : '';

  const title = specialist.specialization?.name ?? specialist.title ?? '';

  // compute experience (years and months) from specialist.experience array
  const computeExperience = (items: any[] = []) => {
    if (!Array.isArray(items) || items.length === 0) return { years: 0, months: 0 };
    let totalMonths = 0;
    const now = new Date();
    for (const it of items) {
      try {
        const start = it.start ? new Date(it.start) : null;
        const end = it.end ? new Date(it.end) : now;
        if (start) {
          const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
          totalMonths += Math.max(0, months);
        }
      } catch (e) {
        // ignore malformed dates
      }
    }
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;
    return { years, months };
  };

  const experience = computeExperience(specialist.experience);

  // detect locale: prefer translation hook if it provides locale, otherwise page lang or navigator
  const getLocale = () => {
    // try to get from translation hook if it exposes locale
    // @ts-ignore
    const maybeLocale = (t as any)?.locale ?? typeof document !== 'undefined' ? document.documentElement.lang : undefined;
    if (maybeLocale) return String(maybeLocale);
    if (typeof navigator !== 'undefined') return navigator.language;
    return 'en';
  };

  const formatDuration = (d: { years: number; months: number }) => {
    const locale = getLocale();
    const y = d.years;
    const m = d.months;
    const prefix = t('candidateCard.experience');

    if (locale && locale.startsWith('ru')) {
      const yWord = plural(y, t('candidateCard.year_one') || 'год', t('candidateCard.year_few') || 'года', t('candidateCard.year_many') || 'лет');
      const mWord = plural(m, t('candidateCard.month_one') || 'месяц', t('candidateCard.month_few') || 'месяца', t('candidateCard.month_many') || 'месяцев');
      return `${prefix}: ${y} ${yWord} ${m} ${mWord}`;
    }

    const yearWord = y === 1 ? (t('candidateCard.year_one') || 'year') : (t('candidateCard.years') || 'years');
    const monthWord = m === 1 ? (t('candidateCard.month_one') || 'month') : (t('candidateCard.month_few') || 'months');
    return `${prefix}: ${y} ${yearWord} ${m} ${monthWord}`;
  };

  const location = (() => {
    const city = specialist.city?.name ?? '';
    const country = specialist.country && typeof specialist.country === 'object' ? specialist.country.name : (specialist.country as any) ?? '';
    if (city && country) return `${city}, ${country}`;
    return city || country || '';
  })();

  const summary = candidate.comment ?? '';

  // matchScore derived from candidate.matched (0..1) -> percent rounded, fallback 0
  const matchScore = typeof (candidate as any).matched === 'number' ? Math.round((candidate as any).matched * 100) : 0;

  const normalizeGrade = (g: any) => {
    const raw = String((g && g.name) ? g.name : '').toLowerCase();
    if (!raw) return 'unknown';
    if (raw.includes('jun')) return 'Junior';
    if (raw.includes('mid') || raw.includes('middle')) return 'Middle';
    if (raw.includes('senior')) return 'Senior';
    if (raw.includes('lead')) return 'Lead';
    return 'unknown';
  };

  return (
    <Card className={`group hover:shadow-lg transition-all duration-200 hover:-translate-y-1 flex flex-col h-[400px] border ${getGradeStyles(specialist.grade?.name).border}`}>
      <CardContent className="p-6 flex flex-col grow">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback className={`${getGradeStyles(specialist.grade?.name).bg} text-white`}>
                <User className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                {firstLine || secondLine ? (
                  secondLine ? (
                    <span className="leading-tight">
                      <span>{firstLine}</span>
                      <br />
                      <span>{secondLine}</span>
                    </span>
                  ) : (
                    <span>{firstLine}</span>
                  )
                ) : (
                  <span>{nameFallback}</span>
                )}
              </h3>
              <p className="text-sm text-black">{title}</p>
            </div>
          </div>
          <div className={`px-2 py-1 rounded-lg text-xs font-medium ${getMatchScoreColor(matchScore)}`}>
            {matchScore}%
          </div>
        </div>

        {/* Grade, Location & Experience */}
        <div className="mb-4 text-sm">
          {specialist.grade?.name ? (
            <div className="mb-2">
              <Badge className={`${getGradeStyles(specialist.grade.name).bg} text-white`}>
                {specialist.grade.name}
              </Badge>
            </div>
          ) : null}
          <div className="space-y-1">
            <div>{formatDuration(experience)}</div>
            {location && String(location).trim() && (
              <div className="flex items-center text-sm">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{location}</span>
              </div>
            )}
          </div>
        </div>


        {/* Summary */}
  <p className="text-sm text-muted-foreground mb-4 line-clamp-4 break-words">{summary}</p>

        {/* Actions */}
        {footer && footer}
      </CardContent>
    </Card>
  );
}
