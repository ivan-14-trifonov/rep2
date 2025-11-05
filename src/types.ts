export interface Eductation {
  institution: string;
  degree: string;
  year: string;
}
// Backwards-compatible simple education type left as-is (Eductation)

export interface ExperienceItem {
  start: string;
  end: string | null;
  company: string;
  position: string;
  industry?: string | null;
  description?: string | null;
  stack?: string[];
  id?: string;
}

export interface EducationItem {
  id?: string;
  name?: string;
  level?: string;
  major?: string | null;
  year?: number | null;
  [key: string]: any;
}

export interface SalaryInfo {
  amount: number | null;
  currency: string | null;
  hourlyRate?: number;
}

export interface Contacts {
  phone?: string | null;
  email?: string | null;
  telegram?: string | null;
  [key: string]: any;
}

export interface LanguageItem {
  language: string;
  level?: string;
  id?: string;
}

export interface CitizenshipItem {
  name: string;
  id?: string;
}

export interface Specialization {
  id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
  category?: string;
}

export interface City {
  id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Country {
  id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Specialist {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  externalId?: string | null;
  title?: string | null;
  name?: string | null;
  top?: boolean;
  firstName?: string | null;
  lastName?: string | null;
  middleName?: string | null;
  birthDate?: string | null;
  experience: ExperienceItem[];
  educations: EducationItem[];
  salary?: SalaryInfo;
  contacts?: Contacts;
  language?: LanguageItem[];
  employment?: string | null;
  relocation?: string | null;
  schedule?: string | null;
  hasVehicle?: boolean | null;
  driveExperience?: any;
  businessTripReadiness?: string | null;
  age?: number | null;
  status?: string;
  citizenship?: CitizenshipItem[];
  jobSearchStatus?: string;
  driverLicenseTypes?: any[];
  travelTime?: string | null;
  aboutMe?: string | null;
  gender?: string | null;
  img?: string | null;
  skills?: string[];
  company?: string;
  // grade can be a simple string or an object (new structure) - allow extra fields from API
  // grade is an object (new structure) or null
  grade?: { id?: string; name?: string; [key: string]: any } | null;
  specialization?: Specialization;
  city?: City | null;
  country?: Country | string | null;
  visibility?: string;
  skillsExtracted?: boolean;
  dataSource?: string;
  additionalEducations?: any[];
  formattedExperienceSkills?: Record<string, number>;
  [key: string]: any;
}

export interface Requirement {
  requirement: string;
  mandatory: boolean;
  id?: string;
}

export interface AttractionPeriod {
  from?: number;
  to?: number;
  text?: string;
}

export interface JobDetail {
  id: string;
  name?: string;
  requirements?: Requirement[] | null;
  tasks?: string | any[] | null;
  description?: string | null;
  descriptionTeam?: string | null;
  industry?: string | null;
  specialization?: string | null;
  grades?: string[];
  amount?: number | null;
  currency?: string | null;
  numberOfSpecialists?: number | null;
  attractionPeriod?: AttractionPeriod;
  workFormat?: string | null;
  employmentType?: string | null;
  schedule?: string | null;
  language?: any[];
  city?: City | null;
  country?: string | null | string;
  requiredCitizenship?: CitizenshipItem[];
  status?: string;
  customer?: string;
  company?: string;
  link?: string | null;
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
  requiredSkills?: Record<string, number>;
  searchQuery?: string | null;
  priority?: number;
  projectConditions?: string | null;
  visibility?: string;
  [key: string]: any;
}

export interface Candidate {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  specialist: Specialist;
  job?: JobDetail | null;
  rate?: number;
  status?: string;
  salary?: Record<string, any> | SalaryInfo;
  createdBy?: string;
  [key: string]: any;
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

