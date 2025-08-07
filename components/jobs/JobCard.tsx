"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Building,
  DollarSign,
  Clock,
  Users,
  Calendar,
  ExternalLink,
} from "lucide-react";
import type { Job } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  const router = useRouter();
  const { setSelectedJob } = useAppStore();

  const handleViewJob = () => {
    setSelectedJob(job);
    router.push(`/job/${job.id}`);
  };

  const getJobTypeColor = (type: string) => {
    switch (type) {
      case "Full-time":
        return "bg-green-50 text-green-700 border-green-200";
      case "Part-time":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Contract":
        return "bg-orange-50 text-orange-700 border-orange-200";
      case "Remote":
        return "bg-purple-50 text-purple-700 border-purple-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const formatSalary = (job: Job) => {
    const { min, max, currency } = job.salary;
    if (job.type === "Contract") {
      return `$${min}-${max}/hr`;
    }
    return `$${(min / 1000).toFixed(0)}k-${(max / 1000).toFixed(0)}k`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-1 h-[420px]">
      <CardContent className="p-6 flex flex-col h-full">
        <div>
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="font-semibold text-lg group-hover:text-primary transition-colors mb-1">
                {job.title}
              </h3>
              <div className="flex items-center text-muted-foreground text-sm mb-2">
                <Building className="h-4 w-4 mr-1" />
                {job.company}
              </div>
            </div>
            <div
              className={`px-2 py-1 rounded-lg text-xs font-medium border ${getJobTypeColor(
                job.type
              )}`}
            >
              {job.type}
            </div>
          </div>

          {/* Location & Remote */}
          <div className="flex items-center space-x-4 mb-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              {job.location}
            </div>
            {job.remote && (
              <Badge variant="outline" className="text-xs">
                Remote
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
              {job.experience.min}-{job.experience.max} years
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
                  +{job.skills.length - 4} more
                </Badge>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {job.description}
          </p>
        </div>

        {/* Footer */}
        <div className="flex flex-col space-y-4 mt-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
              <div className="flex items-center">
                <Users className="h-3 w-3 mr-1" />
                {job.applicants} applicants
              </div>
              <div className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                {formatDate(job.postedDate)}
              </div>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button className="flex-1" size="sm" onClick={handleViewJob}>
              View Details
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
