<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import Sidebar from '$lib/components/widgets/Sidebar.svelte';
	import { ModeWatcher } from 'mode-watcher';
	import '../../app.css'

	let { children, data } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<ModeWatcher />
<Sidebar data={data.user}>
	<div class="p-4">
		{@render children?.()}
	</div>
</Sidebar>
