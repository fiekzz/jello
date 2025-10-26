<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/button/button.svelte';
	import Card from '$lib/components/ui/card/card.svelte';
	import FieldGroup from '$lib/components/ui/field/field-group.svelte';
	import Field from '$lib/components/ui/field/field.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import { loginWithSocial } from '$lib/services/auth/auth';
	import AuthService from '$lib/services/auth/auth-zero';
	import type { Auth0Client } from '@auth0/auth0-spa-js';
	import { onMount } from 'svelte';

	async function handleGoogleSignIn() {
		try {
			
			const service = AuthService.getInstance();
			const client: Auth0Client = await service.initAuth();

			const success = await loginWithSocial('google-oauth2');

			if (success) {
				goto('/dashboard');
			}

			if (await client.isAuthenticated()) {
				goto('/dashboard');
			}

		} catch (error) {
			console.error('Error during Google sign-in:', error);
		}
	}

	async function handleGithubSignIn() {
		try {
			
			const service = AuthService.getInstance()
			const client: Auth0Client = await service.initAuth();

			const success = await loginWithSocial('Github');

			if (success) {
				goto('/dashboard');
			}

			if (await client.isAuthenticated()) {
				goto('/dashboard');
			}

		} catch (error) {
			console.error('Error during GitHub sign-in:', error);
		}
	}
</script>

<div class="w-full flex flex-col items-center justify-center px-4 py-8 space-y-6">
	<div class="w-full h-full items-center justify-center space-y-6">
		<Card class="p-6 max-w-lg space-y-4">
			<Label>Jello</Label>
			<div class="w-full flex flex-row">
				<Button class="" onclick={handleGoogleSignIn}>Google</Button>
				<Button class="ml-2" onclick={handleGithubSignIn}>GitHub</Button>
			</div>
		</Card>
	</div>
</div>
