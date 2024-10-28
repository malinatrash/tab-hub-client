import { useState } from 'react'

const useThresholds = () => {
	const [velocityThreshold, setVelocityThreshold] = useState(0)
	const [durationThreshold, setDurationThreshold] = useState(0)

	const updateVelocityThreshold = (value: number) => {
		setVelocityThreshold(value)
	}

	const updateDurationThreshold = (value: number) => {
		setDurationThreshold(value)
	}

	return {
		velocityThreshold,
		durationThreshold,
		updateVelocityThreshold,
		updateDurationThreshold,
	}
}

export default useThresholds
