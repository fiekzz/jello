<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import type { Snippet } from 'svelte';
	import Button, { buttonVariants } from '../ui/button/button.svelte';
	import AppSidebar from './AppSidebar.svelte';
	import ModeChanger from './ModeChanger.svelte';
	import { ChevronRight, ChevronLeft } from '@lucide/svelte/icons';

	let { children, data }: SidebarProps = $props();

	interface SidebarProps {
		children: Snippet<[]>
		data: AppUser | null
	}

	let isOpen = $state(true);
</script>

<Sidebar.Provider bind:open={isOpen}>
	<AppSidebar data={data} />
	<main class="w-full">
		<div class="mt-4 flex items-center justify-between px-4">
			<Button onclick={() => (isOpen = !isOpen)} variant="outline" size="icon">
				{#if isOpen}
					<ChevronLeft />
				{:else}
					<ChevronRight />
				{/if}
			</Button>
			<ModeChanger />
		</div>
		{@render children?.()}
	</main>
</Sidebar.Provider>
