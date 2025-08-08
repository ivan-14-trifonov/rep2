'use client';

import { LoginForm } from '@/widgets/loginForm';
import { LoginLayout } from '@/shared/components/layout/LogniLayout';

export default function LoginPage() {
  // const { isAuthenticated } = useAppStore();
  // const router = useRouter();
  // const { t } = useTranslation();

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     router.push('/');
  //   }
  // }, [isAuthenticated, router]);

  // if (isAuthenticated) {
  //   return null;
  // }

  return (
    <LoginLayout>
      <LoginForm />
    </LoginLayout>
  );
}
