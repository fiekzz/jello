import { validateSession } from "$lib/server/session";
import { prisma } from "$lib/services/prisma";
import { redirect, type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
    // Get session cookie and validate it
    const sessionToken = event.cookies.get('session');
    
    // Validate session if token exists
    event.locals.user = sessionToken ? await validateSession(sessionToken) : null;

    console.log(event.locals.user ? `Authenticated user: ${event.locals.user.email}` : 'No authenticated user');

    // Define protected routes
    const protectedRoutes = ['/dashboard', '/projects', '/tasks'];
    const isProtectedRoute = protectedRoutes.some((route) => event.url.pathname.startsWith(route));

    // Redirect to sign-in if accessing protected route without authentication
    if (isProtectedRoute && !event.locals.user) {
        throw redirect(303, '/sign-in');
    }

    // Redirect authenticated users away from sign-in/sign-up pages
    if ((event.url.pathname === '/sign-in' || event.url.pathname === '/sign-up') && event.locals.user) {
        throw redirect(303, '/dashboard');
    }

    return resolve(event);
};