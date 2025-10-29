import { create } from 'zustand';
import type { Job, JobFilters } from '@/types';

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
          job.title.toLowerCase().includes(jobSearchQuery.toLowerCase()) ||
          job.company.toLowerCase().includes(jobSearchQuery.toLowerCase()) ||
          // @ts-ignore
          job.skills.some((skill) => skill.toLowerCase().includes(jobSearchQuery.toLowerCase())),
      );
    }

    // Location filter
    if (jobFilters.location) {
      filtered = filtered.filter((job) => job.location.toLowerCase().includes(jobFilters.location.toLowerCase()));
    }

    // Job type filter
    if (jobFilters.jobType) {
      filtered = filtered.filter((job) => job.type === jobFilters.jobType);
    }

    // Salary filter
    filtered = filtered.filter((job) => job.salary.max >= jobFilters.minSalary && job.salary.min <= jobFilters.maxSalary);

    // Experience filter
    filtered = filtered.filter((job) => job.experience.max >= jobFilters.minExperience && job.experience.min <= jobFilters.maxExperience);

    // Skills filter
    if (jobFilters.skills.length > 0) {
      filtered = filtered.filter((job) =>
        // @ts-ignore
        jobFilters.skills.some((skill) => job.skills.some((jobSkill) => jobSkill.toLowerCase().includes(skill.toLowerCase()))),
      );
    }

    // Remote filter
    if (jobFilters.remote) {
      filtered = filtered.filter((job) => job.remote);
    }

    set({ filteredJobs: filtered });
  },
}));