import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals }) => {
    // The authentication redirect is now handled in hooks.server.ts
    // If we reach here and user is authenticated, they will be redirected by hooks
    return {
        user: locals.user
    };
};