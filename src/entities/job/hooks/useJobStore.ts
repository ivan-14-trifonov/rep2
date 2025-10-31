import { create } from 'zustand';
import type { Job } from '@imarketplace/types/entities';

interface JobFilters {
  location: string;
  jobType: string;
  minSalary: number;
  maxSalary: number;
  skills: string[];
  remote: boolean;
  minExperience: number;
  maxExperience: number;
}

interface JobState {
  jobs: Job[];
  filteredJobs: Job[];
  selectedJob: Job | null;
  jobSearchQuery: string;
  jobFilters: JobFilters;
  setJobs: (jobs: Job[]) => void;
  setSelectedJob: (job: Job | null) => void;
  setJobSearchQuery: (query: string) => void;
  setJobFilters: (filters: Partial<JobFilters>) => void;
  applyJobFilters: () => void;
}

export const useJobStore = create<JobState>((set, get) => ({
  jobs: [],
  filteredJobs: [],
  selectedJob: null,
  jobSearchQuery: '',
  jobFilters: {
    location: '',
    jobType: '',
    minSalary: 0,
    maxSalary: 500000,
    skills: [],
    remote: false,
    minExperience: 0,
    maxExperience: 20,
  },
  setJobs: (jobs) => {
    set({ jobs, filteredJobs: jobs });
    get().applyJobFilters();
  },
  setSelectedJob: (selectedJob) => set({ selectedJob }),
  setJobSearchQuery: (jobSearchQuery) => {
    set({ jobSearchQuery });
    get().applyJobFilters();
  },
  setJobFilters: (newFilters) => {
    const jobFilters = { ...get().jobFilters, ...newFilters };
    set({ jobFilters });
    get().applyJobFilters();
  },
  applyJobFilters: () => {
    const { jobs, jobSearchQuery, jobFilters } = get();
    let filtered = jobs;

    // Search query filter
    if (jobSearchQuery) {
      filtered = filtered.filter(
        (job) =>
          (job.name && job.name.toLowerCase().includes(jobSearchQuery.toLowerCase())) ||
          (typeof job.company === 'object' &&
            job.company !== null &&
            job.company.name &&
            job.company.name.toLowerCase().includes(jobSearchQuery.toLowerCase())) ||
          (Array.isArray(job.requiredSkills) &&
            job.requiredSkills.some((skill: any) => skill.toLowerCase().includes(jobSearchQuery.toLowerCase())))
      );
    }

    // Location filter
    if (jobFilters.location) {
      filtered = filtered.filter(
        (job) =>
          typeof job.city === 'object' &&
          job.city !== null &&
          job.city.name &&
          job.city.name.toLowerCase().includes(jobFilters.location.toLowerCase())
      );
    }

    // Job type filter
    if (jobFilters.jobType) {
      filtered = filtered.filter((job) => job.employmentType === jobFilters.jobType);
    }

    // Salary filter
    filtered = filtered.filter(
      (job) =>
        job.amount && job.amount >= jobFilters.minSalary && job.amount <= jobFilters.maxSalary
    );

    // Skills filter
    if (jobFilters.skills.length > 0) {
      filtered = filtered.filter(
        (job) =>
          Array.isArray(job.requiredSkills) &&
          jobFilters.skills.some((skill) =>
            (job.requiredSkills as any[]).some((jobSkill) => jobSkill.toLowerCase().includes(skill.toLowerCase()))
          )
      );
    }

    // Remote filter
    if (jobFilters.remote) {
      filtered = filtered.filter((job) => job.workFormat === 'remote');
    }

    set({ filteredJobs: filtered });
  },
}));