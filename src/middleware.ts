import NextAuth from 'next-auth';

import authConfig from '@/auth.config';
import { API_AUTH_PREFIX, AUTH_ROUTES, DEFAULT_LOGIN_REDIRECT, DEFAULT_LOGOUT_REDIRECT, PUBLIC_ROUTES } from '@/routes';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl, auth } = req;

  const isApiAuthPrefix = nextUrl.pathname.startsWith(API_AUTH_PREFIX);
  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);
  const isAuthRoute = AUTH_ROUTES.includes(nextUrl.pathname);

  const isLoggedIn = !!auth;

  if (isApiAuthPrefix) {
    return;
  }

  console.log(auth, req.cookies, isAuthRoute, isPublicRoute, nextUrl);
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL(DEFAULT_LOGOUT_REDIRECT, nextUrl));
  }

  return;
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
