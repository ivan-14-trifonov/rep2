'use client';

import { LoginForm } from '@/components/forms/LoginForm';
import { Search } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';

export default function LoginPage() {
  // const { isAuthenticated } = useAppStore();
  // const router = useRouter();
  const { t } = useTranslation();

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     router.push('/');
  //   }
  // }, [isAuthenticated, router]);

  // if (isAuthenticated) {
  //   return null;
  // }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Search className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">{t('login.brandName')}</span>
          </div>
          <p className="text-muted-foreground">{t('login.slogan')}</p>
        </div>

        {/* Login Form */}
        <LoginForm />

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          <p>{t('login.copyright')}</p>
        </div>
      </div>
    </div>
  );
}
