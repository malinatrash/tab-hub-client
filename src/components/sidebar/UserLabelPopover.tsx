import { showToast } from '@/app/utils/showToast'
import { PersonIcon } from '@radix-ui/react-icons'
import { LogOut, Sparkles, Wallet } from 'lucide-react'
import { FC } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { PopoverContent } from '../ui/popover'
import { Separator } from '../ui/separator'
import { SidebarMenuButton } from '../ui/sidebar'

interface UserLabelPopoverProps {
	avatar: string
	username: string
	email: string
}

const UserLabelPopover: FC<UserLabelPopoverProps> = ({
	avatar,
	username,
	email,
}) => {
	return (
		<PopoverContent>
			<div className='flex gap-2'>
				<Avatar>
					<AvatarImage src={avatar} />
					<AvatarFallback>
						{username.split(' ').map(c => c[0].toUpperCase())}
					</AvatarFallback>
				</Avatar>
				<div className='flex flex-col text-start text-sm'>
					<span className='font-bold'>{username}</span>
					<span>{email}</span>
				</div>
			</div>
			<div className='flex gap-2 flex-col'>
				<SidebarMenuButton
					className='py-4 transition-all hover:opacity-70 mt-4'
					asChild
				>
					<a href='/premium' className='flex items-center space-x-2'>
						<Sparkles className='w-4 h-4' />
						<span>Upgrade to Premium</span>
					</a>
				</SidebarMenuButton>
				<Separator />
				<SidebarMenuButton
					className='py-4 transition-all hover:opacity-70'
					asChild
				>
					<a href='/account' className='flex items-center space-x-2'>
						<PersonIcon className='w-4 h-4' />
						<span>Account</span>
					</a>
				</SidebarMenuButton>
				<SidebarMenuButton
					className='py-4 transition-all hover:opacity-70'
					asChild
				>
					<a href='/account' className='flex items-center space-x-2'>
						<Wallet className='w-4 h-4' />
						<span>Billing</span>
					</a>
				</SidebarMenuButton>
				<Separator />
				<SidebarMenuButton
					className='py-4 transition-all hover:opacity-70'
					asChild
					onClick={() => {
						localStorage.removeItem('token')
						showToast('', 'Feature coming soon', 'destructive')
					}}
				>
					<div className='flex items-center space-x-2 cursor-pointer'>
						<LogOut className='w-4 h-4' />
						<span>Log out</span>
					</div>
				</SidebarMenuButton>
			</div>
		</PopoverContent>
	)
}

export default UserLabelPopover
