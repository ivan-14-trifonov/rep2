import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Candidate, JobDescription, SearchFilters } from '@/types';
import type { Job } from '@imarketplace/types/entities';
import type { JobFilters } from './types';

interface AppState {
  // Job Description
  jobDescription: JobDescription | null;
  setJobDescription: (job: JobDescription) => void;

  // Candidates
  candidates: Candidate[];
  filteredCandidates: Candidate[];
  selectedCandidate: Candidate | null;
  setCandidates: (candidates: Candidate[]) => void;
  setSelectedCandidate: (candidate: Candidate | null) => void;

  // Search and Filters
  // Jobs
  jobs: Job[];
  filteredJobs: Job[];
  selectedJob: Job | null;
  setJobs: (jobs: Job[]) => void;
  setSelectedJob: (job: Job | null) => void;

  // Job Search and Filters
  jobSearchQuery: string;
  jobFilters: JobFilters;
  setJobSearchQuery: (query: string) => void;
  setJobFilters: (filters: Partial<JobFilters>) => void;
  applyJobFilters: () => void;

  searchQuery: string;
  filters: SearchFilters;
  setSearchQuery: (query: string) => void;
  setFilters: (filters: Partial<SearchFilters>) => void;
  applyFilters: () => void;

  // UI State
  isLoading: boolean;
  error: string | null;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Job Description
      jobDescription: {
        title: '',
        company: '',
        location: '',
        description: '',
        requirements: '',
        skills: [],
      },
      setJobDescription: (jobDescription) => set({ jobDescription }),

      // Candidates
      candidates: [],
      filteredCandidates: [],
      selectedCandidate: null,
      setCandidates: (candidates) => {
        set({ candidates, filteredCandidates: candidates });
        get().applyFilters();
      },
      setSelectedCandidate: (selectedCandidate) => set({ selectedCandidate }),

      // Search and Filters
      // Jobs
      jobs: [],
      filteredJobs: [],
      selectedJob: null,
      setJobs: (jobs) => {
        set({ jobs, filteredJobs: jobs });
        get().applyJobFilters();
      },
      setSelectedJob: (selectedJob) => set({ selectedJob }),

      // Job Search and Filters
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
              job.name?.toLowerCase().includes(jobSearchQuery.toLowerCase()) ||
              job.company.toLowerCase().includes(jobSearchQuery.toLowerCase()) ||
              Object.keys(job.requiredSkills || {}).some((skill) => skill.toLowerCase().includes(jobSearchQuery.toLowerCase())),
          );
        }

        // Location filter
        // @ts-ignore
        if (jobFilters.location) {
          // @ts-ignore
          filtered = filtered.filter((job) => job.location.toLowerCase().includes(jobFilters.location.toLowerCase()));
        }

        // Job type filter
        // @ts-ignore
        if (jobFilters.jobType) {
          // @ts-ignore
          filtered = filtered.filter((job) => job.type === jobFilters.jobType);
        }

        // Salary filter
        // @ts-ignore
        filtered = filtered.filter((job) => job.salary.max >= jobFilters.minSalary && job.salary.min <= jobFilters.maxSalary);

        // Experience filter
        // @ts-ignore
        filtered = filtered.filter((job) => job.experience.max >= jobFilters.minExperience && job.experience.min <= jobFilters.maxExperience);

        // Skills filter
        // @ts-ignore
        if (jobFilters.skills.length > 0) {
          filtered = filtered.filter((job) =>
            // @ts-ignore
            jobFilters.skills.some((skill) => Object.keys(job.requiredSkills || {}).some((jobSkill) => jobSkill.toLowerCase().includes(skill.toLowerCase()))),
          );
        }

        // Remote filter
        // @ts-ignore
        if (jobFilters.remote) {
          // @ts-ignore
          filtered = filtered.filter((job) => job.remote);
        }

        set({ filteredJobs: filtered });
      },

      searchQuery: '',
      filters: {
        location: '',
        minExperience: 0,
        maxExperience: 20,
        skills: [],
        minMatchScore: 0,
      },
      setSearchQuery: (searchQuery) => {
        set({ searchQuery });
        get().applyFilters();
      },
      setFilters: (newFilters) => {
        const filters = { ...get().filters, ...newFilters };
        set({ filters });
        get().applyFilters();
      },
      applyFilters: () => {
        const { candidates, searchQuery, filters } = get();
        let filtered = candidates;

        // Search query filter
        if (searchQuery) {
          filtered = filtered.filter(
            (candidate) =>
              candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              candidate.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              candidate.specialist.skills?.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase())),
          );
        }

        // Location filter
        if (filters.location) {
          filtered = filtered.filter((candidate) => candidate.location.toLowerCase().includes(filters.location.toLowerCase()));
        }

        // Experience filter
        filtered = filtered.filter((candidate) => candidate.experience >= filters.minExperience && candidate.experience <= filters.maxExperience);

        // Skills filter
        if (filters.skills.length > 0) {
          filtered = filtered.filter((candidate) =>
            filters.skills.some((skill) => candidate.specialist.skills?.some((candidateSkill) => candidateSkill.toLowerCase().includes(skill.toLowerCase()))),
          );
        }

        // Match score filter
        filtered = filtered.filter((candidate) => candidate.matchScore >= filters.minMatchScore);

        set({ filteredCandidates: filtered });
      },

      // UI State
      isLoading: false,
      error: null,
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
    }),
    {
      name: 'candidate-search-storage',
      partialize: (state) => ({
        jobDescription: state.jobDescription,
      }),
    },
  ),
);
