'use client'

import { useUserStore } from '@/store/userStore'
import { FC } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Popover, PopoverTrigger } from '../ui/popover'
import UserLabelPopover from './UserLabelPopover'
import { ChevronsUpDown } from 'lucide-react'

interface UserLabelProps {
	avatar: string
	username: string
	email: string
}

const UserLabel: FC<UserLabelProps> = () => {
	const { user } = useUserStore()

	if (!user) return null

	return (
		<Popover>
			<PopoverTrigger>
				<div className='transition-all flex gap-2 active:opacity-50 items-center justify-around'>
					<Avatar>
						<AvatarImage src={user.avatar || ''} />
						<AvatarFallback>
							{user.username.split(' ').map(c => c[0].toUpperCase())}
						</AvatarFallback>
					</Avatar>
					<div className='flex flex-col text-start'>
						<span className='font-bold'>{user.username}</span>
						<span>{user.email}</span>
					</div>
					<ChevronsUpDown />
				</div>
			</PopoverTrigger>
			<UserLabelPopover
				avatar={user.avatar || ''}
				username={user.username}
				email={user.email}
			/>
		</Popover>
	)
}

export default UserLabel
