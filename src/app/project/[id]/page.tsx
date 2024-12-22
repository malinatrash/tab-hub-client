'use client'

import { projectsApi } from '@/api/projects'
import { Textarea } from '@/components/ui/textarea'
import { useWebSocket } from '@/hooks/useWebSocket'
import { Project } from '@/types/Project'
import { notFound, useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const ProjectPage = () => {
	const params = useParams<{ id: string }>()
	const [project, setProject] = useState<Project | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	const wsUrl = `ws://${process.env.NEXT_PUBLIC_SERVICE_URL}/projects/${params.id}`

	const { lastMessage, sendMessage, isConnected } = useWebSocket(wsUrl)

	useEffect(() => {
		if (!params) {
			notFound()
		}
		const projectId = parseInt(params.id, 10)
		if (isNaN(projectId)) {
			notFound()
		}

		const fetchProject = async () => {
			try {
				const fetchedProject = await projectsApi.getProject(projectId)
				setProject(fetchedProject)
			} catch (err) {
				console.error('Failed to fetch project', err)
				setError('Failed to load project')
			} finally {
				setLoading(false)
			}
		}

		fetchProject()
	}, [params.id])

	// Update project state when WebSocket message is received
	useEffect(() => {
		if (lastMessage && project) {
			setProject(prev => (prev ? { ...prev, state: lastMessage } : null))
		}
	}, [lastMessage])

	const handleStateChange = (newState: string) => {
		if (!project) return

		// Send state update via WebSocket
		sendMessage(newState)
	}

	if (loading) return <div>Loading...</div>
	if (error) return <div>Error: {error}</div>
	if (!project) return <div>No project found</div>

	return (
		<div className='container mx-auto p-4'>
			<div className='bg-white shadow-md rounded-lg p-6'>
				<h2 className='text-2xl font-bold mb-4'>
					Состояние проекта: {project.name}
				</h2>
				<div className='space-y-4'>
					<div>
						<strong>ID проекта:</strong> {project.id}
					</div>

					<div>
						<strong>Состояние проекта:</strong>
						<Textarea
							value={project.state}
							onChange={e => handleStateChange(e.target.value)}
							placeholder='Введите состояние проекта'
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProjectPage
