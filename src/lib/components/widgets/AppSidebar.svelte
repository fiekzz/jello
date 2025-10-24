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

	// Menu items.
	const items = [
		{
			title: 'Dashboard',
			url: '/dashboard',
			icon: HouseIcon
		},
		{
			title: 'Projects',
			url: '/projects',
			icon: InboxIcon
		},
		{
			title: 'Tasks',
			url: '/tasks',
			icon: CalendarIcon
		},
		{
			title: 'Contributors',
			url: '#',
			icon: SearchIcon
		},
		{
			title: 'Settings',
			url: '#',
			icon: SettingsIcon
		}
	];

	let { data }: { data: AppUser | null } = $props();
</script>

<Sidebar.Root>
	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.GroupLabel>Application</Sidebar.GroupLabel>
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					{#each items as item (item.title)}
						<Sidebar.MenuItem>
							<Sidebar.MenuButton>
								{#snippet child({ props })}
									<a href={item.url} {...props}>
										<item.icon />
										<span>{item.title}</span>
									</a>
								{/snippet}
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					{/each}
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
	</Sidebar.Content>
	<Sidebar.Footer>
		<Sidebar.Group>
			<Sidebar.GroupLabel>Help & Support</Sidebar.GroupLabel>
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					<Sidebar.MenuItem>
						<Sidebar.MenuButton>
							<a>
								<span>Documentation</span>
							</a>
						</Sidebar.MenuButton>
					</Sidebar.MenuItem>
					<Sidebar.MenuItem>
						<Sidebar.MenuButton>
							<a>
								<span>Contact Support</span>
							</a>
						</Sidebar.MenuButton>
					</Sidebar.MenuItem>
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						{#snippet child({ props })}
							<Sidebar.MenuButton
								{...props}
								class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
							>
								{#if data?.imageUrl}
									<div class="flex items-center">
										<img src={data.imageUrl} alt="User Avatar" class="h-6 w-6 rounded-full mr-2" />
										<span>{data.name}</span>
									</div>
								{:else}
									<div
										class="h-6 w-6 rounded-full bg-gray-400 mr-2 flex items-center justify-center text-white"
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
						<DropdownMenu.Item onclick={async () => {
							const success = await logout()

							if (success) {
								goto('/sign-in');
							}
						}}>
							<span>Sign out</span>
						</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Footer>
</Sidebar.Root>
