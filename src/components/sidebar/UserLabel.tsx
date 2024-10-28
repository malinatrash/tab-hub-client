import { ChevronsUpDown } from 'lucide-react'
import { FC } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Popover, PopoverTrigger } from '../ui/popover'
import UserLabelPopover from './UserLabelPopover'

interface UserLabelProps {
	avatar: string
	username: string
	email: string
}

const UserLabel: FC<UserLabelProps> = ({ avatar, username, email }) => {
	return (
		<Popover>
			<PopoverTrigger>
				<div className='transition-all flex gap-2 active:opacity-50 items-center justify-around'>
					<Avatar>
						<AvatarImage src={avatar} />
						<AvatarFallback>
							{username.split(' ').map(c => c[0].toUpperCase())}
						</AvatarFallback>
					</Avatar>
					<div className='flex flex-col text-start'>
						<span className='font-bold'>{username}</span>
						<span>{email}</span>
					</div>
					<ChevronsUpDown />
				</div>
			</PopoverTrigger>
			<UserLabelPopover avatar={avatar} username={username} email={email} />
		</Popover>
	)
}

export default UserLabel
