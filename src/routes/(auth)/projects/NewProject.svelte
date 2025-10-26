<script lang="ts">
	import Button from "$lib/components/ui/button/button.svelte";
	import FieldGroup from "$lib/components/ui/field/field-group.svelte";
	import FieldSet from "$lib/components/ui/field/field-set.svelte";
	import Field from "$lib/components/ui/field/field.svelte";
	import Input from "$lib/components/ui/input/input.svelte";
	import Label from "$lib/components/ui/label/label.svelte";
	import AppDialog from "$lib/components/widgets/AppDialog.svelte";
	import AppUploadImage from "$lib/components/widgets/AppUploadImage.svelte";
	// import { Plus } from "@lucide/svelte/icons";
    import { Plus } from "@lucide/svelte";
	import { toast } from "svelte-sonner";

    interface Props {
        onCreate: (name: string, description: string, imageFile: FileList | undefined) => Promise<void>;
        openDialog?: boolean;
    }

    let { onCreate, openDialog = $bindable(false) }: Props = $props();

    let name: string = $state('');
    let description: string = $state('');
    let imageFile: FileList | undefined = $state();

    async function handleCreate() {
        if (onCreate) {

            if (!name || name.trim() === '') {
                toast.error('Project name is required.');
                return;
            }

            if (!description || description.trim() === '') {
                toast.error('Project description is required.');
                return;
            }

            await onCreate(name, description, imageFile);

            name = '';
            description = '';
            imageFile = undefined;
            openDialog = false;
        }
    }
</script>

<AppDialog title="Create new project" trigger={{
    icon: Plus,
    title: "New Project",
    triggerVariant: "outline"
}} bind:openDialog={openDialog}>
    <div>
        <FieldGroup>
            <FieldSet>
                <AppUploadImage bind:imageFile={imageFile} />
                <Field>
                    <Label>Name</Label>
                    <Input bind:value={name} placeholder="e.g. My Project" />
                </Field>
                <Field>
                    <Label>Description</Label>
                    <Input bind:value={description} placeholder="e.g. This is my project description" />
                </Field>
            </FieldSet>
            <Button onclick={handleCreate}>Create project</Button>
        </FieldGroup>
    </div>
</AppDialog>