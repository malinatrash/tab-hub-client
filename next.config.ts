import { AlphaTabWebPackPlugin } from '@coderline/alphatab/webpack'

/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack(config) {
		config.plugins.push(
			new AlphaTabWebPackPlugin({
				assetOutputDir: 'public/alphatab',
			})
		)
		return config
	},
	async rewrites() {
		return [
			{
			source: '/api/:path*',
			destination: 'http://localhost:8000/:path*'
		  }
		]
	}
}

export default nextConfig
