import { AppSidebar } from '@/components/sidebar/AppSidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Toaster } from '@/components/ui/toaster'
import type { Metadata } from 'next'
import { Raleway } from 'next/font/google'
import './globals.css'

const font = Raleway({ weight: '400' })

export const metadata: Metadata = { title: 'ez tabz' }

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={`${font.className} antialiased`}>
				<SidebarProvider>
					<AppSidebar />
					<main className='w-full'>
						<SidebarTrigger />
						{children}
					</main>
				</SidebarProvider>
				<Toaster />
			</body>
		</html>
	)
}
