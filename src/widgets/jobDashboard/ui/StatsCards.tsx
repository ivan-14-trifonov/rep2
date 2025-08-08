'use client';

import { Briefcase, TrendingUp, MapPin } from 'lucide-react';
import { useTranslation } from '@/shared/hooks/use-translation';
import { Card, CardContent } from '@ui/card';

interface StatsCardsProps {
  totalJobs: number;
  openJobs: number;
  remoteJobs: number;
}

export function StatsCards({ totalJobs, openJobs, remoteJobs }: StatsCardsProps) {
  const { t } = useTranslation();

  const stats = [
    {
      icon: <Briefcase className="h-8 w-8 text-primary" />,
      value: totalJobs,
      label: t('jobs.totalJobs'),
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-green-600" />,
      value: openJobs,
      label: t('jobs.openPositions'),
    },
    {
      icon: <MapPin className="h-8 w-8 text-blue-600" />,
      value: remoteJobs,
      label: t('jobs.remoteJobs'),
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              {stat.icon}
              <div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
