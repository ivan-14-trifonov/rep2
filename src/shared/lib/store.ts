import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Candidate, JobDescription, User, SearchFilters, Job, JobFilters } from '@/types';

interface AppState {
  // Authentication
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;

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
      // Authentication
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false, jobDescription: null }),

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
        // normalize incoming candidates to include legacy flat fields expected across the app
        const normalize = (c: any) => {
          const specialist = c.specialist ?? {};

          const computeExperienceYears = (items: any[] = []) => {
            if (!Array.isArray(items) || items.length === 0) return 0;
            let totalMonths = 0;
            const now = new Date();
            for (const it of items) {
              try {
                const start = it.start ? new Date(it.start) : null;
                const end = it.end ? new Date(it.end) : now;
                if (start) {
                  const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
                  totalMonths += Math.max(0, months);
                }
              } catch (e) {
                // ignore
              }
            }
            return Math.floor(totalMonths / 12);
          };

          const skillsFromSpecialist = Array.isArray(specialist.skills)
            ? specialist.skills
            : specialist.formattedExperienceSkills
            ? Object.keys(specialist.formattedExperienceSkills)
            : [];

          const matched = (typeof c.matched === 'number' ? Math.round(c.matched * 100)
            : typeof c.matchedBatch === 'number' ? Math.round(c.matchedBatch * 100)
            : typeof c.matchScore === 'number' ? Math.round(c.matchScore)
            : typeof c.rate === 'number' ? Math.round(c.rate) : undefined);

          const extractGrade = (g: any) => {
            if (!g) return 'unknown';
            if (typeof g === 'string') return g;
            if (typeof g === 'object') return g.name ?? g.id ?? 'unknown';
            return 'unknown';
          };

          const normalized = {
            // keep original data
            ...c,
            // legacy-flat fields for UI and filters
            name: c.name ?? specialist.name ?? `${specialist.firstName ?? ''} ${specialist.lastName ?? ''}`.trim(),
            title: c.title ?? specialist.title ?? specialist.specialization?.name ?? '',
            skills: c.skills ?? skillsFromSpecialist ?? [],
            experience: typeof c.experience === 'number' ? c.experience : computeExperienceYears(specialist.experience),
            matchScore: typeof c.matchScore === 'number' ? c.matchScore : (typeof matched === 'number' ? matched : undefined),
            location: c.location ?? specialist.city?.name ?? (specialist.country && typeof specialist.country === 'object' ? specialist.country.name : specialist.country) ?? '',
            summary: c.summary ?? specialist.aboutMe ?? c.comment ?? '',
            grade: extractGrade(c.grade ?? specialist.grade) ?? 'unknown',
          };

          return normalized;
        };

        const normalizedCandidates = candidates.map(normalize);

        set({ candidates: normalizedCandidates, filteredCandidates: normalizedCandidates });
        
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
              // @ts-ignore
              candidate.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase())),
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
            // @ts-ignore
            filters.skills.some((skill) => candidate.skills.some((candidateSkill) => candidateSkill.toLowerCase().includes(skill.toLowerCase()))),
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
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        jobDescription: state.jobDescription,
      }),
    },
  ),
);
