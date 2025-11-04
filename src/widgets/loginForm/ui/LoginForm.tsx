'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@ui/button';
import { Input } from '@ui/input';
import { Label } from '@ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ui/card';
import { Alert, AlertDescription } from '@ui/alert';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { SVGProps } from 'react';
import { useState } from 'react';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/shared/hooks/use-translation';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false
      });
      if ((result === undefined) || (result?.error)) {
        setError('Authentication failed. Please check your credentials.');
      } else {
        // Redirect to home page after successful authentication
        router.push('/');
      }
    } catch (err) {
      setError('Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">{t('loginForm.welcomeBack')}</CardTitle>
        <CardDescription>{t('loginForm.signInToAccount')}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">{t('loginForm.emailAddress')}</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder={t('loginForm.emailPlaceholder')}
                className={`pl-10 ${errors.email ? 'border-destructive' : ''}`}
                {...register('email')}
              />
            </div>
            {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">{t('loginForm.password')}</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder={t('loginForm.passwordPlaceholder')}
                className={`pl-10 pr-10 ${errors.password ? 'border-destructive' : ''}`}
                {...register('password')}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
              </Button>
            </div>
            {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
          </div>

          {/* Google Sign-In Button */}
          <Button 
            type="button" 
            className="w-full flex items-center gap-2" 
            onClick={() => signIn('google', { callbackUrl: '/' })} 
            variant="outline"
            size="lg"
          >
            <GoogleIcon className="h-5 w-5" />
            {t('loginForm.signInWithGoogle')}
          </Button>

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={!isValid || isLoading} size="lg">
            {isLoading ? t('loginForm.signingIn') : t('loginForm.signIn')}
          </Button>

          {/* Additional Info */}
          <div className="text-center text-sm text-muted-foreground">
            <p>
              {t('loginForm.dontHaveAccount')} <span className="text-primary hover:underline cursor-pointer">{t('loginForm.contactSales')}</span>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

const GoogleIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.79 15.71 17.57V20.34H19.28C21.36 18.42 22.56 15.59 22.56 12.25Z"
      fill="#4285F4"
    />
    <path
      d="M12 23C14.97 23 17.46 22.02 19.28 20.34L15.71 17.57C14.73 18.23 13.48 18.64 12 18.64C9.14 18.64 6.71 16.69 5.84 14.09H2.18V16.96C4 20.53 7.7 23 12 23Z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09C5.62 13.44 5.49 12.74 5.49 12C5.49 11.26 5.62 10.56 5.84 9.91V7.04H2.18C1.43 8.55 1 10.22 1 12C1 13.78 1.43 15.45 2.18 16.96L5.84 14.09Z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.36C13.62 5.36 15.06 5.93 16.21 7.04L19.36 4.07C17.45 2.24 14.97 1 12 1C7.7 1 4 3.47 2.18 7.04L5.84 9.91C6.71 7.31 9.14 5.36 12 5.36Z"
      fill="#EA4335"
    />
  </svg>
);