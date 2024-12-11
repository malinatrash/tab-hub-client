'use client'
import {
	FileMusic,
	Guitar,
	Home,
	Inbox,
	Music,
	Search,
	Settings,
} from 'lucide-react'

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
const items = [
	{ title: 'Home', url: '/', icon: Home },
	{ title: 'Search', url: '/#search', icon: Search },
	{ title: 'Inbox', url: '/#inbox', icon: Inbox },
	{ title: 'Settings', url: '/#settings', icon: Settings },
]

// Generation items.
const generationItems = [
	{ title: 'Audio -> MIDI', url: '/#audio-to-midi', icon: Music },
	{ title: 'Audio -> Tabs', url: '/#audio-to-tabs', icon: FileMusic },
]

export function AppSidebar() {
	return (
		<Sidebar>
			<SidebarContent className='h-full'>
				<SidebarGroup className='h-full'>
					<div className='my-4'>
						<span className='text-5xl flex flex-nowrap items-center gap-4 justify-center'>
							<img className='h-12' src="https://purepng.com/public/uploads/large/purepng.com-electric-guitarelectric-guitarsteelstringselectricalblackredyellow-1421526494112bsvat.png" alt="" /> TabHub
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
