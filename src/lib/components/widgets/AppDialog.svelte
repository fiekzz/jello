
<script lang="ts">
    import * as Dialog from '$lib/components/ui/dialog/index'
	import type { Component, Snippet } from 'svelte';
	import DialogContent from '../ui/dialog/dialog-content.svelte';
	import DialogHeader from '../ui/dialog/dialog-header.svelte';
	import type { IconProps } from '@lucide/svelte';
	import Button from '../ui/button/button.svelte';

    interface AppDialogTriggerProps {
        // children: Snippet<[]>
        icon: Component<IconProps, {}, ''>
        title: string
    }

    interface AppDialogProps {
        title: string
        trigger: AppDialogTriggerProps
        children: Snippet<[]>
    }

    let { title, trigger, children }: AppDialogProps = $props();

    let openDialog = $state(false);

</script>

<Dialog.Root bind:open={openDialog}>
    <Button onclick={() => openDialog = true} variant="outline">
        <trigger.icon class="mr-2 h-4 w-4" />
        {trigger.title}
    </Button>
    <DialogContent>
        <DialogHeader>{title}</DialogHeader>
        {@render children?.()}
    </DialogContent>
</Dialog.Root>