import React from 'react'

import DesktopView from './DesktopView'
import MobileView from './MobileView'
import useViewportWidth from './useViewportWidth'

window.__sockets__ = {
  comments: new WebSocket('wss://stream.meetup.com/2/event_comments'),
  rsvp: new WebSocket('wss://stream.meetup.com/2/rsvps'),
  photos: new WebSocket('wss://stream.meetup.com/2/photos'),
}

export const MOBILE_BREAKPOINT = 1280

const App = () => {
  const viewportWidth = useViewportWidth()
  return viewportWidth < MOBILE_BREAKPOINT ? 
    <MobileView /> :
    <DesktopView />
}

export default App