import type { Ttype } from '@/shared/hooks/use-translation';
import type { Job } from '@/types';

export function formatSalary(t: Ttype, job: Job) {
  const { min, max, currency } = job.salary;
  if (job.type === 'Contract') {
    return `${min}-${max}${t('jobProfile.hr')}`;
  }
  return `${(min / 1000).toFixed(0)}k-${(max / 1000).toFixed(0)}k ${t('jobProfile.annually')}`;
}
