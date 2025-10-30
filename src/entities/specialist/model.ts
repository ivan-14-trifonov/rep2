import type { Industry, Media, Language, Country, City, DataSource, Grade, Service, Skill, Specialization } from '@/entities/dictionary';
import type { User } from '@/entities/user';
import type { Company } from '@/entities/company';

interface DefaultSpecialist {
  id: string;
  user?: (string | null) | User;
  externalId?: string | null;
  title?: string | null;
  name?: string | null;
  top?: boolean | null;
  firstName?: string | null;
  lastName?: string | null;
  middleName?: string | null;
  birthDate?: string | null;
  experience?:
    | {
        name?: string | null;
        start?: string | null;
        end?: string | null;
        untilNow?: boolean | null;
        company?: string | null;
        position?: string | null;
        industry?: (string | null) | Industry;
        description?: string | null;
        aboutTeam?: string | null;
        achievements?: string | null;
        stack?: (string | Skill)[] | null;
        id?: string | null;
      }[]
    | null;
  workFormat?: ('remote' | 'office' | 'mixed') | null;
  employmentType?: ('full' | 'short') | null;
  additionalEducations?:
    | {
        name?: string | null;
        year?: number | null;
        file?: (string | null) | Media;
        id?: string | null;
      }[]
    | null;
  educations?:
    | {
        name?: string | null;
        level: 'secondaryGeneral' | 'CandidateOfSciences' | 'masterOfScience' | 'higher' | 'unfinishedHigher' | 'secondary' | 'other';
        major?: string | null;
        year?: number | null;
        id?: string | null;
      }[]
    | null;
  salary?: {
    amount?: number | null;
    currency?: ('RUB' | 'EUR' | 'USD') | null;
    hourlyRate?: number | null;
  };
  contacts?: {
    phone?: string | null;
    email?: string | null;
    telegram?: string | null;
    other?: string | null;
  };
  language?:
    | {
        language?: (string | null) | Language;
        level?: ('A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'L1' | '-') | null;
        id?: string | null;
      }[]
    | null;
  availableFrom?: string | null;
  employment?: ('full' | 'part' | 'project' | 'probation') | null;
  relocation?: ('noRelocation' | 'relocation' | 'relocationDesirable') | null;
  schedule?: ('remote' | 'shiftWork' | 'full' | 'flexible') | null;
  hasVehicle?: boolean | null;
  driveExperience?: string | null;
  businessTripReadiness?: ('never' | 'ready' | 'sometimes') | null;
  foreignProjectsReadiness?: ('yes' | 'no') | null;
  age?: number | null;
  status?: ('created' | 'archive') | null;
  citizenship?:
    | {
        name: string | Country;
        id?: string | null;
      }[]
    | null;
  jobSearchStatus?: ('active' | 'open' | 'notLooking') | null;
  driverLicenseTypes?:
    | {
        type: string;
        id?: string | null;
      }[]
    | null;
  travelTime?: ('any' | 'lessThanHour' | 'fromHourToOneAndHalf') | null;
  aboutMe?: string | null;
  gender?: ('female' | 'male') | null;
  img?: (string | null) | Media;
  skills?: (string | Skill)[] | null;
  company?: (string | null) | Company;
  grade?: (string | null) | Grade;
  specialization?: (string | null) | Specialization;
  city?: (string | null) | City;
  country?: (string | null) | Country;
  services?: (string | Service)[] | null;
  visibility?: ('visible' | 'hidden') | null;
  skillsExtracted?: boolean | null;
  formattedExperienceSkills?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  dataSource?: (string | null) | DataSource;
  updatedAt: string;
  createdAt: string;
}

export type Specialist<TOverride extends Partial<DefaultSpecialist> = {}> = Omit<DefaultSpecialist, keyof TOverride> & TOverride;
