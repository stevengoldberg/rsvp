import React, { useRef } from 'react'

import useStream from './useStream'
import EventList from './EventList'
import Rsvp, { RSVP_HEIGHT } from './Rsvp'

import styles from './RsvpStream.module.css'

const RsvpStream = () => {
  const containerRef = useRef(null)
  return (
    <div className={styles.root} ref={containerRef}>
      <EventList
        {...useStream('rsvp')}
        elementHeight={RSVP_HEIGHT}
        containerRef={containerRef}
        title="RSVPs"
        RenderComponent={Rsvp}
      />
    </div>
  )
}

export default RsvpStream