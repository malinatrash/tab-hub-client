import { useState, useEffect, useCallback } from 'react'

export const useWebSocket = (url: string) => {
	const [socket, setSocket] = useState<WebSocket | null>(null)
	const [isConnected, setIsConnected] = useState(false)
	const [lastMessage, setLastMessage] = useState<string | null>(null)

	useEffect(() => {
		const ws = new WebSocket(url)

		ws.onopen = () => {
			console.log('WebSocket Connected')
			setIsConnected(true)
		}

		ws.onmessage = (event) => {
			const data = JSON.parse(event.data)
			setLastMessage(data.state)
		}

		ws.onclose = () => {
			console.log('WebSocket Disconnected')
			setIsConnected(false)
		}

		setSocket(ws)

		return () => {
			ws.close()
		}
	}, [url])

	const sendMessage = useCallback((message: string) => {
		if (socket && socket.readyState === WebSocket.OPEN) {
			socket.send(message)
		}
	}, [socket])

	return { 
		socket, 
		isConnected, 
		lastMessage, 
		sendMessage 
	}
}
