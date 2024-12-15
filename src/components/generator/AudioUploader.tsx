'use client'
import { useState } from 'react'
import FileUploader from './FileUploader'
import AudioRecorder from './AudioRecorder'

interface AudioUploaderProps {
  onFileSelected: (file: File) => void
}

const AudioUploader: React.FC<AudioUploaderProps> = ({ onFileSelected }) => {
  const handleFileSelected = (selectedFile: File) => {
    onFileSelected(selectedFile)
  }

  return (
    <div className='flex flex-col gap-4'>
      <FileUploader onFileSelected={handleFileSelected} />
      <AudioRecorder onFileSelected={handleFileSelected} />
    </div>
  )
}

export default AudioUploader
