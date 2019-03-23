import * as React from 'react'

import StreamingColumn from './StreamingColumn'
import Comment, { COMMENT_HEIGHT } from './Comment'
import Photo, { PHOTO_HEIGHT } from './Photo'
import RsvpStream from './RsvpStream'

import styles from './App.module.css'

window.__sockets__ = {
  comments: new WebSocket('wss://stream.meetup.com/2/event_comments'),
  rsvp: new WebSocket('wss://stream.meetup.com/2/rsvps'),
  photos: new WebSocket('wss://stream.meetup.com/2/photos'),
}

const App = () => {
  return (
    <div className={styles.root}>
      <div className={styles.columns}>
        <StreamingColumn
          title="Comments"
          rowHeight={COMMENT_HEIGHT}
          socketKey="comments"
          RenderComponent={Comment}
        />
        <RsvpStream />
        <StreamingColumn
          title="Photos"
          rowHeight={PHOTO_HEIGHT}
          socketKey="photos"
          RenderComponent={Photo}
        />
      </div>
    </div>
  )
}

export default App