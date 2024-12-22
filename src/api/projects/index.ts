import { apiClient } from '@/api/client'
import { Project, ProjectCreateRequest } from '@/types/Project'
import { AxiosResponse } from 'axios'

export const projectsApi = {
	async getProjects(): Promise<Project[]> {
		try {
			const response: AxiosResponse<Project[]> = await apiClient.get(
				'service',
				'/projects'
			)

			return response.data
		} catch (error) {
			console.error('Failed to fetch projects:', error)
			throw error
		}
	},

	async getProject(id: number): Promise<Project> {
		try {
			const response: AxiosResponse<Project> = await apiClient.get(
				'service',
				`/projects/${id}`
			)

			return response.data
		} catch (error) {
			console.error(`Failed to fetch project ${id}:`, error)
			throw error
		}
	},

	async createProject(project: ProjectCreateRequest): Promise<Project> {
		try {
			const response: AxiosResponse<Project> = await apiClient.post(
				'service',
				'/projects',
				project
			)

			return response.data
		} catch (error) {
			console.error('Failed to create project:', error)
			throw error
		}
	},

	async updateProjectState(id: number, state: string): Promise<Project> {
		try {
			const response: AxiosResponse<Project> = await apiClient.post(
				'service',
				`/projects/${id}/state`,
				{ state }
			)

			return response.data
		} catch (error) {
			console.error(`Failed to update project ${id} state:`, error)
			throw error
		}
	},
}
