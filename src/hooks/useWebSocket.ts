import { useState, useEffect, useCallback } from 'react'
import { toast } from '@/hooks/use-toast'

interface WebSocketHook {
  socket: WebSocket | null
  isConnected: boolean
  sendMessage: (message: string) => void
  lastMessage: string | null
}

export const useWebSocket = (url: string, onMessage?: (message: string) => void) => {
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [lastMessage, setLastMessage] = useState<string | null>(null)

  const sendMessage = useCallback((message: string) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(message)
    }
  }, [socket])

  useEffect(() => {
    const ws = new WebSocket(url)

    ws.onopen = () => {
      setIsConnected(true)
      toast({ 
        title: 'WebSocket соединение установлено', 
        description: 'Состояние проекта обновлено',  
        variant: 'default' 
      })
    }

    ws.onmessage = (event) => {
      const message = event.data
      setLastMessage(message)
      
      if (onMessage) {
        onMessage(message)
      }
    }

    ws.onerror = (error) => {
      toast({ 
        title: 'WebSocket ошибка', 
        description: 'Состояние проекта не обновлено',  
        variant: 'destructive' 
      })
      console.error('WebSocket ошибка:', error)
    }

    ws.onclose = () => {
      setIsConnected(false)
    }

    setSocket(ws)

    return () => {
      ws.close()
    }
  }, [url, onMessage])

  return { socket, isConnected, sendMessage, lastMessage }
}
