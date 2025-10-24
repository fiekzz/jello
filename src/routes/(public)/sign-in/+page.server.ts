import { appUser } from '$lib/services/auth/auth.js';
import { prisma } from '$lib/services/prisma';
import { redirect } from '@sveltejs/kit';
import { get } from 'svelte/store';


export async function load({ locals, cookies }) {

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
            console.log('Sign-in page server load found session, redirecting to dashboard:', dbSession.user);
            redirect(303, '/dashboard');
        } 
    }

    return {};

}