import plural from 'plural-ru';

interface Options {
  lang: string;
  t: (...args: any[]) => string;
}

export function formatSpecialistDuration(
  d: { years: number; months: number },
  { lang, t }: Options
): string {
  const y = d.years;
  const m = d.months;
  const prefix = t('candidateCard.experience');
  if (lang && lang.startsWith('ru')) {
    const yWord = plural(y, t('candidateCard.year_one'), t('candidateCard.year_few'), t('candidateCard.year_many'));
    const mWord = plural(m, t('candidateCard.month_one'), t('candidateCard.month_few'), t('candidateCard.month_many'));
    return `${prefix}: ${y} ${yWord} ${m} ${mWord}`;
  }
  const yearWord = y === 1 ? (t('candidateCard.year_one')) : (t('candidateCard.years'));
  const monthWord = m === 1 ? (t('candidateCard.month_one')) : (t('candidateCard.month_few'));
  return `${prefix}: ${y} ${yearWord} ${m} ${monthWord}`;
}
