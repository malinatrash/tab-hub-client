import React from 'react'
import { Input } from '../ui/input'

interface ThresholdsProps {
	velocityThreshold: number
	durationThreshold: number
	updateVelocityThreshold: (value: number) => void
	updateDurationThreshold: (value: number) => void
}

const Thresholds: React.FC<ThresholdsProps> = ({
	velocityThreshold,
	durationThreshold,
	updateVelocityThreshold,
	updateDurationThreshold,
}) => {
	return (
		<div className='flex flex-col gap-4'>
			<div>
				<label className='text-sm flex items-center gap-2'>
					Velocity Threshold:
					<Input
						type='range'
						min='0'
						max='1'
						step='0.01'
						value={velocityThreshold}
						onChange={e => updateVelocityThreshold(Number(e.target.value))}
					/>
					<span className='w-3'>{velocityThreshold}</span>
				</label>
			</div>
			<div>
				<label className='text-sm flex items-center gap-2'>
					Duration Threshold:
					<Input
						color='secondary'
						type='range'
						min='0'
						max='1'
						step='0.0001'
						value={durationThreshold}
						onChange={e => updateDurationThreshold(Number(e.target.value))}
					/>
					<span className='w-3'> {durationThreshold}</span>
				</label>
			</div>
		</div>
	)
}

export default Thresholds
