
const nextConfig = {
	async rewrites() {
		return [{
			source: '/api/:path*',
			destination: 'http://localhost:8001/:path*'
		}]
	}
}

export default nextConfig
