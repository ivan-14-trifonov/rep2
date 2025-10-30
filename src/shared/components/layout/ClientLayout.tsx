'use client';

import { DictionaryProvider } from '@/shared/hooks/use-translation';
import { Toaster } from '@/shared/ui/toaster';
import type { ReactNode } from 'react';
import type { Dictionary } from '@/shared/lib/dictionary';
import { LanguageProvider } from '@/shared/hooks/use-language';

export function ClientLayout({ children, dictionary, lang }: { children: ReactNode; dictionary: Dictionary; lang: string }) {
  return (
    <LanguageProvider lang={lang}>
      <DictionaryProvider dictionary={dictionary}>
        <Toaster />
        {children}
      </DictionaryProvider>
    </LanguageProvider>
  );
}
