import React, { useState, useEffect } from 'react'
import _ from 'lodash'

import DesktopView from './DesktopView'
import MobileView from './MobileView'

window.__sockets__ = {
  comments: new WebSocket('wss://stream.meetup.com/2/event_comments'),
  rsvp: new WebSocket('wss://stream.meetup.com/2/rsvps'),
  photos: new WebSocket('wss://stream.meetup.com/2/photos'),
}

const MOBILE_BREAKPOINT = 1280

const App = () => {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth)
  const setWidth = _.debounce(() => setViewportWidth(window.innerWidth), 250)
  useEffect(() => {
    window.addEventListener('resize', setWidth)
    return () => window.removeEventListener('resize', setWidth)
  }, [])
  return viewportWidth >= MOBILE_BREAKPOINT ? 
    <DesktopView /> :
    <MobileView />
}

export default App