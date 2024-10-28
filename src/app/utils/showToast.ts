import { toast } from '@/hooks/use-toast'

export const showToast = (
	title: string,
	description: string,
	variant: 'destructive' | 'default'
) => toast({ title, description, variant })
