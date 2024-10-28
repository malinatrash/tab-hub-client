import useMidiPlayback from '@/hooks/useMidiPlayback'
import useThresholds from '@/hooks/useThresholds'
import { Note } from '@/types/Note'
import React from 'react'
import PlayButton from './PlayButton'
import TabRenderer from './TabRender'
import Thresholds from './Thrsholds'

interface MidiViewerProps {
	midiData: Note[]
}

const MidiViewer: React.FC<MidiViewerProps> = ({ midiData }) => {
	const {
		velocityThreshold,
		durationThreshold,
		updateVelocityThreshold,
		updateDurationThreshold,
	} = useThresholds()

	const filteredNotes = midiData.filter(
		note =>
			note.velocity >= velocityThreshold && note.duration >= durationThreshold
	)

	const { isPlaying, togglePlay } = useMidiPlayback(filteredNotes)

	return (
		<div className='flex flex-col items-center gap-8'>
			<PlayButton isPlaying={isPlaying} onClick={togglePlay} />
			<Thresholds
				velocityThreshold={velocityThreshold}
				durationThreshold={durationThreshold}
				updateVelocityThreshold={updateVelocityThreshold}
				updateDurationThreshold={updateDurationThreshold}
			/>
			<TabRenderer midiData={filteredNotes} />
		</div>
	)
}

export default MidiViewer
