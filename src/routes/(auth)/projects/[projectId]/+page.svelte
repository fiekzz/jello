<script lang="ts">
	import PageLayout from '$lib/components/widgets/PageLayout.svelte';

	let { data } = $props();
</script>

<PageLayout
	title="Project Details"
	actions={[]}
	breadcrumbsItems={[
		{ title: 'Projects', href: '/projects' },
		{
			title: data.project ? data.project.name : 'Project Details',
			href: `/projects/${data.project?.uuid || ''}`
		}
	]}
>
	{#if data.project}
		<div class="space-y-4">
			<h2 class="text-2xl font-semibold">{data.project.name}</h2>
			<p>{data.project.description}</p>
		</div>
	{:else}
		<p>Project not found.</p>
	{/if}
</PageLayout>
