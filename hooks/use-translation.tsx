'use client';

import { createContext, useContext } from 'react';
import type { Dictionary, ObjectPaths } from '@/lib/dictionary';

const DictionaryContext = createContext<Dictionary | null>(null);

export function useTranslation() {
  const dictionary = useContext(DictionaryContext);

  if (!dictionary) throw new Error('useTranslation must be used within a DictionaryProvider');

  const t = (path: ObjectPaths<Dictionary>): string => {
    const keys = path.split('.');
    let result: any = dictionary;
    for (const key of keys) {
      result = result?.[key];
      if (result === undefined) {
        return path; // Возвращаем ключ, если перевод не найден
      }
    }
    return result;
  };

  return { t };
}

export function DictionaryProvider({ children, dictionary }: { children: React.ReactNode; dictionary: Dictionary }) {
  return <DictionaryContext.Provider value={dictionary}>{children}</DictionaryContext.Provider>;
}
