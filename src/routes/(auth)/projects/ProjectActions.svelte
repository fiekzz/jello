<script lang="ts">
	import Button from "$lib/components/ui/button/button.svelte";
	import AppDialog from "$lib/components/widgets/AppDialog.svelte";
	import { Pen, PenIcon, Trash, Trash2 } from "@lucide/svelte";

    interface Props {
        onEdit: () => Promise<void>;
        onDelete: () => Promise<void>;
        projectId: string;
    }

    let { onEdit, onDelete, projectId }: Props = $props();

    let isOpen = $state(false);

</script>


<div class="flex items-center flex-row gap-2">
    <Button variant="outline" onclick={onEdit}>
        <PenIcon />
    </Button>
    <AppDialog title="Confirm Deletion" bind:openDialog={isOpen} trigger={{
        icon: Trash2,
        title: "",
        triggerVariant: "outline",
        triggerColor: "text-red-600"
    }}>
        <div class="space-y-4">
            <p>Are you sure you want to delete this project? This action cannot be undone.</p>
            <div class="flex flex-col gap-2">
                <Button class="w-full" variant="outline" onclick={() => {
                    isOpen = false;
                }}>Cancel</Button>
                <Button class="w-full" variant="destructive" onclick={onDelete}>Delete</Button>
            </div>
        </div>
    </AppDialog>
</div>