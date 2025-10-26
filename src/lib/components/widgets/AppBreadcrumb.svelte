<script lang="ts">
    import * as Breadcrumb from '$lib/components/ui/breadcrumb/index';
    import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index';

    interface AppBreadcrumbProps {
        items: Array<{ title: string; href: string }>;
    }

    let { items }: AppBreadcrumbProps = $props();

    // if items length exceeds 6, collapse the 2nd to length-4 items into a dropdown
    const shouldCollapse = items.length > 6;
    const collapsedItems = shouldCollapse ? items.slice(1, items.length - 4) : [];
    const visibleItems = shouldCollapse
        ? [items[0], ...items.slice(items.length - 4)]
        : items;
</script>

<Breadcrumb.Root>
    <Breadcrumb.List>
        {#each visibleItems as item, index}
            {#if shouldCollapse && item === visibleItems[1]}
                <Breadcrumb.Item>
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger>
                            <Breadcrumb.Link href="javascript:void(0);">...</Breadcrumb.Link>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content align="start">
                            {#each collapsedItems as collapsedItem, index}
                                <DropdownMenu.Item>
                                    {#if index === collapsedItems.length - 1}
                                        <Breadcrumb.Link href={collapsedItem.href} class="font-bold">{collapsedItem.title}</Breadcrumb.Link>
                                    {:else}
                                        <Breadcrumb.Link href={collapsedItem.href}>{collapsedItem.title}</Breadcrumb.Link>
                                    {/if}
                                </DropdownMenu.Item>
                            {/each}
                        </DropdownMenu.Content>
                    </DropdownMenu.Root>
                </Breadcrumb.Item>
            {:else}
                {#if index === items.length - 1}
                    <Breadcrumb.Item>
                        <Breadcrumb.Link>{item.title}</Breadcrumb.Link>
                    </Breadcrumb.Item>
                {:else}
                    <Breadcrumb.Item>
                        <Breadcrumb.Link href={item.href}>{item.title}</Breadcrumb.Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Separator />
                {/if}
            {/if}
        {/each}
    </Breadcrumb.List>
</Breadcrumb.Root>