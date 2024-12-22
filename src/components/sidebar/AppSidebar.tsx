'use client'
import { FileMusic, Guitar, Home } from 'lucide-react'

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar'
import UserLabel from './UserLabel'

// Menu items.
const items = [{ title: 'Home', url: '/', icon: Home }]

// Generation items.
const generationItems = [
	{ title: 'Tab Generator', url: '/tab-generator', icon: FileMusic },
]

// Projects items
const projectsItems = [
	{ title: 'My Projects', url: '/project', icon: Guitar },
	{ title: 'Create Project', url: '/project/create', icon: Guitar },
]

export function AppSidebar() {
	return (
		<Sidebar>
			<SidebarContent className='h-full'>
				<SidebarGroup className='h-full'>
					<div className='my-4'>
						<span className='text-5xl flex italic font-extralight flex-nowrap items-center gap-4 justify-center'>
							TabHub
						</span>
					</div>
					<SidebarGroupLabel>Application</SidebarGroupLabel>
					<SidebarGroupContent className='h-full flex flex-col justify-between'>
						<div>
							<SidebarMenu>
								{items.map(item => (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton asChild>
											<a
												href={item.url}
												className='flex items-center space-x-2'
											>
												<item.icon />
												<span>{item.title}</span>
											</a>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
							<SidebarGroupLabel className='mt-4'>Generation</SidebarGroupLabel>
							<SidebarMenu>
								{generationItems.map(item => (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton asChild>
											<a
												href={item.url}
												className='flex items-center space-x-2'
											>
												<item.icon />
												<span>{item.title}</span>
											</a>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
							<SidebarGroupLabel className='mt-4'>Projects</SidebarGroupLabel>
							<SidebarMenu>
								{projectsItems.map(item => (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton asChild>
											<a
												href={item.url}
												className='flex items-center space-x-2'
											>
												<item.icon />
												<span>{item.title}</span>
											</a>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</div>
						<UserLabel
							avatar='https://avatars.githubusercontent.com/u/82772036?v=4'
							username='malinatrash'
							email='malinatrashh@gmail.com'
						/>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	)
}
