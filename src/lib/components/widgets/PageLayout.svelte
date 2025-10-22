<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import type { IconProps } from '@lucide/svelte';
	import type { Component, Snippet } from 'svelte';
	let { title, actions = [], children }: LayoutComponentProps = $props();

	interface LayoutActions {
		title: string;
		icon: Component<IconProps, {}, ''>;
		action: () => void;
	}

	interface LayoutComponentProps {
		title: string;
		actions: LayoutActions[];
		children: Snippet<[]>;
	}
</script>

<div class="w-full">
	<div class="mb-8">
		<div class="flex flex-row justify-between">
			<h2 class="text-3xl">{title}</h2>
			<div class="flex flex-row gap-4">
				{#each actions as action (action.title)}
					<Button
						onclick={() => {
							action.action();
						}}
					>
						<!-- {@html action.icon.outerHTML} -->
						{#if action.icon}
							{#if action.icon}
								<action.icon class="mr-2 h-4 w-4" />
							{/if}
						{/if}
						{action.title}
					</Button>
				{/each}
			</div>
		</div>
		<Separator class="my-4 w-full" />
		<div class="w-full">
			{@render children?.()}
		</div>
	</div>
</div>
