'use client'
import { generateMidi } from '@/api/generate/midi'
import { showToast } from '@/app/utils/showToast'
import { Midi } from '@tonejs/midi'
import { useState } from 'react'
import { Button } from '../ui/button'
import Loader from '../ui/loader'
import AudioRecorder from './AudioRecorder'
import FileUploader from './FileUploader'
import MidiViewer from './MidiViewer'

const AudioUploader: React.FC = () => {
	const [file, setFile] = useState<File | null>(null)
	const [midiData, setMidiData] = useState<any[]>([])
	const [loading, setLoading] = useState(false)

	const handleFileSelected = (selectedFile: File) => {
		setFile(selectedFile)
	}

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		if (!file) {
			showToast('Ошибка', 'Пожалуйста, выберите файл', 'destructive')
			return
		}

		setLoading(true)

		try {
			let res = await generateMidi(file)
			const midiBlob = await res?.blob()
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
		<div className='flex flex-col gap-8'>
			<form className='flex gap-2 flex-col' onSubmit={handleSubmit}>
				<FileUploader onFileSelected={handleFileSelected} />
				<AudioRecorder onFileSelected={handleFileSelected} />
				<Button type='submit'>
					Generate MIDI <Loader shown={loading} />
				</Button>
			</form>
			<div className='flex justify-center items-center flex-col'>
				<MidiViewer midiData={midiData} />
			</div>
		</div>
	)
}

export default AudioUploader
