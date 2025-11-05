import type { Ttype } from '@/shared/hooks/use-translation';
import type { Job } from '@imarketplace/types/entities';

export function formatSalary(t: Ttype, job: Job) {
  const { amount, currency } = job;
  if (!amount || !currency) return '-';
  if (job.employmentType === 'short') {
    return `${amount} ${currency}${t('jobProfile.hr')}`;
  }
  return `${(amount / 1000).toFixed(0)}k ${currency} ${t('jobProfile.annually')}`;
}
