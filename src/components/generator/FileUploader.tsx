import { Input } from '../ui/input'

interface FileUploaderProps {
	onFileSelected: (file: File) => void
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileSelected }) => {
	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = event.target.files?.[0]
		if (selectedFile) {
			onFileSelected(selectedFile)
		}
	}

	return (
		<Input
			className='w-full'
			type='file'
			onChange={handleFileChange}
			accept='.wav,.mp3,.m4a'
		/>
	)
}

export default FileUploader
