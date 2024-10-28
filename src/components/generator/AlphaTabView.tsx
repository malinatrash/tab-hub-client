'use client'

import { useAlphaTabApi } from '@/hooks/useAlphaTabApi'
import { FC } from 'react'

interface AlphaTabViewProps {
	musicXML: any
}
export const AlphaTabView: FC<AlphaTabViewProps> = ({ musicXML }) => {
	const { elementRef, playPause } = useAlphaTabApi(musicXML)

	return (
		<main>
			<button onClick={playPause}>Play/Pause</button>
			<div ref={elementRef} style={{ width: '100%', height: '500px' }}></div>
		</main>
	)
}
