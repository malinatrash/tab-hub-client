import { showToast } from '@/utils/showToast'
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

class ApiClient {
	private generatorAxios: AxiosInstance
	private serviceAxios: AxiosInstance

	constructor() {
		const generatorBaseURL =
			process.env.NEXT_PUBLIC_GENERATOR_URL || 'http://localhost:8000'

		const serviceBaseURL =
			process.env.NEXT_PUBLIC_SERVICE_URL || 'http://localhost:8001'

		console.log('Resolved Generator Base URL:', generatorBaseURL)
		console.log('Resolved Service Base URL:', serviceBaseURL)

		this.generatorAxios = axios.create({
			baseURL: generatorBaseURL,
			headers: {
				'Content-Type': 'application/json',
			},
		})

		this.serviceAxios = axios.create({
			baseURL: serviceBaseURL,
			headers: {
				'Content-Type': 'application/json',
			},
		})

		// Interceptors for error handling and logging
		this.setupInterceptors(this.generatorAxios, 'Generator')
		this.setupInterceptors(this.serviceAxios, 'Service')
	}

	private setupInterceptors(axiosInstance: AxiosInstance, serviceName: string) {
		// Request interceptor for logging
		axiosInstance.interceptors.request.use(
			config => {
				console.log(`${serviceName} Request:`, {
					url: config.url,
					method: config.method,
					baseURL: config.baseURL,
					headers: config.headers,
				})
				return config
			},
			error => Promise.reject(error)
		)

		// Response interceptor
		axiosInstance.interceptors.response.use(
			response => {
				console.log(`${serviceName} Response:`, {
					url: response.config.url,
					status: response.status,
					data: response.data,
				})
				return response
			},
			error => {
				const errorMessage = error.response?.data?.message || error.message

				showToast(
					'Ошибка',
					`Не удалось выполнить запрос: ${errorMessage}`,
					'destructive'
				)

				console.error(`${serviceName} API Error:`, {
					url: error.config?.url,
					method: error.config?.method,
					status: error.response?.status,
					error: errorMessage,
				})

				return Promise.reject(error)
			}
		)
	}

	async put(
		service: 'generator' | 'service',
		endpoint: string,
		data: any,
		config: AxiosRequestConfig = {}
	) {
		const axiosInstance =
			service === 'generator' ? this.generatorAxios : this.serviceAxios

		return await axiosInstance.put(endpoint, data, config)
	}

	async delete(
		service: 'generator' | 'service',
		endpoint: string,
		config: AxiosRequestConfig = {}
	) {
		const axiosInstance =
			service === 'generator' ? this.generatorAxios : this.serviceAxios

		return await axiosInstance.delete(endpoint, config)
	}

	async get(
		service: 'generator' | 'service',
		url: string,
		config?: AxiosRequestConfig
	) {
		const axiosInstance =
			service === 'generator' ? this.generatorAxios : this.serviceAxios
		return await axiosInstance.get(url, config)
	}

	async post(
		service: 'generator' | 'service',
		url: string,
		data?: any,
		config?: AxiosRequestConfig
	) {
		const axiosInstance =
			service === 'generator' ? this.generatorAxios : this.serviceAxios
		return await axiosInstance.post(url, data, config)
	}
}

export const apiClient = new ApiClient()
