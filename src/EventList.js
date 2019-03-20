import React, { useEffect } from 'react'

import useElementHeight from './useElementHeight'

import styles from './EventList.module.css'

const EventList = ({
  title,
  isPaused,
  setIsPaused,
  messageList,
  RenderComponent,
  containerRef,
  elementHeight,
  setMaxMessages,
}) => {
  const height = useElementHeight(containerRef)

  useEffect(() => {
    setMaxMessages(Math.floor(height / elementHeight))
    console.log('update')
  }, [height])

  return (
    <div className={styles.root}>
      <div className={styles.title}>{`${title} ${
        isPaused ? ' (Paused)' : ''
      }`}</div>
      {messageList.map((message, idx) => (
        <div key={idx}>
          <RenderComponent message={message} />
        </div>
      ))}
      <button
        onClick={() => {
          setIsPaused(wasPaused => !wasPaused)
        }}
      >
        {isPaused ? 'Resume' : 'Pause'}
      </button>
    </div>
  )
}

export default EventList