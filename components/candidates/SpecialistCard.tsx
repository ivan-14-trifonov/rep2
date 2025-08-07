'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, Star, Mail, Phone, ExternalLink } from 'lucide-react';
import type { Candidate } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';

interface SpecialistCardProps {
  candidate: Candidate;
}

export function SpecialistCard({ candidate }: SpecialistCardProps) {
  const router = useRouter();
  const { setSelectedCandidate } = useAppStore();

  const handleViewProfile = () => {
    setSelectedCandidate(candidate);
    router.push(`/candidate/${candidate.id}`);
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-50';
    if (score >= 80) return 'text-blue-600 bg-blue-50';
    if (score >= 70) return 'text-yellow-600 bg-yellow-50';
    return 'text-gray-600 bg-gray-50';
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={candidate.avatar} alt={candidate.name} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {candidate.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                {candidate.name}
              </h3>
              <p className="text-muted-foreground text-sm">{candidate.title}</p>
            </div>
          </div>
          <div className={`px-2 py-1 rounded-lg text-xs font-medium ${getMatchScoreColor(candidate.matchScore)}`}>
            <Star className="h-3 w-3 inline mr-1" />
            {candidate.matchScore}%
          </div>
        </div>

        {/* Location & Experience */}
        <div className="flex items-center space-x-4 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            {candidate.location}
          </div>
          <div>
            {candidate.experience} years exp.
          </div>
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
                +{candidate.skills.length - 4} more
              </Badge>
            )}
          </div>
        </div>

        {/* Match Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {candidate.matchDescription}
        </p>

        {/* Actions */}
        <div className="flex space-x-2">
          <Button onClick={handleViewProfile} className="flex-1" size="sm">
            View Profile
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a href={`mailto:${candidate.email}`}>
              <Mail className="h-4 w-4" />
            </a>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a href={candidate.linkedin} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}