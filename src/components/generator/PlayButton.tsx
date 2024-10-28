import { StopIcon } from '@radix-ui/react-icons'
import { PlayIcon } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'

interface PlayButtonProps {
	isPlaying: boolean
	onClick: () => void
}

const PlayButton: React.FC<PlayButtonProps> = ({ isPlaying, onClick }) => {
	return (
		<Button variant={'outline'} onClick={onClick}>
			{isPlaying ? <StopIcon /> : <PlayIcon />}
		</Button>
	)
}

export default PlayButton
