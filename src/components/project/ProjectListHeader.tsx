'use client'

import Link from 'next/link'
import { Plus } from 'lucide-react'

export function ProjectListHeader() {
	return (
		<div className='flex justify-between items-center mb-6'>
			<h1 className='text-3xl font-bold'>My Projects</h1>
			<Link href='/project/create'>
				<button className='flex items-center space-x-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90'>
					<Plus className='w-5 h-5' />
					<span>Create Project</span>
				</button>
			</Link>
		</div>
	)
}
