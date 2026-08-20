import { NextResponse, type NextRequest } from 'next/server';
import { SESSION_COOKIE, verifySessionToken } from '@/lib/auth';
import { locales, negotiateLocale } from '@/lib/i18n/config';

export const config = {
  matcher: ['/((?!_next|images|favicon.ico|icon.svg|robots.txt|sitemap.xml).*)'],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Admin area: everything but the login page needs a valid session.
  if (pathname.startsWith('/admin')) {
    if (pathname === '/admin/login') return NextResponse.next();

    const valid = await verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value);
    if (!valid) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin/login';
      url.search = pathname === '/admin' ? '' : `?next=${encodeURIComponent(pathname)}`;
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // Public pages always carry a locale prefix.
  const hasLocale = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasLocale) return NextResponse.next();

  const locale = negotiateLocale(request.headers.get('accept-language'));
  const url = request.nextUrl.clone();
  url.pathname = pathname === '/' ? `/${locale}` : `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}
