'use client';

import { LoginForm } from '@/widgets/loginForm';
import { LoginLayout } from '@/shared/components/layout/LogniLayout';
import { useAuth } from '@/shared/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isAuthenticated && !isLoading) {
    return null;
  }

  return (
    <LoginLayout>
      <LoginForm />
    </LoginLayout>
  );
}
