'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  MapPin, 
  Star, 
  Mail, 
  Phone, 
  ExternalLink, 
  Building, 
  Calendar,
  GraduationCap,
  Award
} from 'lucide-react';
import type { Candidate } from '@/lib/types';

interface SpecialistProfileProps {
  candidate: Candidate;
}

export function SpecialistProfile({ candidate }: SpecialistProfileProps) {
  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 80) return 'text-blue-600 bg-blue-50 border-blue-200';
    if (score >= 70) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-gray-600 bg-gray-50 border-gray-200';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Card */}
      <Card>
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={candidate.avatar} alt={candidate.name} />
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                {candidate.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                <h1 className="text-3xl font-bold">{candidate.name}</h1>
                <div className={`px-4 py-2 rounded-lg text-sm font-medium border ${getMatchScoreColor(candidate.matchScore)} mt-2 md:mt-0`}>
                  <Star className="h-4 w-4 inline mr-2" />
                  {candidate.matchScore}% Match
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
                  {candidate.experience} years experience
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button size="lg" asChild>
                  <a href={`mailto:${candidate.email}`}>
                    <Mail className="h-4 w-4 mr-2" />
                    Contact
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href={`tel:${candidate.phone}`}>
                    <Phone className="h-4 w-4 mr-2" />
                    Call
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href={candidate.linkedin} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    LinkedIn
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="md:col-span-2 space-y-6">
          {/* Match Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="h-5 w-5 mr-2" />
                Why This Candidate Matches
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {candidate.matchDescription}
              </p>
            </CardContent>
          </Card>

          {/* Professional Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Professional Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {candidate.summary}
              </p>
            </CardContent>
          </Card>

          {/* Work Experience */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="h-5 w-5 mr-2" />
                Work Experience
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {candidate.previousRoles.map((role, index) => (
                <div key={index}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                    <h4 className="font-semibold text-lg">{role.position}</h4>
                    <Badge variant="outline" className="w-fit">
                      <Calendar className="h-3 w-3 mr-1" />
                      {role.duration}
                    </Badge>
                  </div>
                  <p className="text-primary font-medium mb-2">{role.company}</p>
                  <p className="text-muted-foreground leading-relaxed">
                    {role.description}
                  </p>
                  {index < candidate.previousRoles.length - 1 && (
                    <Separator className="mt-6" />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Education */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <GraduationCap className="h-5 w-5 mr-2" />
                Education
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {candidate.education.map((edu, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">{edu.degree}</h4>
                    <p className="text-muted-foreground">{edu.institution}</p>
                  </div>
                  <Badge variant="outline">{edu.year}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a 
                  href={`mailto:${candidate.email}`}
                  className="text-sm hover:text-primary transition-colors"
                >
                  {candidate.email}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <a 
                  href={`tel:${candidate.phone}`}
                  className="text-sm hover:text-primary transition-colors"
                >
                  {candidate.phone}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
                <a 
                  href={candidate.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-primary transition-colors"
                >
                  LinkedIn Profile
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle>Key Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Experience</span>
                <span className="font-semibold">{candidate.experience} years</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Match Score</span>
                <span className="font-semibold">{candidate.matchScore}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Skills</span>
                <span className="font-semibold">{candidate.skills.length}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}