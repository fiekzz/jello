import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import { validateSession } from "$lib/server/auth";
import { get } from "svelte/store";
import { appUser, getToken } from "$lib/services/auth/auth";
import { prisma } from "$lib/services/prisma";

export const load: LayoutServerLoad = async ({ locals, cookies }) => {

    const session = cookies.get('session');

    if (!session) {
        redirect(303, '/sign-in');
    }

    if (validateSession(session) === null) {
        redirect(303, '/sign-in');
    }

    const dbSession = await prisma.session.findUnique({
        where: {
            token: session
        },
        select: {
            user: {
                include: {
                    ProfileImage: true
                }
            }
        }
    })

    if (!dbSession || !dbSession.user) {
        cookies.delete('session', { path: '/' });
        redirect(303, '/sign-in');
    }

    const user: AppUser = {
        userId: dbSession.user.userId,
        email: dbSession.user.email,
        name: dbSession.user.fullName,
        imageUrl: dbSession.user.ProfileImage?.mediaUrl
    };

    return {
        session,
        user
    };
};