import { json, redirect, type RequestHandler } from '@sveltejs/kit';
import { prisma } from '$lib/services/prisma';

export const POST: RequestHandler = async ({ cookies }) => {
    try {
        const sessionToken = cookies.get('session');

        if (sessionToken) {
            // Delete session from database
            await prisma.session.delete({
                where: { token: sessionToken }
            }).catch(() => {
                // Session might not exist in DB, that's okay
            });
        }

        // Clear the cookie
        cookies.delete('session', { path: '/' });

        return json({ success: true });
    } catch (error) {
        console.error('Session deletion error:', error);
        return json({ error: 'Internal server error' }, { status: 500 });
    }
};