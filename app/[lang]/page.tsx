'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PageLayout } from '@/components/layout/PageLayout';
import { JobDescriptionForm } from '@/components/forms/JobDescriptionForm';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Users, Target, Clock } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { useTranslation } from '@/hooks/use-translation';

export default function HomePage() {
  const { isAuthenticated } = useAppStore();
  const router = useRouter();

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     router.push('/login');
  //   }
  // }, [isAuthenticated, router]);

  // if (!isAuthenticated) {
  //   return null;
  // }

  const features = [
    {
      icon: Search,
      title: 'Smart Matching',
      description: 'AI-powered candidate matching based on job requirements',
    },
    {
      icon: Users,
      title: 'Talent Pool',
      description: 'Access to thousands of pre-screened candidates',
    },
    {
      icon: Target,
      title: 'Precise Filtering',
      description: 'Filter by skills, experience, location, and more',
    },
    {
      icon: Clock,
      title: 'Quick Results',
      description: 'Get matched candidates in seconds, not days',
    },
  ];

  const { t } = useTranslation();

  return (
    <PageLayout maxWidth="xl">
      <div className="space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="space-y-4">
            <Badge variant="secondary" className="text-sm px-4 py-2">
              ✨ ${t('home.poweredByAIMatching')}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Find Your Perfect
              <span className="text-primary"> Candidate</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Describe your job requirements and get matched with the best candidates from our curated talent pool in seconds.
            </p>
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
            <div className="text-muted-foreground">Candidates</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">95%</div>
            <div className="text-muted-foreground">Match Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">24hrs</div>
            <div className="text-muted-foreground">Average Hire Time</div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
