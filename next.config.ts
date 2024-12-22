/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		NEXT_PUBLIC_GENERATOR_URL: 'http://localhost:8000',
		NEXT_PUBLIC_SERVICE_URL: 'http://localhost:8001',
	},
	// Ensure environment variables are correctly loaded
	publicRuntimeConfig: {
		GENERATOR_URL:
			process.env.NEXT_PUBLIC_GENERATOR_URL || 'http://localhost:8000',
		SERVICE_URL: process.env.NEXT_PUBLIC_SERVICE_URL || 'http://localhost:8001',
	},
}

export default nextConfig
