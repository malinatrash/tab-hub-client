import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface User {
	id: string
	username: string
	email: string
	avatar?: string
}

interface UserState {
	user: User | null
	isAuthenticated: boolean
	login: (userData: User) => void
	logout: () => void
	updateUser: (userData: Partial<User>) => void
}

export const useUserStore = create<UserState>()(
	persist(
		(set) => ({
			user: null,
			isAuthenticated: false,
			login: (userData) => set({ 
				user: userData, 
				isAuthenticated: true 
			}),
			logout: () => set({ 
				user: null, 
				isAuthenticated: false 
			}),
			updateUser: (userData) => set((state) => ({
				user: state.user ? { ...state.user, ...userData } : null
			}))
		}),
		{ 
			name: 'user-storage',
			storage: createJSONStorage(() => localStorage)
		}
	)
)
