import { CalendarIcon, InboxIcon, SearchIcon, SettingsIcon, type IconProps } from "@lucide/svelte";
import type { Component } from "svelte";

interface SidebarGroup {
    title: string
    routes: SidebarRoute[]
}

interface SidebarRoute {
    title: string
    url: string
    icon: Component<IconProps, {}, "">
}

class AppRoutes {

    private static readonly instance = new AppRoutes();

    private constructor() { }

    public static getInstance(): AppRoutes {
        return AppRoutes.instance;
    }

    getProtectedRoutes(): string[] {
        return [
            '/dashboard',
            '/projects',
            '/tasks'
        ]
    }

    getPublicRoutes(): string[] {
        return [
            '/sign-in',
            '/sign-up'
        ]
    }

    getProtectedApiRoutes(): string[] {
        return [
            '/api/v1/projects/create',
            '/api/v1/projects/delete'
        ]
    }

    getSidebarGroups(): SidebarGroup[] {
        return [
            {
                title: '',
                routes: [
                    {
                        title: 'Dashboard',
                        url: '/dashboard',
                        icon: InboxIcon
                    }
                ]
            },
            {
                title: 'Project Management',
                routes: [
                    {
                        title: 'Projects',
                        url: '/projects',
                        icon: InboxIcon
                    }
                ]
            },
            {
                title: 'CMS Management',
                routes: [
                    {
                        title: 'Pages',
                        url: '#',
                        icon: InboxIcon
                    },
                    {
                        title: 'Posts',
                        url: '#',
                        icon: CalendarIcon
                    },
                    {
                        title: 'Media',
                        url: '#',
                        icon: SearchIcon
                    },
                    {
                        title: 'Categories',
                        url: '#',
                        icon: SettingsIcon
                    }
                ]
            },
            {
                title: 'Locals Management',
                routes: [
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
                ]
            },
            {
                title: 'Users & Permissions',
                routes: [
                    {
                        title: 'User List',
                        url: '#',
                        icon: InboxIcon
                    },
                    {
                        title: 'Roles & Permissions',
                        url: '#',
                        icon: CalendarIcon
                    },
                    {
                        title: 'Activity Logs',
                        url: '#',
                        icon: SearchIcon
                    },
                    {
                        title: 'Settings',
                        url: '#',
                        icon: SettingsIcon
                    }
                ]
            }
        ]
    }

    getSidebarFooterGroups(): SidebarGroup[] {
        return [
            {
                title: 'Help & Support',
                routes: [
                    {
                        title: 'Documentation',
                        url: '#',
                        icon: InboxIcon
                    },
                    {
                        title: 'Contact Support',
                        url: '#',
                        icon: CalendarIcon
                    }
                ]
            }
        ]
    }
}



export default AppRoutes