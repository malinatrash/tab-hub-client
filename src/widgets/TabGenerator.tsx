'use client'
import { midiApi } from '@/api/midi'
import AudioUploader from '@/components/generator/AudioUploader'
import MidiViewer from '@/components/generator/MidiViewer'
import { Button } from '@/components/ui/button'
import Loader from '@/components/ui/loader'
import { showToast } from '@/utils/showToast'
import { Midi } from '@tonejs/midi'
import { useState } from 'react'
import {Note} from "@/types/Note";

export default function TabGenerator() {
	const [file, setFile] = useState<File | null>(null)
	const [midiData, setMidiData] = useState<Note[]>([])
	const [loading, setLoading] = useState(false)

	const handleFileSelected = (selectedFile: File) => {
		setFile(selectedFile)
	}

	// Existing method for file-based MIDI generation
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		if (!file) {
			showToast('Ошибка', 'Пожалуйста, выберите файл', 'destructive')
			return
		}

		setLoading(true)

		try {
			const midiBlob = await midiApi.generateMidi(file)
			if (!midiBlob) {
				showToast('Ошибка', 'Не удалось получить MIDI Blob', 'destructive')
				throw new Error('Не удалось получить MIDI Blob')
			}
			const midiArrayBuffer = await midiBlob.arrayBuffer()
			const midi = new Midi(midiArrayBuffer)

			const notes = midi.tracks.flatMap(track =>
				track.notes.map(note => ({
					name: note.name,
					velocity: note.velocity,
					time: note.time,
					duration: note.duration,
				}))
			)

			setMidiData(notes)
			showToast('Успех', 'MIDI успешно сгенерирован', 'default')
		} catch (error) {
			console.error(error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='w-full min-h-screen bg-background text-foreground flex flex-col items-center justify-center'>
			<h1 className='text-4xl font-bold mb-6'>Tab Generator</h1>
			<form className='flex flex-col gap-4' onSubmit={handleSubmit}>
				<AudioUploader onFileSelected={handleFileSelected} />
				<Button type='submit'>
					Generate <Loader shown={loading} />
				</Button>
			</form>
			<div className='p-4 mt-6'>
				<MidiViewer midiData={midiData} />
			</div>
		</div>
	)
}
