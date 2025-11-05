import type { Job } from '@imarketplace/types/entities';

export const mockJobs: Job[] = [
  {
    id: '1',
    name: 'Senior Full Stack Developer',
    company: { id: '1', name: 'TechFlow Inc.' },
    city: { id: '1', name: 'San Francisco, CA' },
    employmentType: 'full',
    amount: 150000,
    currency: 'USD',
    description:
      'We are looking for a Senior Full Stack Developer to join our growing team. You will be responsible for developing and maintaining web applications using modern technologies.',
    requirements: [
      { requirement: '5+ years of experience in full-stack development', mandatory: true },
      { requirement: 'Strong proficiency in React and Node.js', mandatory: true },
      { requirement: 'Experience with TypeScript and modern JavaScript', mandatory: true },
      { requirement: 'Knowledge of cloud platforms (AWS, Azure, or GCP)', mandatory: false },
      { requirement: 'Experience with database design and optimization', mandatory: false },
    ],
    requiredSkills: ['React', 'Node.js', 'TypeScript', 'AWS', 'PostgreSQL'],
    createdAt: '2025-01-10',
    numberOfSpecialists: 24,
    status: 'selection',
    workFormat: 'remote',
    grades: [],
    updatedAt: '2025-01-10',
  },
  {
    id: '2',
    name: 'DevOps Engineer',
    company: { id: '2', name: 'CloudTech Solutions' },
    city: { id: '2', name: 'Austin, TX' },
    employmentType: 'full',
    amount: 135000,
    currency: 'USD',
    description:
      'Join our DevOps team to help build and maintain scalable infrastructure. You will work with cutting-edge technologies to ensure our applications run smoothly.',
    requirements: [
      { requirement: '3+ years of DevOps experience', mandatory: true },
      { requirement: 'Strong knowledge of Docker and Kubernetes', mandatory: true },
      { requirement: 'Experience with CI/CD pipelines', mandatory: true },
      { requirement: 'Proficiency in Infrastructure as Code (Terraform)', mandatory: true },
      { requirement: 'Knowledge of monitoring and logging tools', mandatory: false },
    ],
    requiredSkills: ['Docker', 'Kubernetes', 'Terraform', 'Jenkins', 'AWS'],
    createdAt: '2025-01-08',
    numberOfSpecialists: 18,
    status: 'selection',
    workFormat: 'office',
    grades: [],
    updatedAt: '2025-01-08',
  },
];