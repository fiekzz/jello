<script lang="ts">
    import { onMount } from 'svelte';
    import { initAuth0, loginWithSocial, logout, isAuthenticated, appUser, isLoading } from '$lib/services/auth/auth';
    
    onMount(async () => {
        try {
            await initAuth0();
        } catch (error) {
            console.error('Failed to initialize Auth0:', error);
        }
    });

    async function handleLogin(connection: 'google-oauth2' | 'Github') {
        try {
            await loginWithSocial(connection);
        } catch (error) {
            console.error('Login failed:', error);
        }
    }

    async function handleLogout() {
        try {
            await logout();
        } catch (error) {
            console.error('Logout failed:', error);
        }
    }
</script>

<div class="auth-component">
    {#if $isLoading}
        <p>Loading...</p>
    {:else if $isAuthenticated && $appUser}
        <div class="user-info">
            <h3>Welcome, {$appUser.email || $appUser.name}!</h3>
            <button on:click={handleLogout} class="logout-btn">
                Logout
            </button>
        </div>
    {:else}
        <div class="login-options">
            <h3>Sign In</h3>
            <button on:click={() => handleLogin('google-oauth2')} class="login-btn google">
                Sign in with Google
            </button>
            <button on:click={() => handleLogin('Github')} class="login-btn github">
                Sign in with GitHub
            </button>
        </div>
    {/if}
</div>

<style>
    .auth-component {
        padding: 2rem;
        text-align: center;
    }
    
    .login-btn, .logout-btn {
        display: block;
        width: 200px;
        margin: 0.5rem auto;
        padding: 0.75rem 1rem;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 1rem;
    }
    
    .login-btn.google {
        background: #4285f4;
        color: white;
    }
    
    .login-btn.github {
        background: #333;
        color: white;
    }
    
    .logout-btn {
        background: #dc3545;
        color: white;
    }
    
    .login-btn:hover, .logout-btn:hover {
        opacity: 0.9;
    }
    
    .user-info {
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 1rem;
        max-width: 300px;
        margin: 0 auto;
    }
</style>