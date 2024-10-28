import AudioUploader from '@/components/generator/AudioUplodaer'

export default function Home() {
	return (
		<div className='w-full min-h-screen bg-background text-foreground flex flex-col items-center justify-center'>
			<h1 className='text-4xl font-bold mb-6'>Ez Tabz</h1>
			<AudioUploader />
		</div>
	)
}
