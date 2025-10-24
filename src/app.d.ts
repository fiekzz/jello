// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: AppUser | null
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	interface AppUser {
		userId: string;
		email: string;
		imageUrl?: string;
		name?: string;
	}

	interface ImportMetaEnv {
		readonly AUTH0_DOMAIN: string;
		readonly AUTH0_CLIENT_ID: string;
	}

	interface ImportMeta {
		readonly env: ImportMetaEnv;
	}
}

export { };
