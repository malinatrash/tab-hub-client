import { showToast } from '@/utils/showToast'
import React, { useRef, useState } from 'react'
import { Button } from '../ui/button'

interface AudioRecorderProps {
	onFileSelected: (file: File) => void
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({ onFileSelected }) => {
	const [recording, setRecording] = useState(false)
	const [audioURL, setAudioURL] = useState<string | null>(null)
	const mediaRecorderRef = useRef<MediaRecorder | null>(null)
	const audioChunksRef = useRef<Blob[]>([])

	const startRecording = async () => {
		if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
			showToast('Ошибка', 'Браузер не поддерживает запись аудио', 'destructive')
			alert('Ваш браузер не поддерживает запись аудио.')
			return
		}

		try {
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
			const mediaRecorder = new MediaRecorder(stream)
			mediaRecorderRef.current = mediaRecorder
			audioChunksRef.current = []

			mediaRecorder.ondataavailable = event => {
				audioChunksRef.current.push(event.data)
			}

			mediaRecorder.onstop = () => {
				const audioBlob = new Blob(audioChunksRef.current, {
					type: 'audio/wav',
				})
				const audioFile = new File([audioBlob], 'recording.wav', {
					type: 'audio/wav',
				})
				setAudioURL(URL.createObjectURL(audioBlob))
				onFileSelected(audioFile)
			}

			mediaRecorder.start()
			setRecording(true)
		} catch (error) {
			console.error('Ошибка при доступе к микрофону:', error)
		}
	}

	const stopRecording = () => {
		mediaRecorderRef.current?.stop()
		setRecording(false)
	}

	return (
		<Button onClick={recording ? stopRecording : startRecording}>
			{recording ? 'Stop recording' : 'Start recording'}
		</Button>
	)
}

export default AudioRecorder
