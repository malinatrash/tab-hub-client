export const generateMidi = async (file: File) => {
	const formData = new FormData()
	formData.append('file', file)

	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/generate/midi`,
			{
				method: 'POST',
				body: formData,
			}
		)

		if (!response.ok) {
			throw new Error('Не удалось сгенерировать MIDI')
		}
		return response
	} catch (error) {
		console.error('Ошибка:', error)
	}
}
