import AppRoutes from "$lib/paths/routes";
import { validateSession } from "$lib/server/session";
import { prisma } from "$lib/services/prisma";
import { redirect, type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {

    const sessionToken = event.cookies.get('session');

    event.locals.user = null;

    if (sessionToken) {
        const validatedUser = await validateSession(sessionToken);

        if (validatedUser) {
            const dbSession = await prisma.session.findUnique({
                where: {
                    token: sessionToken
                },
                select: {
                    user: {
                        include: {
                            ProfileImage: true
                        }
                    }
                }
            });

            if (dbSession?.user) {
                const user: AppUser = {
                    userId: dbSession.user.userId,
                    email: dbSession.user.email,
                    name: dbSession.user.fullName,
                    imageUrl: dbSession.user.ProfileImage?.mediaUrl
                };
                event.locals.user = user;
            }
        } else {
            event.cookies.delete('session', { path: '/' });
        }
    }

    const protectedRoutes = AppRoutes.getInstance().getProtectedRoutes();
    const isProtectedPageRoute = protectedRoutes.some((route) => event.url.pathname.startsWith(route));

    const protectedApiRoutes = AppRoutes.getInstance().getProtectedApiRoutes();
    const isProtectedApiRoute = protectedApiRoutes.some((route) => event.url.pathname.startsWith(route));

    if (isProtectedPageRoute && !event.locals.user) {
        throw redirect(303, '/sign-in');
    }

    if (isProtectedApiRoute && !event.locals.user) {
        return new Response(JSON.stringify({ message: 'Unauthorized' }), {
            status: 401,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    const publicRoutes = AppRoutes.getInstance().getPublicRoutes();
    const isPublicRoute = publicRoutes.some((route) => event.url.pathname === route);

    if (isPublicRoute && event.locals.user) {
        throw redirect(303, '/dashboard');
    }

    return resolve(event);
};