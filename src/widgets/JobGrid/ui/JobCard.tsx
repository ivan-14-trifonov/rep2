'use client';

import { useTranslation } from '@/shared/hooks/use-translation';
import { Badge } from '@/shared/ui/badge';
import { Card, CardContent } from '@/shared/ui/card';
import { Building, Calendar, Clock, DollarSign, ExternalLink, MapPin, Users } from 'lucide-react';
import type { Job } from '@imarketplace/types/entities';
import type { ReactNode } from 'react';

interface JobCardProps {
  job: Job;
  footer?: ReactNode;
}

export function JobCard({ job, footer }: JobCardProps) {
  const { t } = useTranslation();

  const getJobTypeTranslation = (type: string) => {
    switch (type) {
      case 'Full-time':
        return t('jobCard.fullTime');
      case 'Part-time':
        return t('jobCard.partTime');
      case 'Contract':
        return t('jobCard.contract');
      case 'Remote':
        return t('jobCard.remote');
      default:
        return type;
    }
  };

  const getJobTypeColor = (type: string) => {
    switch (type) {
      case 'Full-time':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Part-time':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Contract':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'Remote':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const formatSalary = (job: Job) => {
    const { min, max, currency } = job.salary;
    if (job.type === 'Contract') {
      return `${min}-${max}${t('jobCard.perHour')}`;
    }
    return `${(min / 1000).toFixed(0)}k-${(max / 1000).toFixed(0)}k`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return `1 ${t('jobCard.dayAgo')}`;
    if (diffDays < 7) return `${diffDays} ${t('jobCard.daysAgo')}`;
    if (diffDays < 30) {
      const weeks = Math.ceil(diffDays / 7);
      return `${weeks} ${weeks === 1 ? t('jobCard.weekAgo') : t('jobCard.weeksAgo')}`;
    }
    const months = Math.ceil(diffDays / 30);
    return `${months} ${months === 1 ? t('jobCard.monthAgo') : t('jobCard.monthsAgo')}`;
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-1 h-[480px]">
      <CardContent className="p-6 flex flex-col h-full">
        <div>
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="font-semibold text-lg group-hover:text-primary transition-colors mb-1">{job.title}</h3>
              <div className="flex items-center text-muted-foreground text-sm mb-2 whitespace-nowrap">
                <Building className="h-4 w-4 mr-1" />
                {job.company}
              </div>
            </div>
            <div className={`px-2 py-1 rounded-lg text-xs font-medium border ${getJobTypeColor(job.type)}`}>{getJobTypeTranslation(job.type)}</div>
          </div>

          {/* Location & Remote */}
          <div className="flex items-center space-x-4 mb-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              {job.location}
            </div>
            {job.remote && (
              <Badge variant="outline" className="text-xs">
                {t('jobCard.remote')}
              </Badge>
            )}
          </div>

          {/* Salary & Experience */}
          <div className="flex items-center space-x-4 mb-4 text-sm">
            <div className="flex items-center text-green-600">
              <DollarSign className="h-4 w-4 mr-1" />
              {formatSalary(job)}
            </div>
            <div className="flex items-center text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              {job.experience.min}-{job.experience.max} {t('jobCard.years')} {t('jobCard.experience')}
            </div>
          </div>

          {/* Skills */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {job.skills.slice(0, 4).map((skill) => (
                <Badge key={skill} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {job.skills.length > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{job.skills.length - 4} {t('candidateCard.more')}
                </Badge>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{job.description}</p>
        </div>

        {/* Footer */}
        <div className="flex flex-col space-y-4 mt-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
              <div className="flex items-center">
                <Users className="h-3 w-3 mr-1" />
                {job.applicants} {t('jobCard.applicants')}
              </div>
              <div className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                {formatDate(job.postedDate)}
              </div>
            </div>
          </div>

          {footer && footer}
        </div>
      </CardContent>
    </Card>
  );
}
