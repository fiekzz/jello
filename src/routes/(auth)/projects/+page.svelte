<script lang="ts">
	import PageLayout from '$lib/components/widgets/PageLayout.svelte';
	import { ProjectViewModel, type ProjectWithTasks } from './project-viewmodel';
	import NewProject from './NewProject.svelte';
	import * as Table from '$lib/components/ui/table/index';
	import {
		FlexRender,
		createSvelteTable,
		renderComponent,
		renderSnippet
	} from '$lib/components/ui/data-table/index.js';
	import { getCoreRowModel, type ColumnDef } from '@tanstack/table-core';
	import type { Tasks } from '@prisma/client';
	import { toast } from 'svelte-sonner';
	import { goto, invalidateAll } from '$app/navigation';
	import Button from '$lib/components/ui/button/button.svelte';
	import ProjectActions from './ProjectActions.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import type { Snippet } from 'svelte';
	import DataTableCheckbox from '$lib/components/widgets/tables/DataTableCheckbox.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import Card from '$lib/components/ui/card/card.svelte';
	import IconLabel from '$lib/components/widgets/IconLabel.svelte';
	import { Calendar, InboxIcon, UserRound } from '@lucide/svelte';
	import { DateTime } from 'luxon';

	const viewModel = new ProjectViewModel();

	const { data } = $props();

	let projectsTable = $state(data.projects);

	$effect(() => {
		projectsTable = data.projects;
	});

	async function handleCreateProject(name: string, description: string) {
		try {
			await viewModel.createProject(name, description);

			toast.success('Project created successfully.');
			openDialog = false;

			await invalidateAll();
		} catch (error) {
			toast.error('Failed to create project.');
		}
	}

	let openDialog = $state(false);
</script>

<PageLayout
	title="Projects"
	actions={[]}
	breadcrumbsItems={[{ title: 'Projects', href: '/projects' }]}
>
	<div class="flex flex-row justify-between items-center">
		<Label class="text-lg font-medium">All Projects</Label>
		<NewProject bind:openDialog onCreate={handleCreateProject} />
	</div>
	<div class="flex flex-col mt-4">
		{#each projectsTable as project (project.uuid)}
			<Card class="mb-4 p-4 cursor-pointer" onclick={() => goto(`/projects/${project.uuid}`)}>
				<div class="flex flex-col">
					<div class="flex flex-col">
						<h2 class="text-xl font-semibold">{project.name}</h2>
						<div class="flex flex-row items-center gap-4">
							<IconLabel IconLabel={InboxIcon} label={project.description ?? ''} />
							<IconLabel
								IconLabel={Calendar}
								label={DateTime.fromJSDate(new Date(project.createdAt)).toFormat('dd MMM yyyy')}
							/>
							<IconLabel IconLabel={UserRound} label={project.owner.fullName ?? 'Unknown Owner'} />
						</div>
					</div>
					<Separator class="my-2" />
					<div class="flex justify-between items-center">
						<p class="text-sm text-gray-500 mt-1">
							Updated {DateTime.now()
								.diff(DateTime.fromJSDate(new Date(project.updatedAt)), 'days')
								.days.toFixed(0)} day ago
						</p>
						<ProjectActions
							onEdit={async () => {
								// Handle edit action
							}}
							onDelete={async () => {
								try {
									await viewModel.deleteProject(project.uuid);
									toast.success('Project deleted successfully.');
									await invalidateAll();
									console.log('Project deleted, refreshed data.');
								} catch (error) {
									console.error(error);

									toast.error('Failed to delete project.');
								}
							}}
							projectId={project.uuid}
						/>
					</div>
				</div>
			</Card>
		{/each}
	</div>
</PageLayout>
