'use client'

import { ProjectCard } from '@/components/project/ProjectCard'
import { mockProjects } from '@/data/mockProjects'
import { Plus } from 'lucide-react'
import Link from 'next/link'

export function Projects() {
	return (
		<div className='container mx-auto px-4 py-8'>
			<div className='flex justify-between items-center mb-6'>
				<h1 className='text-3xl font-bold'>My Projects</h1>
				<Link href='/project/create'>
					<button className='flex items-center space-x-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90'>
						<Plus className='w-5 h-5' />
						<span>Create Project</span>
					</button>
				</Link>
			</div>

			{mockProjects.length > 0 ? (
				<div className='flex gap-16'>
					{mockProjects.map(project => (
						<ProjectCard key={project.id} project={project} />
					))}
				</div>
			) : (
				<div className='text-center text-muted-foreground py-12'>
					<p>No projects yet. Create your first project!</p>
				</div>
			)}
		</div>
	)
}
