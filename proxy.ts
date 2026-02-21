import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from '@/core/i18n';
import { auth } from '@/auth';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
  localeDetection: false,
});

// Routes that require authentication
const protectedPaths = ['/profile', '/orders'];

// Auth routes that should NOT be accessible when logged in
const authPaths = ['/signin', '/signup', '/verify-otp', '/verify-forgot-password', '/forgot-password', '/new-password'];

function getPathnameWithoutLocale(pathname: string): string {
  for (const locale of locales) {
    if (pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`) {
      return pathname.slice(`/${locale}`.length) || '/';
    }
  }
  return pathname;
}

function isProtectedRoute(pathname: string): boolean {
  const cleanPath = getPathnameWithoutLocale(pathname);
  return protectedPaths.some(path => cleanPath === path || cleanPath.startsWith(`${path}/`));
}

function isAuthRoute(pathname: string): boolean {
  const cleanPath = getPathnameWithoutLocale(pathname);
  return authPaths.some(path => cleanPath === path || cleanPath.startsWith(`${path}/`));
}

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (isProtectedRoute(pathname)) {
    const session = await auth();

    if (!session) {
      const localeMatch = pathname.match(new RegExp(`^/(${locales.join('|')})`));
      const locale = localeMatch ? localeMatch[1] : defaultLocale;

      const signInUrl = new URL(`/${locale}/signin`, request.url);
      return NextResponse.redirect(signInUrl);
    }
  }

  if (isAuthRoute(pathname)) {
    const session = await auth();

    if (session) {
      const localeMatch = pathname.match(new RegExp(`^/(${locales.join('|')})`));
      const locale = localeMatch ? localeMatch[1] : defaultLocale;

      const homeUrl = new URL(`/${locale}`, request.url);
      return NextResponse.redirect(homeUrl);
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|[^?]*\\.(?:html?|css|js(?:on)?|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)'],
};
