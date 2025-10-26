<script lang="ts">
	import PageLayout from '$lib/components/widgets/PageLayout.svelte';
	import { ProjectViewModel, type ProjectWithTasks } from './project-viewmodel';
	import NewProject from './NewProject.svelte';
	import * as Table from '$lib/components/ui/table/index';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
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
	import { BookText, Calendar, InboxIcon, UserRound } from '@lucide/svelte';
	import { DateTime } from 'luxon';

	const viewModel = new ProjectViewModel();

	const { data } = $props();

	let projectsTable = $state(data.projects);

	$effect(() => {
		projectsTable = data.projects;
	});

	async function handleCreateProject(name: string, description: string, imageFile: FileList | undefined) {
		try {

			if (!imageFile) {
				toast.error('Please select an image file.');
				return;
			}

			await viewModel.createProject(name, description, imageFile);

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
					<div class="flex flex-col gap-2">
						<div class="flex flex-row justify-between items-center">
							<div class="flex flex-row items-center gap-4">
								<Avatar.Root class="border-2 rounded-full border-gray-300">
									{#if project.ProjectImage}
										<Avatar.Image
											src={project.ProjectImage.mediaUrl}
											alt={project.name}
										/>
										<Avatar.Fallback>
											{project.name
												? project.name
														.split(' ')
														.map((n) => n[0])
														.join('')
												: 'P'}
										</Avatar.Fallback>
									{:else}
										<Avatar.Fallback>
											{project.name
												? project.name
														.split(' ')
														.map((n) => n[0])
														.join('')
												: 'P'}
										</Avatar.Fallback>
									{/if}
								</Avatar.Root>
								<h2 class="text-xl font-semibold">{project.name}</h2>
							</div>
							<div
								class="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale"
							>
								{#each project.collaborators as collaborator}
									{#if collaborator.ProfileImage}
										<Avatar.Root>
											<Avatar.Image
												src={collaborator.ProfileImage.mediaUrl}
												alt={collaborator.fullName || 'Collaborator'}
											/>
											<Avatar.Fallback>
												{collaborator.fullName
													? collaborator.fullName
															.split(' ')
															.map((n) => n[0])
															.join('')
													: 'C'}
											</Avatar.Fallback>
										</Avatar.Root>
									{:else}
										<Avatar.Root>
											<Avatar.Fallback>
												{collaborator.fullName
													? collaborator.fullName
															.split(' ')
															.map((n) => n[0])
															.join('')
													: 'C'}
											</Avatar.Fallback>
										</Avatar.Root>
									{/if}
								{/each}
							</div>
						</div>
						<div class="flex flex-row items-center gap-4">
							<IconLabel IconLabel={BookText} label={project.description ?? ''} />
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
