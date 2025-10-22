export type Dictionary = {
  header: {
    signIn: string;
    getStarted: string;
    logout: string;
    searchCandidates: string;
    recomendations: string;
    jobs: string;
  };
  home: {
    poweredByAIMatching: string;
    title: {
      findYourPerfect: string;
      candidate: string;
    };
    description: string;
    features: {
      smartMatching: {
        title: string;
        description: string;
      };
      talentPool: {
        title: string;
        description: string;
      };
      preciseFiltering: {
        title: string;
        description: string;
      };
      quickResults: {
        title: string;
        description: string;
      };
    };
    stats: {
      candidates: string;
      matchAccuracy: string;
      averageHireTime: string;
    };
  };
  dashboard: {
    candidateSearchResults: string;
    foundCandidates: string;
    editJobDescription: string;
    jobSummary: string;
    requiredSkills: string;
  };
  backToResults: string;
  jobs: {
    title: string;
    description: string;
    postJob: string;
    totalJobs: string;
    openPositions: string;
    remoteJobs: string;
    featuredOpportunities: string;
    seniorPositions: string;
    remoteWork: string;
    techCompanies: string;
    competitiveSalary: string;
    greatBenefits: string;
    jobsFound: string;
    sortedByRelevance: string;
    noJobsFound: string;
    tryAdjustingSearch: string;
  };
  login: {
    slogan: string;
    copyright: string;
  };
  candidateCard: {
    experience: string,
    years: string,
    candidate: string,
    more: string;
    viewProfile: string;
    viewResume?: string;
  };
  specialistGrid: {
    noCandidatesFound: string;
    tryAdjustingSearch: string;
  };
  specialistProfile: {
    match: string;
    yearsExperience: string;
    contact: string;
    call: string;
    linkedin: string;
    whyThisCandidateMatches: string;
    professionalSummary: string;
    workExperience: string;
    education: string;
    contactInformation: string;
    linkedinProfile: string;
    keySkills: string;
    quickStats: string;
    experience: string;
    matchScore: string;
    skills: string;
  };
  loginForm: {
    welcomeBack: string;
    signInToAccount: string;
    demo: string;

    demoCredentials: string;
    try: string;
    emailAddress: string;
    emailPlaceholder: string;
    password: string;
    passwordPlaceholder: string;
    signIn: string;
    signingIn: string;
    dontHaveAccount: string;
    contactSales: string;
  };
  jobFilters: {
    title: string;
    clearAll: string;
    searchLabel: string;
    searchPlaceholder: string;
    locationLabel: string;
    locationPlaceholder: string;
    jobTypeLabel: string;
    jobTypePlaceholder: string;
    allTypes: string;
    jobTypes: {
      fullTime: string;
      partTime: string;
      contract: string;
      remote: string;
    };
    remoteOnlyLabel: string;
    salaryRangeLabel: string;
    experienceRangeLabel: string;
    years: string;
    requiredSkillsLabel: string;
    addSkillPlaceholder: string;
    addSkillButton: string;
    selectedSkillsLabel: string;
    popularSkillsLabel: string;
    jobsFound_one: string;
    jobsFound_other: string;
    matchingCriteria: string;
  };
  jobProfile: {
    remote: string;
    experience: string;
    applicants: string;
    applyNow: string;
    saveJob: string;
    share: string;
    contactHR: string;
    jobDescription: string;
    requirements: string;
    benefitsAndPerks: string;
    jobDetails: string;
    posted: string;
    deadline: string;
    jobType: string;
    status: string;
    requiredSkills: string;
    aboutCompany: string;
    technologyCompany: string;
    aboutCompanyDescription: string;
    applyForPosition: string;
    applyRedirect: string;
    annually: string;
    hr: string;
    years: string;
  };
  searchFilters: {
    title: string;
    clearAll: string;
    searchCandidatesLabel: string;
    searchCandidatesPlaceholder: string;
    locationLabel: string;
    locationPlaceholder: string;
    experienceRangeLabel: string;
    years: string;
    minimumMatchScoreLabel: string;
    minimumMatch: string;
    skillsLabel: string;
    addSkillPlaceholder: string;
    addButton: string;
    selectedSkillsLabel: string;
    popularSkillsLabel: string;
    candidatesFound_one: string;
    candidatesFound_other: string;
    matchingCriteria: string;
  };
  jobDescriptionForm: {
    title: string;
    description: string;
    jobTitle: string;
    jobTitlePlaceholder: string;
    company: string;
    companyPlaceholder: string;
    location: string;
    locationPlaceholder: string;
    jobDescription: string;
    jobDescriptionPlaceholder: string;
    requirements: string;
    requirementsPlaceholder: string;
    keySkills: string;
    keySkillsPlaceholder: string;
    findCandidates: string;
    searchingCandidates: string;
  };
  jobCard: {
    fullTime: string;
    partTime: string;
    contract: string;
    remote: string;
    viewDetails: string;
    applicants: string;
    posted: string;
    daysAgo: string;
    dayAgo: string;
    weeksAgo: string;
    weekAgo: string;
    monthsAgo: string;
    monthAgo: string;
    hours: string;
    perHour: string;
    years: string;
    experience: string;
    skills: string;
    description: string;
    company: string;
    location: string;
    salary: string;
    apply: string;
    share: string;
    bookmark: string;
  };
};

// 2. "Магический" тип для создания всех возможных путей к ключам
export type ObjectPaths<T extends object> = {
  [K in keyof T]: K extends string ? (T[K] extends object ? `${K}` | `${K}.${ObjectPaths<T[K]>}` : `${K}`) : never;
}[keyof T];
