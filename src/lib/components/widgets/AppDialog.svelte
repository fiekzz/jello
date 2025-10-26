<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index';
	import type { Component, Snippet } from 'svelte';
	import DialogContent from '../ui/dialog/dialog-content.svelte';
	import DialogHeader from '../ui/dialog/dialog-header.svelte';
	import type { IconProps } from '@lucide/svelte';
	import Button from '../ui/button/button.svelte';
	import AppButton from './AppButton.svelte';

	interface AppDialogTriggerProps {
		icon: Component<IconProps, {}, ''>;
		title: string;
		openDialog?: boolean;
		triggerVariant?:
			| 'link'
			| 'default'
			| 'destructive'
			| 'outline'
			| 'secondary'
			| 'ghost'
			| undefined;
		triggerColor?: string;
	}

	interface AppDialogProps {
		title: string;
		trigger: AppDialogTriggerProps;
		children: Snippet<[]>;
		openDialog?: boolean;
	}

	let { title, trigger, children, openDialog = $bindable(false) }: AppDialogProps = $props();
</script>

<Dialog.Root bind:open={openDialog}>
	<Button
		onclick={(e) => {
			e.stopPropagation();
			openDialog = true;
		}}
		variant={trigger.triggerVariant}
		class="flex items-center gap-2"
	>
		<trigger.icon class={`h-4 w-4 ${trigger.triggerColor}`} />
		{trigger.title}
	</Button>
	<DialogContent>
		<DialogHeader>{title}</DialogHeader>
		{@render children?.()}
	</DialogContent>
</Dialog.Root>
