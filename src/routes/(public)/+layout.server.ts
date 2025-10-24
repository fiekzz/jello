import { prisma } from "$lib/services/prisma";
import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

interface User {
    userId: string;
    email: string
}

export const load: LayoutServerLoad = async ({ locals, cookies }) => {

    // const localUser = locals.user;

    // if (localUser) {
    //     const user = await prisma.users.findUnique({
    //         where: {
    //             userId: localUser.userId
    //         },
    //         select: {
    //             userId: true,
    //             email: true
    //         }
    //     })

    //     console.log('Auth layout server load user from DB:', user);

    //     if (user) {
            
    //         redirect(303, '/dashboard');

    //     } else {
    //         // If user not found in DB, clear session cookie and redirect to sign-in
    //         cookies.delete('session', { path: '/' });
    //         redirect(303, '/sign-in');
    //     }
    // }

    const session = cookies.get('session');

    if (session) {
        
        const dbSession = await prisma.session.findUnique({
            where: {
                token: session
            },
            select: {
                user: {
                    select: {
                        userId: true,
                        email: true
                    }
                }
            }
        });

        if (dbSession && dbSession.user) {
            console.log('Auth layout server load found session, redirecting to dashboard:', dbSession.user);
            redirect(303, '/dashboard');
        } else {
            // Invalid session, clear cookie
            cookies.delete('session', { path: '/' });
        }

    }

    return {

    };
}