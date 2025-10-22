<script lang="ts">
	import Button from "$lib/components/ui/button/button.svelte";
	import FieldGroup from "$lib/components/ui/field/field-group.svelte";
	import FieldSet from "$lib/components/ui/field/field-set.svelte";
	import Field from "$lib/components/ui/field/field.svelte";
	import Input from "$lib/components/ui/input/input.svelte";
	import Label from "$lib/components/ui/label/label.svelte";
	import AppDialog from "$lib/components/widgets/AppDialog.svelte";
	// import { Plus } from "@lucide/svelte/icons";
    import { Plus } from "@lucide/svelte";
</script>

<AppDialog title="Create new project" trigger={{
    icon: Plus,
    title: "New Project"
}}>
    <div>
        <FieldGroup>
            <FieldSet>
                <Field>
                    <Label>Name</Label>
                    <Input placeholder="e.g. My Project" />
                </Field>
                <Field>
                    <Label>Description</Label>
                    <Input placeholder="e.g. This is my project description" />
                </Field>
            </FieldSet>
            <Button>Create project</Button>
        </FieldGroup>
    </div>
</AppDialog>