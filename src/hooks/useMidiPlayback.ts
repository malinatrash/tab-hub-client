import { Note } from '@/types/Note'
import { useState } from 'react'
import * as Tone from 'tone'

const useMidiPlayback = (filteredNotes: Note[]) => {
	const [isPlaying, setIsPlaying] = useState(false)
	const [currentNote, setCurrentNote] = useState<Note | null>(null)

	const togglePlay = async () => {
		if (isPlaying) {
			setIsPlaying(false)
			Tone.Transport.stop()
			setCurrentNote(null)
		} else {
			setIsPlaying(true)
			await Tone.start()
			playNotes()
		}
	}

	const playNotes = () => {
		filteredNotes.forEach(note => {
			const { name, velocity, time, duration } = note
			const synth = new Tone.Synth().toDestination()
			synth.triggerAttackRelease(
				name,
				duration,
				Tone.Transport.now() + time,
				velocity
			)
			setCurrentNote(note)
		})
		Tone.Transport.start()
	}

	return { isPlaying, togglePlay, currentNote }
}

export default useMidiPlayback
