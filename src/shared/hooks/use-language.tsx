import { createContext, useContext } from 'react';

export type Language = string;

const LanguageContext = createContext<Language>('en');

export function useLanguage() {
  const lang = useContext(LanguageContext);
  return lang || 'en';
}

export function LanguageProvider({ children, lang }: { children: React.ReactNode; lang: Language }) {
  return <LanguageContext.Provider value={lang}>{children}</LanguageContext.Provider>;
}
