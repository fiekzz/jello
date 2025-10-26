<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { ChevronLeft, type IconProps } from '@lucide/svelte';
	import type { Component, Snippet } from 'svelte';
	import AppButton from './AppButton.svelte';
	import AppBreadcrumb from './AppBreadcrumb.svelte';
	let { title, actions = [], children, breadcrumbsItems } : LayoutComponentProps = $props();

	interface LayoutActions {
		title: string;
		icon: Component<IconProps, {}, ''>;
		action: () => void;
	}

	interface LayoutComponentProps {
		title: string;
		actions: LayoutActions[];
		children: Snippet<[]>;
		breadcrumbsItems: Array<{ title: string; href: string }>;
	}
</script>

<div class="w-full">
	<div class="mb-8">
		<div class="flex flex-row justify-between">
			<div class="flex flex-row gap-4 items-center">
				<AppButton variant="ghost" onclick={() => history.back()} className="h-6 w-6 p-0">
					<ChevronLeft />
				</AppButton>
				<div>
					<AppBreadcrumb items={breadcrumbsItems} />
				</div>
				<!-- <h2 class="text-3xl">{title}</h2> -->
			</div>
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
