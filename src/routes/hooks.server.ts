import { validateSession } from "$lib/server/auth";
import { prisma } from "$lib/services/prisma";
import { redirect, type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {

    const session = event.cookies.get('session')

    event.locals.user = session ? await validateSession(session) : null

    const protectedRoutes = ['/projects', '/settings'];

    const isProtectedRoute = protectedRoutes.some((route) => event.url.pathname.startsWith(route));

    if (isProtectedRoute && !event.locals.user) {
        throw redirect(303, '/sign-in');
    }

    if (event.url.pathname === '/sign-in' && event.locals.user) {
        throw redirect(303, '/dashboard');
    }

    return resolve(event)
}