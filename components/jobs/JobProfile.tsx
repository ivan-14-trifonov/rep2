'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  MapPin, 
  Building, 
  DollarSign, 
  Clock, 
  Users, 
  Calendar,
  CheckCircle,
  ExternalLink,
  Mail,
  Heart,
  Share
} from 'lucide-react';
import type { Job } from '@/lib/types';
import { useTranslation } from '@/hooks/use-translation';

interface JobProfileProps {
  job: Job;
}

export function JobProfile({ job }: JobProfileProps) {
  const { t } = useTranslation();

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
      return `${min}-${max}${t('jobProfile.hr')}`;
    }
    return `${(min / 1000).toFixed(0)}k-${(max / 1000).toFixed(0)}k ${t('jobProfile.annually')}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Card */}
      <Card>
        <CardContent className="p-8">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col md:flex-row md:items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-3xl font-bold">{job.title}</h1>
                  <div className={`px-3 py-1 rounded-lg text-sm font-medium border ${getJobTypeColor(job.type)}`}>
                    {job.type}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 mb-4">
                  <Building className="h-5 w-5 text-muted-foreground" />
                  <span className="text-xl text-muted-foreground">{job.company}</span>
                </div>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {job.location}
                  </div>
                  {job.remote && (
                    <Badge variant="outline">{t('jobProfile.remote')}</Badge>
                  )}
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {job.experience.min}-{job.experience.max} {t('jobProfile.experience')}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {job.applicants} {t('jobProfile.applicants')}
                  </div>
                </div>

                <div className="flex items-center text-green-600 text-lg font-semibold mb-6">
                  <DollarSign className="h-5 w-5 mr-1" />
                  {formatSalary(job)}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button size="lg" className="flex-1 md:flex-none">
                <ExternalLink className="h-4 w-4 mr-2" />
                {t('jobProfile.applyNow')}
              </Button>
              <Button variant="outline" size="lg">
                <Heart className="h-4 w-4 mr-2" />
                {t('jobProfile.saveJob')}
              </Button>
              <Button variant="outline" size="lg">
                <Share className="h-4 w-4 mr-2" />
                {t('jobProfile.share')}
              </Button>
              <Button variant="outline" size="lg">
                <Mail className="h-4 w-4 mr-2" />
                {t('jobProfile.contactHR')}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="md:col-span-2 space-y-6">
          {/* Job Description */}
          <Card>
            <CardHeader>
              <CardTitle>{t('jobProfile.jobDescription')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {job.description}
              </p>
            </CardContent>
          </Card>

          {/* Requirements */}
          <Card>
            <CardHeader>
              <CardTitle>{t('jobProfile.requirements')}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {job.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{requirement}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Benefits */}
          <Card>
            <CardHeader>
              <CardTitle>{t('jobProfile.benefitsAndPerks')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {job.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Job Details */}
          <Card>
            <CardHeader>
              <CardTitle>{t('jobProfile.jobDetails')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{t('jobProfile.posted')}</span>
                <span className="font-medium">{formatDate(job.postedDate)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{t('jobProfile.deadline')}</span>
                <span className="font-medium">{formatDate(job.applicationDeadline)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{t('jobProfile.jobType')}</span>
                <span className="font-medium">{job.type}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{t('jobProfile.experience')}</span>
                <span className="font-medium">{job.experience.min}-{job.experience.max} {t('jobProfile.years')}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{t('jobProfile.applicants')}</span>
                <span className="font-medium">{job.applicants}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{t('jobProfile.status')}</span>
                <Badge variant={job.status === 'Open' ? 'default' : 'secondary'}>
                  {job.status}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Required Skills */}
          <Card>
            <CardHeader>
              <CardTitle>{t('jobProfile.requiredSkills')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Company Info */}
          <Card>
            <CardHeader>
              <CardTitle>{t('jobProfile.aboutCompany')} {job.company}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{t('jobProfile.technologyCompany')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{job.location}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {t('jobProfile.aboutCompanyDescription')}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Apply Button */}
          <Card>
            <CardContent className="p-4">
              <Button className="w-full" size="lg">
                <ExternalLink className="h-4 w-4 mr-2" />
                {t('jobProfile.applyForPosition')}
              </Button>
              <p className="text-xs text-muted-foreground text-center mt-2">
                {t('jobProfile.applyRedirect')}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
