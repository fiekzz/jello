<script lang="ts">
	import type { Snippet } from 'svelte';
	import Button from '../ui/button/button.svelte';

	let {
        children,
		variant = "ghost",
		size = "icon",
		disabled = false,
		onclick = () => {},
		className = ''
	}: AppButtonProps = $props();

	interface AppButtonProps {
		variant?: "secondary" | "ghost" | "link" | "default" | "destructive" | "outline" | undefined
		size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg" | undefined;
		disabled?: boolean;
		onclick?: () => void;
		children?: Snippet<[]>;
		className?: string;
	}
</script>

<Button class={className} {variant} size={size} {disabled} onclick={onclick}>
	{@render children?.()}
</Button>
