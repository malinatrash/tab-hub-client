import { LucideLoader } from 'lucide-react'
import { FC } from 'react'

interface LoaderProps {
	shown: boolean
}

const Loader: FC<LoaderProps> = ({ shown }) => {
	return <>{shown && <LucideLoader className='animate-spin' />}</>
}

export default Loader
