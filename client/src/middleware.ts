import createIntlMiddleware from 'next-intl/middleware';
import {NextRequest, NextResponse} from 'next/server';
import { AppConfig } from './utils/AppConfig';
 
const intlMiddleware = createIntlMiddleware({
  locales: AppConfig.locales,
  localePrefix: AppConfig.localePrefix,
  defaultLocale: AppConfig.defaultLocale,
});
 
export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl?.pathname
  const response = intlMiddleware(request);

  if(['/en'].includes(pathname)){
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }
 
  return response;
}
 
export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};