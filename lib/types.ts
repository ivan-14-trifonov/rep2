export interface Candidate {
  id: string;
  name: string;
  title: string;
  location: string;
  avatar: string;
  skills: string[];
  experience: number;
  matchScore: number;
  matchDescription: string;
  email: string;
  phone: string;
  linkedin: string;
  summary: string;
  previousRoles: Array<{
    company: string;
    position: string;
    duration: string;
    description: string;
  }>;
  education: Array<{
    institution: string;
    degree: string;
    year: string;
  }>;
}

export interface JobDescription {
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string;
  skills: string[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  company: string;
}

export interface SearchFilters {
  location: string;
  minExperience: number;
  maxExperience: number;
  skills: string[];
  minMatchScore: number;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  description: string;
  requirements: string[];
  skills: string[];
  experience: {
    min: number;
    max: number;
  };
  postedDate: string;
  applicationDeadline: string;
  applicants: number;
  status: 'Open' | 'Closed' | 'Draft';
  benefits: string[];
  remote: boolean;
}

export interface JobFilters {
  location: string;
  jobType: string;
  minSalary: number;
  maxSalary: number;
  skills: string[];
  remote: boolean;
  minExperience: number;
  maxExperience: number;
}