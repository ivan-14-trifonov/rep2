'use client';

import { DictionaryProvider } from '@/shared/hooks/use-translation';
import { Toaster } from '@/shared/ui/toaster';
import type { ReactNode } from 'react';
import type { Dictionary } from '@/shared/lib/dictionary';

export function ClientLayout({ children, dictionary }: { children: ReactNode; dictionary: Dictionary }) {
  return (
    <>
      <DictionaryProvider dictionary={dictionary}>
        <Toaster />
        {children}
      </DictionaryProvider>
    </>
  );
}
