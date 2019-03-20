import { useState, useEffect } from 'react'

const useStream = (path) => {
  const [isPaused, setIsPaused] = useState(false)
  const [messageList, setMessageList] = useState([])
  const [latestMessage, saveMessage] = useState('')
  const [maxMessages, setMaxMessages] = useState(3)

  useEffect(() => {
    if (isPaused) {
      console.log(latestMessage)
      return
    }
    if (messageList.length < maxMessages) {
      setMessageList(oldMessages => oldMessages.concat(latestMessage))
    } else {
      setMessageList(oldMessages => [...oldMessages.slice(1), latestMessage])
    }
  }, [latestMessage, isPaused, maxMessages])

  const initSocket = () => {
    window.__sockets__[path].onopen = () => console.log('socket open')
    window.__sockets__[path].onclose = () => console.log('socket closed')
    window.__sockets__[path].addEventListener('message', message =>
      saveMessage(JSON.parse(message.data))
    )
  }

  useEffect(() => {
    initSocket()
  }, [])

  return { isPaused, setIsPaused, messageList, setMaxMessages }
}

export default useStream