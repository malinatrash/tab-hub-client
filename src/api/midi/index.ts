import { apiClient } from '@/api/client'
import { AxiosResponse } from 'axios'

export const midiApi = {
	async generateMidi(file: File): Promise<Blob> {
		const formData = new FormData()
		formData.append('file', file)

		try {
			const response: AxiosResponse<Blob> = await apiClient.post(
				'generator',
				'/generate/midi',
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
					responseType: 'blob',
				}
			)
			return response.data
		} catch (error) {
			console.error('MIDI Generation Error:', error)
			throw error
		}
	},
}
