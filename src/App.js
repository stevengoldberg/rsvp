import * as React from 'react'

import useStream from './useStream'
import EventList from './EventList'
import Comment from './Comment'
import Rsvp from './Rsvp'
import Photo from './Photo'
import styles from './App.module.css'

window.__sockets__ = {
  comments: {
    ws: new WebSocket('ws://stream.meetup.com/2/event_comments'),
    title: 'Comments',
    component: Comment,
    max: 6,
  },
  rsvp: {
    ws: new WebSocket('ws://stream.meetup.com/2/rsvps'),
    title: 'RSVP',
    component: Rsvp,
    max: 10,
  },
  photos: {
    ws: new WebSocket('ws://stream.meetup.com/2/photos'),
    title: 'Photos',
    component: Photo,
    max: 2,
  },
}

const App = () => {
  return (
    <div className={styles.root}>
      {Object.keys(window.__sockets__).map(socketType =>
        <EventList
          {
            ...useStream({ path: socketType, maxMessages: window.__sockets__[socketType].max })
          }
          title={window.__sockets__[socketType].title}
          RenderComponent={window.__sockets__[socketType].component}
        />
      )}
    </div>
  )
};

export default App;