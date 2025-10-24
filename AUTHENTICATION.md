# Authentication Flow Setup

This document explains how the Auth0 + Server Session authentication flow works in this SvelteKit application.

## Architecture Overview

The authentication system uses a hybrid approach:

1. **Client-side Auth0 SPA SDK** - Handles OAuth authentication with social providers
2. **Server-side session management** - Uses HTTP-only cookies and database sessions for security

## Flow Diagram

```
User clicks "Login" 
    ↓
Auth0 SPA SDK redirects to provider (Google/GitHub)
    ↓
Provider authenticates user and redirects back
    ↓
Auth0 provides access token on client
    ↓
Client sends access token to /api/auth/session
    ↓
Server validates token with Auth0, creates user in DB, creates session
    ↓
Server sets HTTP-only session cookie
    ↓
All subsequent requests use session cookie for authentication
```

## Key Components

### 1. `/src/lib/services/auth/auth.ts`
- Client-side Auth0 integration
- Handles login/logout with social providers
- Automatically creates server sessions after successful authentication
- Browser-only functions (won't run on server)

### 2. `/src/routes/api/auth/session/+server.ts`
- API endpoint to create/destroy server sessions
- Validates Auth0 access tokens
- Creates/finds users in database
- Sets HTTP-only session cookies

### 3. `/src/routes/hooks.server.ts`
- Server-side authentication middleware
- Validates session cookies on every request
- Protects routes and handles redirects
- Adds user data to `event.locals`

### 4. `/src/lib/server/auth.ts`
- Server-side session management utilities
- Database operations for sessions
- Session validation and cleanup

## Environment Variables

Make sure these are set in your `.env` file:

```env
DATABASE_URL="your_postgres_connection_string"
```

The Auth0 configuration is currently hardcoded but should be moved to environment variables:

```env
AUTH0_DOMAIN="jello.jp.auth0.com"
AUTH0_CLIENT_ID="49XueIw3De3pwOx7W9hXK5voz5mQvfXs"
```

## Usage

### In Svelte Components

```svelte
<script>
    import { onMount } from 'svelte';
    import { initAuth0, loginWithSocial, logout, isAuthenticated, user } from '$lib/services/auth/auth';
    
    onMount(() => {
        initAuth0();
    });
</script>

{#if $isAuthenticated}
    <p>Welcome {$user.email}!</p>
    <button on:click={logout}>Logout</button>
{:else}
    <button on:click={() => loginWithSocial('google-oauth2')}>Login with Google</button>
{/if}
```

### In Server Load Functions

```typescript
// User is automatically available in locals after authentication
export const load: PageServerLoad = async ({ locals }) => {
    if (!locals.user) {
        // This shouldn't happen due to hooks.server.ts protection
        throw redirect(303, '/sign-in');
    }
    
    return {
        user: locals.user
    };
};
```

## Security Features

- **HTTP-only cookies**: Session tokens can't be accessed by JavaScript
- **Server-side validation**: All protected routes verify sessions on the server
- **Automatic cleanup**: Old sessions are removed when creating new ones
- **Secure defaults**: Cookies are marked secure in production

## Protected Routes

Currently protected routes (defined in `hooks.server.ts`):
- `/dashboard`
- `/projects`
- `/tasks`

Users accessing these routes without authentication will be redirected to `/sign-in`.

## Database Schema

The system uses these Prisma models:

```prisma
model Users {
  userId    String    @id @default(uuid())
  email     String    @unique
  password  String    // Empty for Auth0 users
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  Session   Session?
}

model Session {
  uuid      String   @id @default(uuid())
  token     String   @unique
  user      Users    @relation(fields: [userId], references: [userId])
  userId    String   @unique
  expiresAt DateTime
  createdAt DateTime @default(now())
}
```

## Testing the Flow

1. Start the development server: `bun run dev`
2. Navigate to a protected route like `/dashboard`
3. You should be redirected to `/sign-in`
4. Use the AuthComponent to test login/logout functionality
5. Check browser cookies to see the session token
6. Verify that protected routes are accessible after login

## Troubleshooting

### "document is not defined" error
- Make sure Auth0 functions are only called in browser environment
- Check that `browser` guard is present in auth functions

### Session not persisting
- Verify that the `/api/auth/session` endpoint is being called
- Check browser cookies for the session token
- Ensure database connection is working

### Redirect loops
- Check that `hooks.server.ts` protected routes are correctly configured
- Verify that authenticated users aren't being redirected to sign-in pages