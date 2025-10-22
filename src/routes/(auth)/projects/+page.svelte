<script lang="ts">
	import PageLayout from '$lib/components/widgets/PageLayout.svelte';
	import { ProjectViewModel } from './project-viewmodel';
	import NewProject from './NewProject.svelte';

	// import * as Table from '$lib/components/ui/table/index.js';
	import * as Table from '$lib/components/ui/table/index';
	import {
		FlexRender,
		createSvelteTable,
		renderComponent,
		renderSnippet
	} from '$lib/components/ui/data-table/index.js';
	import { getCoreRowModel, type ColumnDef } from '@tanstack/table-core';
	import type { Projects } from '@prisma/client';

	const viewModel = new ProjectViewModel();

	const columns: ColumnDef<Projects>[] = []

	const { data } = $props();

	const table = createSvelteTable({
		data: data.projects,
		columns,
		getCoreRowModel: getCoreRowModel()
	});
</script>

<PageLayout title="Projects" actions={[]}>
	<NewProject />
	<div class="rounded-md border my-4">
		<Table.Root>
			<Table.Header>
				{#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
					<Table.Row>
						{#each headerGroup.headers as header (header.id)}
							<Table.Head class="[&:has([role=checkbox])]:pl-3">
								{#if !header.isPlaceholder}
									<FlexRender
										content={header.column.columnDef.header}
										context={header.getContext()}
									/>
								{/if}
							</Table.Head>
						{/each}
					</Table.Row>
				{/each}
			</Table.Header>
			<Table.Body>
				{#each table.getRowModel().rows as row (row.id)}
					<Table.Row data-state={row.getIsSelected() && 'selected'}>
						{#each row.getVisibleCells() as cell (cell.id)}
							<Table.Cell class="[&:has([role=checkbox])]:pl-3">
								<FlexRender content={cell.column.columnDef.cell} context={cell.getContext()} />
							</Table.Cell>
						{/each}
					</Table.Row>
				{:else}
					<Table.Row>
						<Table.Cell colspan={columns.length} class="h-24 text-center">No results.</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
</PageLayout>
