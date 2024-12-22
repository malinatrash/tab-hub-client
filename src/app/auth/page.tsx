'use client'

import { Button } from '@/components/ui/button'
import { useUserStore } from '@/store/userStore'

export default function LoginExample() {
	const { user, login, logout, isAuthenticated } = useUserStore()

	const handleLogin = () => {
		login({
			id: '123',
			username: 'malinatrash',
			email: 'malinatrashh@gmail.com',
			avatar: 'https://avatars.githubusercontent.com/u/82772036?v=4',
		})
	}

	return (
		<div>
			{isAuthenticated ? (
				<div>
					<p>Welcome, {user?.username}!</p>
					<Button onClick={logout}>Logout</Button>
				</div>
			) : (
				<Button onClick={handleLogin}>Login</Button>
			)}
		</div>
	)
}
