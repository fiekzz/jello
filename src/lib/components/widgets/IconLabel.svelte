<script lang="ts">
	import type { IconProps } from "@lucide/svelte";
	import type { Component } from "svelte";

    interface IconLabelProps {
        IconLabel: Component<IconProps, {}, ''>
        label: string
    }

    let { IconLabel, label }: IconLabelProps = $props();
</script>


<div class="flex flex-row gap-2 my-2 items-center">
    <IconLabel class="h-4 w-4" />
    <p class="text-sm">{label}</p>
</div>