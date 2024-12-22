'use client'

import { Project } from '@/types/Project'
import { Lock, Unlock } from 'lucide-react'
import Link from 'next/link'

interface ProjectCardProps {
	project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
	return (
		<div className='bg-card p-6 mx-2 rounded-xl shadow-md hover:shadow-lg transition-shadow w-80'>
			<Link href={`/project/${project.id}`}>
				<div className='flex justify-between items-center mb-4'>
					<h2 className='text-xl font-semibold'>{project.name}</h2>
					{project.private ? (
						<Lock className='w-5 h-5 text-red-500' />
					) : (
						<Unlock className='w-5 h-5 text-green-500' />
					)}
				</div>
				<div className='flex justify-between flex-col gap-2'>
					<span className='text-sm text-muted-foreground'>
						Created: {new Date(project.created_at).toLocaleDateString()}
					</span>
					<span className='text-sm text-muted-foreground'>
						Updated: {new Date(project.updated_at).toLocaleDateString()}
					</span>
				</div>
			</Link>
		</div>
	)
}
