'use client';

import { Toaster } from '@/components/ui/sonner';
import { DictionaryProvider } from '@/hooks/use-translation';
import type { Dictionary } from '@/lib/dictionary';
import type { ReactNode } from 'react';

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
