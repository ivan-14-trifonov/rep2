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
import { useState } from 'react';
import { useAuthStore } from '@/shared/hooks/useAuthStore';
import { useUIStore } from '@/shared/hooks/useUIStore';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/shared/hooks/use-translation';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuthStore();
  const { isLoading, setLoading, error, setError } = useUIStore();
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
    setLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock authentication - in real app, validate against API
      if (data.email === 'demo@example.com' && data.password === 'password') {
        login({
          id: '1',
          email: data.email,
          name: 'Demo User',
          company: 'Demo Company',
        });
        router.push('/');
      } else {
        // For demo purposes, allow any valid email/password combination
        const name = data.email.split('@')[0].replace(/[^a-zA-Z\s]/g, '');
        const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);

        login({
          id: Math.random().toString(36).substr(2, 9),
          email: data.email,
          name: capitalizedName || 'User',
          company: 'Your Company',
        });
        router.push('/');
      }
    } catch (err) {
      setError('Authentication failed. Please try again.');
    } finally {
      setLoading(false);
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

          {/* Demo Credentials Info */}
          <Alert>
            <AlertDescription>
              <strong>{t('loginForm.demo')}:</strong> {t('loginForm.demoCredentials')}
              <br />
              {t('loginForm.try')}: demo@example.com / password
            </AlertDescription>
          </Alert>

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
