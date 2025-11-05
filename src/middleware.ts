import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { basePath } from '@/../next.config';

const locales = ['en', 'ru'];
const defaultLocale = 'en';

function getLocale(request: NextRequest) {
  const headers = { 'accept-language': request.headers.get('accept-language') || '' };
  const languages = new Negotiator({ headers }).languages();
  return match(languages, locales, defaultLocale);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/api') || pathname.startsWith('/auth')) {
    return;
  }

  // Проверяем, есть ли уже локаль в пути, учитывая basePath
  const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}`));

  // Если локали нет в пути, переписываем URL, чтобы включить локаль
  if (pathnameHasLocale) {
    return;
  }

  const locale = getLocale(request);
  const url = request.nextUrl.clone();
  const repl = pathname.replace(basePath || '', '');
  url.pathname = `/${locale}${repl}`;

  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ['/', '/((?!_next|favicon.ico|robots.txt|_next/static|_next/image).*)'],
};
