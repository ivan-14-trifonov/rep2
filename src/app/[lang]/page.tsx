'use client';

import { PageLayout } from '@/shared/components/layout/PageLayout';
import { useAuth } from '@/shared/hooks/use-auth';
import { useTranslation } from '@/shared/hooks/use-translation';
import { Badge } from '@ui/badge';
import { Search, Users, Target, Clock } from 'lucide-react';
import { Card, CardContent } from '@ui/card';
import { JobDescriptionForm } from '@/widgets/jobDescriptionForm';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HomePage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (!isAuthenticated && !isLoading) {
    return null;
  }

  const { t } = useTranslation();

  const features = [
    {
      icon: Search,
      title: t('home.features.smartMatching.title'),
      description: t('home.features.smartMatching.description'),
    },
    {
      icon: Users,
      title: t('home.features.talentPool.title'),
      description: t('home.features.talentPool.description'),
    },
    {
      icon: Target,
      title: t('home.features.preciseFiltering.title'),
      description: t('home.features.preciseFiltering.description'),
    },
    {
      icon: Clock,
      title: t('home.features.quickResults.title'),
      description: t('home.features.quickResults.description'),
    },
  ];

  return (
    <PageLayout maxWidth="xl">
      <div className="space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="space-y-4">
            <Badge variant="secondary" className="text-sm px-4 py-2">
              ✨ {t('home.poweredByAIMatching')}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              {t('home.title.findYourPerfect')}
              <span className="text-primary">{t('home.title.candidate')}</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">{t('home.description')}</p>
          </div>
        </div>

        {/* Job Description Form */}
        <div className="flex justify-center">
          <JobDescriptionForm />
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="text-center group hover:shadow-md transition-all duration-200">
                <CardContent className="p-6">
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-8 py-12 border-t">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">10K+</div>
            <div className="text-muted-foreground">{t('home.stats.candidates')}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">95%</div>
            <div className="text-muted-foreground">{t('home.stats.matchAccuracy')}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">24hrs</div>
            <div className="text-muted-foreground">{t('home.stats.averageHireTime')}</div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
