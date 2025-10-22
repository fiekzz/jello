// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: {
				userId: string;
				createdAt: Date;
				email: string;
				password: string;
				updatedAt: Date;
			} | null
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export { };
