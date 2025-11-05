import { create } from 'zustand';
import type { Candidate, SearchFilters } from '@/types';
import { computeExperience } from '../lib/computeExperience';

interface CandidateState {
  candidates: Candidate[];
  filteredCandidates: Candidate[];
  selectedCandidate: Candidate | null;
  searchQuery: string;
  filters: SearchFilters;
  setCandidates: (candidates: Candidate[]) => void;
  setSelectedCandidate: (candidate: Candidate | null) => void;
  setSearchQuery: (query: string) => void;
  setFilters: (filters: Partial<SearchFilters>) => void;
  applyFilters: () => void;
}

export const useCandidateStore = create<CandidateState>((set, get) => ({
  candidates: [],
  filteredCandidates: [],
  selectedCandidate: null,
  searchQuery: '',
  filters: {
    location: '',
    minExperience: 0,
    maxExperience: 20,
    skills: [],
    minMatchScore: 0,
  },
  setCandidates: (candidates) => {
    set({ candidates, filteredCandidates: candidates });
    get().applyFilters();
  },
  setSelectedCandidate: (selectedCandidate) => set({ selectedCandidate }),
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

    // Location filter - construct from candidate.specialist.city and candidate.specialist.country
    if (filters.location) {
      filtered = filtered.filter((candidate) => {
        const specialist = candidate.specialist || {};
        const city = specialist.city?.name || '';
        const country = specialist.country && typeof specialist.country === 'object' ? specialist.country.name : (specialist.country as any) || '';
        const location = `${city} ${country}`.toLowerCase();
        return location.includes(filters.location.toLowerCase());
      });
    }

    // Experience filter - compute from candidate.specialist.experience array
    filtered = filtered.filter((candidate) => {
      const specialist = candidate.specialist || {};
      // compute experience (years and months) from specialist.experience array using same logic as in SpecialistCard
      const experience = computeExperience(specialist.experience || []);
      const totalYears = experience.years + experience.months / 12;
      return totalYears >= filters.minExperience && totalYears <= filters.maxExperience;
    });

    // Skills filter - use candidate.specialist.skills
    if (filters.skills.length > 0) {
      filtered = filtered.filter((candidate) => {
        const specialist = candidate.specialist || {};
        const candidateSkills = specialist.skills || [];
        return filters.skills.some((skill) => 
          candidateSkills.some((candidateSkill) => 
            candidateSkill.toLowerCase().includes(skill.toLowerCase())
          )
        );
      });
    }

    // Match score filter - compute matchScore from candidate.matched (0..1) -> percent rounded, fallback 0
    filtered = filtered.filter((candidate) => {
      const matched = candidate?.matched;
      const matchScore = typeof matched === 'number' ? Math.round(matched * 100) : 0;
      return matchScore >= filters.minMatchScore;
    });

    set({ filteredCandidates: filtered });
  },
}));