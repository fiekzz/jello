<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import type { Snippet } from 'svelte';
	import Button, { buttonVariants } from '../ui/button/button.svelte';
	import AppSidebar from './AppSidebar.svelte';
	import ModeChanger from './ModeChanger.svelte';
	import { ChevronRight, ChevronLeft, ChevronsRight } from '@lucide/svelte/icons';

	let { children, data }: SidebarProps = $props();

	interface SidebarProps {
		children: Snippet<[]>;
		data: AppUser | null;
	}

	let isOpen = $state(true);
</script>

<Sidebar.Provider open={isOpen} onOpenChange={(e) => (isOpen = e)}>
	<AppSidebar {data} openAction={() => (isOpen = !isOpen)} {isOpen} />
	<main class="w-full">
		<div class="mt-4 flex items-center justify-between px-4">
			{#if !isOpen}
				<Button onclick={() => (isOpen = !isOpen)} variant="ghost" size="icon" class="h-6 w-6 p-2">
					<ChevronsRight />
				</Button>
			{/if}
			<ModeChanger />
		</div>
		{@render children?.()}
	</main>
</Sidebar.Provider>
