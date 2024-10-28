import { AlphaTabApi, Settings } from '@coderline/alphatab'
import { useEffect, useRef, useState } from 'react'

export const useAlphaTabApi = (musicXML: string) => {
	const elementRef = useRef<HTMLDivElement>(null)
	const [api, setApi] = useState<AlphaTabApi>()

	const playPause = () => {
		api?.playPause()
	}

	useEffect(() => {
		if (!elementRef.current) return

		const apiInstance = new AlphaTabApi(elementRef.current, {
			core: {
				file: musicXML,
				fontDirectory: '/alphatab/font/',
			},
			player: {
				enablePlayer: true,
				enableCursor: true,
				enableUserInteraction: true,
				soundFont: '/alphatab/soundfont/sonivox.sf2',
			},
		} as Settings)

		setApi(apiInstance)

		return () => {
			apiInstance.destroy()
		}
	}, [musicXML])

	return { elementRef, playPause }
}
