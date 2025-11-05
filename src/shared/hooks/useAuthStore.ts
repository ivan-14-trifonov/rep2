import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, JobDescription } from '@/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  jobDescription: JobDescription | null;
  login: (user: User) => void;
  logout: () => void;
  setJobDescription: (job: JobDescription) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      jobDescription: {
        title: '',
        company: '',
        location: '',
        description: '',
        requirements: '',
        skills: [],
      },
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false, jobDescription: null }),
      setJobDescription: (jobDescription) => set({ jobDescription }),
    }),
    {
      name: 'auth-storage',
    },
  ),
);