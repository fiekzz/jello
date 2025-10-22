setup_svelte:
	rm -rf node_modules && rm -rf .svelte-kit && bun install && npx svelte-kit sync

setup_db:
	npx prisma generate

setup:
	$(MAKE) setup_svelte
	$(MAKE) setup_db