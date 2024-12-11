import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { toast } from '@/hooks/use-toast'

export interface ProjectState {
  id: number
  name: string
  ownerID: number
  state: string
  private: boolean
}

export const useProjectState = (projectId: string) => {
  const [projectState, setProjectState] = useState<ProjectState | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProjectState = useCallback(async () => {
    if (!projectId) return

    try {
      setIsLoading(true)
      const response = await axios.get(`/api/projects/${projectId}`)
      setProjectState(response.data)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch project state'
      setError(errorMessage)
      toast({ 
        title: 'Ошибка получения состояния проекта', 
        description: errorMessage, 
        variant: 'destructive' 
      })
    } finally {
      setIsLoading(false)
    }
  }, [projectId])

  const updateProjectState = useCallback((newState: Partial<ProjectState>) => {
    setProjectState(prev => prev ? { ...prev, ...newState } : null)
  }, [])

  const updateProjectStateField = useCallback((field: keyof ProjectState, value: any) => {
    setProjectState(prev => prev ? { ...prev, [field]: value } : null)
  }, [])

  useEffect(() => {
    fetchProjectState()
  }, [fetchProjectState])

  return {
    projectState,
    setProjectState,
    updateProjectState,
    updateProjectStateField,
    isLoading,
    error,
    refetch: fetchProjectState
  }
}
