import { writable } from "svelte/store";
import { Auth0Client, createAuth0Client, User } from '@auth0/auth0-spa-js'
import { browser } from '$app/environment';

export const isAuthenticated = writable(false)
export const appUser = writable<AppUser | null>(null)
export const isLoading = writable(true)

let auth0client: Auth0Client | null = null;

async function createServerSession() {
    try {
        if (!auth0client) return;

        const accessToken = await auth0client.getTokenSilently();

        console.log('Creating server session with access token:', accessToken);

        const response = await fetch('/api/auth/session/sign-in', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ accessToken })
        });

        const data = await response.json();

        console.log('Server session creation response data:', data);

        if (!response.ok) {
            console.error('Failed to create server session:', await response.text());
        }
    } catch (error) {
        console.error('Error creating server session:', error);
    }
}

export async function initAuth0(): Promise<Auth0Client> {
    if (!browser) {
        throw new Error('Auth0 SPA SDK can only be used in browser environment');
    }

    const domain = 'jello.jp.auth0.com';
    const clientId = '49XueIw3De3pwOx7W9hXK5voz5mQvfXs';

    console.log('Initializing Auth0 Client with:', { domain, clientId });

    auth0client = await createAuth0Client({
        domain,
        clientId,
        authorizationParams: {
            redirect_uri: 'http://localhost:5173/dashboard'
        }
    })

    const authenticated = await auth0client.isAuthenticated()
    isAuthenticated.set(authenticated)

    if (authenticated) {
        const userProfile = await auth0client.getUser()

        const tempUser: AppUser = {
            userId: userProfile?.sub || '',
            email: userProfile?.email || '',
            name: userProfile?.name || '',
            imageUrl: userProfile?.picture || ''
        }

        appUser.set(tempUser)

        await createServerSession()
    }

    isLoading.set(false)

    if (window.location.search.includes('code=') && window.location.search.includes('state=')) {
        try {
            await auth0client.handleRedirectCallback()
            window.history.replaceState({}, document.title, window.location.pathname)

            const authenticated = await auth0client.isAuthenticated()
            isAuthenticated.set(authenticated)

            if (authenticated) {
                const userProfile = await auth0client.getUser()

                const tempUser: AppUser = {
                    userId: userProfile?.sub || '',
                    email: userProfile?.email || '',
                    name: userProfile?.name || '',
                    imageUrl: userProfile?.picture || ''
                }
                appUser.set(tempUser)

                await createServerSession()
            }
        } catch (error) {

            console.error('Error handling redirect callback:', error);
            isLoading.set(false);
        }
    }

    return auth0client;
}

type SocialConnection = 'google-oauth2' | 'facebook' | 'github' | 'twitter';

export async function loginWithSocial(connection: SocialConnection): Promise<boolean> {
    if (!browser) {
        throw new Error('Auth0 SPA SDK can only be used in browser environment');
    }

    console.log('Logging in with social connection:', auth0client);

    if (!auth0client) {
        auth0client = await initAuth0()
    }

    await auth0client.loginWithPopup({
        authorizationParams: {
            connection
        }
    })

    console.log('Logged in with social connection:', connection);

    const authenticated = await auth0client.isAuthenticated()
    isAuthenticated.set(authenticated)

    if (authenticated) {
        const userProfile = await auth0client.getUser()

        const tempUser: AppUser = {
            userId: userProfile?.sub || '',
            email: userProfile?.email || '',
            name: userProfile?.name || '',
            imageUrl: userProfile?.picture || ''
        }

        appUser.set(tempUser)

        await createServerSession()
    }

    if (appUser) {
        return true
    }

    return false
}

export async function logout(): Promise<boolean> {
    if (!browser) {
        throw new Error('Auth0 SPA SDK can only be used in browser environment');
    }

    try {
        await fetch('/api/auth/session/sign-out', {
            method: 'POST'
        });
    } catch (error) {
        console.error('Error clearing server session:', error);
        return false
    }

    if (!auth0client) {
        auth0client = await initAuth0()
    }

    auth0client.logout({
        logoutParams: {
            returnTo: window.location.origin
        }
    })

    isAuthenticated.set(false)
    appUser.set(null)

    return true
}

export async function getToken(): Promise<string> {
    if (!browser) {
        throw new Error('Auth0 SPA SDK can only be used in browser environment');
    }

    if (!auth0client) {
        auth0client = await initAuth0()
    }

    return await auth0client.getTokenSilently()
}