'use client';

import { BRAND_NAME } from '@/shared/constants';
import { useTranslation } from '@/shared/hooks/use-translation';
import { useAuth } from '@/shared/hooks/use-auth';
import { Avatar, AvatarFallback } from '@ui/avatar';
import { Button } from '@ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@ui/sheet';
import { LogOut, Menu, Search } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { BrandLogo } from '../BrandLogo';

export function Header() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const { t } = useTranslation();

  const handleLogout = () => {
    // Sign out using NextAuth
    signOut({ redirect: false }).then(() => {
      router.push('/login');
    }).catch((error) => {
      console.error('Logout error:', error);
      // Even if there's an error, redirect to login
      router.push('/login');
    });
  };

  const navigation = [
    { name: t('header.searchCandidates'), href: '/' },
    { name: t('header.recomendations'), href: '/candidates' },
    { name: t('header.jobs'), href: '/jobs' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <BrandLogo />

          {/* Desktop Navigation */}
          {isAuthenticated && (
            <nav className="hidden md:flex items-center justify-center flex-grow">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mx-3">
                  {item.name}
                </Link>
              ))}
            </nav>
          )}

          {/* User Menu / Auth Buttons */}
          <div className="flex flex-grow basis-0 justify-end items-center space-x-4">
            {isAuthenticated && user ? (
              <>
                {/* Mobile Menu */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="sm" className="md:hidden">
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-64">
                    <nav className="flex flex-col space-y-4 mt-8">
                      {navigation.map((item) => (
                        <Link key={item.name} href={item.href} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                          {item.name}
                        </Link>
                      ))}
                    </nav>
                  </SheetContent>
                </Sheet>

                {/* User Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary text-primary-foreground">{user?.name?.charAt(0)?.toUpperCase() || 'U'}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium">{user?.name || 'User'}</p>
                        <p className="w-[200px] truncate text-sm text-muted-foreground">{user?.email || ''}</p>
                      </div>
                    </div>
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>{t('header.logout')}</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" asChild>
                  <Link href="/login">{t('header.signIn')}</Link>
                </Button>
                <Button asChild>
                  <Link href="/login">{t('header.getStarted')}</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
