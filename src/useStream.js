import { useState, useEffect } from 'react'

import _ from 'lodash'

let ids = {
  photos: 0,
  comments: 0,
  rsvp: 0,
}
const DEFAULT_MAX_MESSAGES = 1000

const useStream = (path, max = DEFAULT_MAX_MESSAGES) => {
  const [latestMessage, saveMessage] = useState()
  const [messageList, setMessageList] = useState([])

  useEffect(() => {
    setMessageList(oldMessages => {
      const newMessages = _.compact(oldMessages.concat(latestMessage))
      return newMessages.length > max
        ? newMessages.slice(1)
        : newMessages
    })
  }, [latestMessage])

  const initSocket = () => {
    window.__sockets__[path].onopen = () => console.log(`${path} socket open`)
    window.__sockets__[path].onclose = (event, code) =>
      console.log(`${path} socket closed: ${JSON.stringify(event)}`)
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