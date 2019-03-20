import React, { useRef } from 'react'

import useStream from './useStream'
import EventList from './EventList'
import Photo, { PHOTO_HEIGHT } from './Photo'

import styles from './PhotoStream.module.css'

const PhotoStream = () => {
  const containerRef = useRef(null)
  return (
    <div className={styles.root} ref={containerRef}>
      <EventList
        {...useStream('photos')}
        elementHeight={PHOTO_HEIGHT}
        containerRef={containerRef}
        title="Photos"
        RenderComponent={Photo}
      />
    </div>
  )
}

export default PhotoStream