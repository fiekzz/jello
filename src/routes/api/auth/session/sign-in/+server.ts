import { json, type RequestHandler } from '@sveltejs/kit';
import { createSession } from '$lib/server/session';
import { prisma } from '$lib/services/prisma';

export const POST: RequestHandler = async ({ request, cookies, locals }) => {
    try {
        const { accessToken } = await request.json();

        if (!accessToken) {
            return json({ error: 'Access token is required' }, { status: 400 });
        }

        // Verify the Auth0 token and get user info
        const response = await fetch(`https://jello.jp.auth0.com/userinfo`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (!response.ok) {
            return json({ error: 'Invalid access token' }, { status: 401 });
        }

        const auth0User = await response.json();

        console.log('Auth0 userinfo response status:', auth0User);

        // Find or create user in database
        let user = await prisma.users.findUnique({
            where: { email: auth0User.email }
        });

        if (!user) {
            // Create new user if doesn't exist
            user = await prisma.users.create({
                data: {
                    email: auth0User.email,
                    fullName: auth0User.name || auth0User.email,
                    ProfileImage: {
                        create: {
                            mediaUrl: auth0User.picture || '',
                            mediaType: 'image/png'
                        }
                    }
                }
            });
        }

        // Delete any existing session for this user
        await prisma.session.deleteMany({
            where: { userId: user.userId }
        });

        // Create new session
        const session = await createSession(user.userId);

        // Set HTTP-only cookie
        cookies.set('session', session.token, {
            path: '/',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7 // 7 days
        });

        return json({
            success: true,
            user: {
                userId: user.userId,
                email: user.email
            }
        });

    } catch (error) {
        console.error('Session creation error:', error);
        return json({ error: 'Internal server error' }, { status: 500 });
    }
};