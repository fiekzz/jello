<script lang="ts">
	import CalendarIcon from '@lucide/svelte/icons/calendar';
	import HouseIcon from '@lucide/svelte/icons/house';
	import InboxIcon from '@lucide/svelte/icons/inbox';
	import SearchIcon from '@lucide/svelte/icons/search';
	import SettingsIcon from '@lucide/svelte/icons/settings';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import ChevronUp from '@lucide/svelte/icons/chevron-up';
	import { logout } from '$lib/services/auth/auth';
	import { goto } from '$app/navigation';
	import Button from '../ui/button/button.svelte';
	import {
		BookText,
		ChevronLeft,
		ChevronRight,
		ChevronsLeft,
		ChevronsRight,
		Headset
	} from '@lucide/svelte';
	import AppRoutes from '$lib/paths/routes';

	let sidebarGroups = AppRoutes.getInstance().getSidebarGroups();

	let sidebarFooter = AppRoutes.getInstance().getSidebarFooterGroups();

	// Menu items.
	// const AppLocalsManagement = [
	// 	{
	// 		title: 'Projects',
	// 		url: '/projects',
	// 		icon: InboxIcon
	// 	},
	// 	{
	// 		title: 'Tasks',
	// 		url: '/tasks',
	// 		icon: CalendarIcon
	// 	},
	// 	{
	// 		title: 'Contributors',
	// 		url: '#',
	// 		icon: SearchIcon
	// 	},
	// 	{
	// 		title: 'Settings',
	// 		url: '#',
	// 		icon: SettingsIcon
	// 	}
	// ];

	// const AppDashboard = [
	// 	{
	// 		title: 'Dashboard',
	// 		url: '/dashboard',
	// 		icon: HouseIcon
	// 	}
	// ];

	// const AppCMSManagement = [
	// 	{
	// 		title: 'Pages',
	// 		url: '#',
	// 		icon: InboxIcon
	// 	},
	// 	{
	// 		title: 'Posts',
	// 		url: '#',
	// 		icon: CalendarIcon
	// 	},
	// 	{
	// 		title: 'Media',
	// 		url: '#',
	// 		icon: SearchIcon
	// 	},
	// 	{
	// 		title: 'Categories',
	// 		url: '#',
	// 		icon: SettingsIcon
	// 	}
	// ];

	// const AppUsersManagement = [
	// 	{
	// 		title: 'User List',
	// 		url: '#',
	// 		icon: InboxIcon
	// 	},
	// 	{
	// 		title: 'Roles & Permissions',
	// 		url: '#',
	// 		icon: CalendarIcon
	// 	},
	// 	{
	// 		title: 'Activity Logs',
	// 		url: '#',
	// 		icon: SearchIcon
	// 	},
	// 	{
	// 		title: 'Settings',
	// 		url: '#',
	// 		icon: SettingsIcon
	// 	}
	// ];

	interface SidebarProps {
		openAction: () => void;
		isOpen: boolean;
		data: AppUser | null;
	}

	let { data, openAction, isOpen }: SidebarProps = $props();
</script>

<Sidebar.Root variant="sidebar" collapsible="icon">
	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.GroupLabel class="flex items-center justify-between">
				Jello
				<Button onclick={openAction} variant="ghost" size="icon" class="h-6 w-6 p-2">
					{#if isOpen}
						<ChevronsLeft />
					{:else}
						<ChevronsRight />
					{/if}
				</Button>
			</Sidebar.GroupLabel>
		</Sidebar.Group>
		{#each sidebarGroups as group, index}
			<Sidebar.Group>
				{#if group.title != ''}
					<Sidebar.GroupLabel>
						{group.title}
					</Sidebar.GroupLabel>
				{/if}
				<Sidebar.GroupContent>
					<Sidebar.Menu>
						{#each group.routes as routeItem}
							<Sidebar.MenuItem>
								<Sidebar.MenuButton>
									{#snippet child({ props })}
										<a href={routeItem.url} {...props}>
											<routeItem.icon />
											<span>{routeItem.title}</span>
										</a>
									{/snippet}
								</Sidebar.MenuButton>
							</Sidebar.MenuItem>
						{/each}
					</Sidebar.Menu>
				</Sidebar.GroupContent>
			</Sidebar.Group>
			{#if index < sidebarGroups.length - 1}
				<Sidebar.Separator />
			{/if}
		{/each}
	</Sidebar.Content>
	<Sidebar.Footer>
		{#each sidebarFooter as group, index}
			{#if index === 0}
				<Sidebar.Separator />
			{/if}
			{#if group.title != ''}
				<Sidebar.GroupLabel>
					{group.title}
				</Sidebar.GroupLabel>
			{/if}
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					{#each group.routes as routeItem}
						<Sidebar.MenuItem>
							<Sidebar.MenuButton>
								{#snippet child({ props })}
									<a href={routeItem.url} {...props}>
										<routeItem.icon />
										<span>{routeItem.title}</span>
									</a>
								{/snippet}
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					{/each}
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		{/each}
		<!-- <Sidebar.Group>
			<Sidebar.GroupLabel>Help & Support</Sidebar.GroupLabel>
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					<Sidebar.MenuItem>
						<Sidebar.MenuButton class="text-gray-300">
							<a href="#documentation" class="flex flex-row items-center gap-2">
								<BookText class="h-4 w-4" />
								<span>Documentation</span>
							</a>
						</Sidebar.MenuButton>
					</Sidebar.MenuItem>
					<Sidebar.MenuItem>
						<Sidebar.MenuButton class="text-gray-300">
							<a href="#contact-support" class="flex flex-row items-center gap-2">
								<Headset class="h-4 w-4" />
								<span>Contact Support</span>
							</a>
						</Sidebar.MenuButton>
					</Sidebar.MenuItem>
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group> -->
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						{#snippet child({ props })}
							<Sidebar.MenuButton
								{...props}
								class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
							>
								{#if isOpen}
									{#if data?.imageUrl}
										<div class="flex items-center justify-center">
											<img
												src={data.imageUrl}
												alt="User Avatar"
												class="h-6 w-6 rounded-full mr-2"
											/>
											<div class="flex flex-col justify-center">
												<div class="font-medium text-xs">{data.name}</div>
												<div class="text-xs text-gray-400">{data.email}</div>
											</div>
										</div>
									{:else}
										<div
											class="h-6 w-6 rounded-full bg-gray-400 mr-2 flex items-center justify-center text-white"
										>
											{data?.email ? data.email.charAt(0).toUpperCase() : 'U'}
										</div>
									{/if}
								{:else if data?.imageUrl}
									<img src={data.imageUrl} alt="User Avatar" class="h-6 w-6 rounded-full" />
								{:else}
									<div
										class="h-6 w-6 rounded-full bg-gray-400 flex items-center justify-center text-white"
									>
										{data?.email ? data.email.charAt(0).toUpperCase() : 'U'}
									</div>
								{/if}
								<ChevronUp class="ml-auto" />
							</Sidebar.MenuButton>
						{/snippet}
					</DropdownMenu.Trigger>
					<DropdownMenu.Content side="top" class="w-(--bits-dropdown-menu-anchor-width)">
						<DropdownMenu.Item>
							<span>Account</span>
						</DropdownMenu.Item>
						<DropdownMenu.Item
							onclick={async () => {
								const success = await logout();

								if (success) {
									goto('/sign-in');
								}
							}}
						>
							<span>Sign out</span>
						</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Footer>
</Sidebar.Root>
