import { useState, useEffect } from 'react'

import _ from 'lodash'

let ids = {
  photos: 0,
  comments: 0,

}
const MAX_MESSAGES = 1000

const useStream = path => {
  const [latestMessage, saveMessage] = useState()
  const [messageList, setMessageList] = useState([])

  useEffect(() => {
    setMessageList(oldMessages => {
      const newMessages = _.compact(oldMessages.concat(latestMessage))
      return newMessages.length > MAX_MESSAGES
        ? newMessages.slice(1)
        : newMessages
    })
  }, [latestMessage])

  const initSocket = () => {
    window.__sockets__[path].onopen = () => console.log('socket open')
    window.__sockets__[path].onclose = () => console.log('socket closed')
    window.__sockets__[path].addEventListener('message', message =>
      saveMessage({
        message: JSON.parse(message.data),
        id: ids[path]++,
      })
    )
  }

  useEffect(() => {
    initSocket()
  }, [])

  return { messageList }
}

export default useStream