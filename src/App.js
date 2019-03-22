import * as React from 'react'
// import useStream from './useStream'
// import useWindowHeight from './useWindowHeight'

import CommentStream from './CommentStream'
import PhotoStream from './PhotoStream'
import RsvpStream from './RsvpStream'

import styles from './App.module.css'

window.__sockets__ = {
  comments: new WebSocket('ws://stream.meetup.com/2/event_comments'),
  rsvp: new WebSocket('ws://stream.meetup.com/2/rsvps'),
  photos: new WebSocket('ws://stream.meetup.com/2/photos'),
}

const App = () => {
  return (
    <div className={styles.root}>
      <div className={styles.columns}>
        <CommentStream />
        <RsvpStream />
        <PhotoStream />
      </div>
    </div>
  )
}

export default App