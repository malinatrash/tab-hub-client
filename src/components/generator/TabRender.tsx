import { Note } from '@/types/Note'
import { FC } from 'react'

interface TabRendererProps {
	midiData: Note[]
}

const getStringFret = (
	noteName: string
): { string: number; fret: number } | null => {
	// Пример карты для соответствия нот ладам и струнам (может быть расширена)
	const fretMap: { [key: string]: { string: number; fret: number } } = {
		E2: { string: 6, fret: 0 },
		F2: { string: 6, fret: 1 },
		'F#2': { string: 6, fret: 2 },
		G2: { string: 6, fret: 3 },
		'G#2': { string: 6, fret: 4 },
		A2: { string: 6, fret: 5 },
		'A#2': { string: 6, fret: 6 },
		B2: { string: 6, fret: 7 },
		C3: { string: 6, fret: 8 },
		'C#3': { string: 6, fret: 9 },
		D3: { string: 6, fret: 10 },
		'D#3': { string: 6, fret: 11 },
		E3: { string: 6, fret: 12 },

		A2: { string: 5, fret: 0 },
		'A#2': { string: 5, fret: 1 },
		B2: { string: 5, fret: 2 },
		C3: { string: 5, fret: 3 },
		'C#3': { string: 5, fret: 4 },
		D3: { string: 5, fret: 5 },
		'D#3': { string: 5, fret: 6 },
		E3: { string: 5, fret: 7 },
		F3: { string: 5, fret: 8 },
		'F#3': { string: 5, fret: 9 },
		G3: { string: 5, fret: 10 },
		'G#3': { string: 5, fret: 11 },
		A3: { string: 5, fret: 12 },

		D3: { string: 4, fret: 0 },
		'D#3': { string: 4, fret: 1 },
		E3: { string: 4, fret: 2 },
		F3: { string: 4, fret: 3 },
		'F#3': { string: 4, fret: 4 },
		G3: { string: 4, fret: 5 },
		'G#3': { string: 4, fret: 6 },
		A3: { string: 4, fret: 7 },
		'A#3': { string: 4, fret: 8 },
		B3: { string: 4, fret: 9 },
		C4: { string: 4, fret: 10 },
		'C#4': { string: 4, fret: 11 },
		D4: { string: 4, fret: 12 },

		G3: { string: 3, fret: 0 },
		'G#3': { string: 3, fret: 1 },
		A3: { string: 3, fret: 2 },
		'A#3': { string: 3, fret: 3 },
		B3: { string: 3, fret: 4 },
		C4: { string: 3, fret: 5 },
		'C#4': { string: 3, fret: 6 },
		D4: { string: 3, fret: 7 },
		'D#4': { string: 3, fret: 8 },
		E4: { string: 3, fret: 9 },
		F4: { string: 3, fret: 10 },
		'F#4': { string: 3, fret: 11 },
		G4: { string: 3, fret: 12 },

		B3: { string: 2, fret: 0 },
		C4: { string: 2, fret: 1 },
		'C#4': { string: 2, fret: 2 },
		D4: { string: 2, fret: 3 },
		'D#4': { string: 2, fret: 4 },
		E4: { string: 2, fret: 5 },
		F4: { string: 2, fret: 6 },
		'F#4': { string: 2, fret: 7 },
		G4: { string: 2, fret: 8 },
		'G#4': { string: 2, fret: 9 },
		A4: { string: 2, fret: 10 },
		'A#4': { string: 2, fret: 11 },
		B4: { string: 2, fret: 12 },

		E4: { string: 1, fret: 0 },
		F4: { string: 1, fret: 1 },
		'F#4': { string: 1, fret: 2 },
		G4: { string: 1, fret: 3 },
		'G#4': { string: 1, fret: 4 },
		A4: { string: 1, fret: 5 },
		'A#4': { string: 1, fret: 6 },
		B4: { string: 1, fret: 7 },
		C5: { string: 1, fret: 8 },
		'C#5': { string: 1, fret: 9 },
		D5: { string: 1, fret: 10 },
		'D#5': { string: 1, fret: 11 },
		E5: { string: 1, fret: 12 },
	}

	return fretMap[noteName] || null
}
const TabRenderer: FC<TabRendererProps> = ({ midiData }) => {
	const renderTablature = () => {
		// Массив для названий струн гитары
		const stringNames = ['E', 'B', 'G', 'D', 'A', 'E']
		// Создаем строки для каждой струны гитары
		const strings = Array(6)
			.fill('')
			.map(() => '-'.repeat(90)) // длина строки настраивается

		midiData.forEach(note => {
			const stringFret = getStringFret(note.name)
			if (stringFret) {
				const { string, fret } = stringFret
				const position = Math.min(
					strings[string - 1].length - 1,
					Math.floor(note.time * 10)
				) // позиция по времени

				// Обновляем строку с учетом позиции
				strings[string - 1] =
					strings[string - 1].substring(0, position) +
					fret +
					strings[string - 1].substring(position + 1)
			}
		})

		return strings.map((line, index) => (
			<div key={index}>
				{stringNames[5 - index]} | {line}
			</div>
		))
	}

	return <div className='overflow-auto whitespace-pre'>{renderTablature()}</div>
}

export default TabRenderer
