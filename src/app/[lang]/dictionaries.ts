import 'server-only';
import type { Dictionary } from '@/shared/lib/dictionary';

const dictionaries = {
  en: () => import('./dictionaries/en').then((module) => module.default),
  ru: () => import('./dictionaries/ru').then((module) => module.default),
};

export const getDictionary = async (locale: 'en' | 'ru'): Promise<Dictionary> => {
  return dictionaries[locale]();
};
