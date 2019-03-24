import React, { useState, useEffect, useRef } from 'react'
import _ from 'lodash'

import { AutoSizer } from 'react-virtualized'
import { Motion, spring } from 'react-motion'

import MeetupLogo from './MeetupLogo'
import WorldMap from './WorldMap'
import useStream from './useStream'

import { getCoordinates } from './WorldMap'

import styles from './RsvpStream.module.scss'

const CHICAGO = [-87, 41]
const MINIMUM_SNAP_INTERVAL = 2000

const RsvpStream = () => {
  const { messageList } = useStream('rsvp', 25)
  const [mapCenter, setMapCenter] = useState(CHICAGO)
  const [snapToEvent, setSnapToEvent] = useState(true)
  const snapTimeout = useRef(false)

  useEffect(() => {
    const latestMessage = _.takeRight(messageList)[0]
    if (!latestMessage || !snapToEvent) return
    if (!snapTimeout.current) {
      setMapCenter(getCoordinates(latestMessage.message))
      snapTimeout.current = window.setTimeout(
        () => (snapTimeout.current = false),
        MINIMUM_SNAP_INTERVAL
      )
    }
  }, [messageList])
  return (
    <div className={styles.mapContainer}>
      <div className={styles.title}>
        <MeetupLogo /> RSVPs
        <label className={styles.toggle}>
          <input
            type="checkbox"
            checked={snapToEvent}
            onChange={() => setSnapToEvent(prevValue => !prevValue)}
          />
          Auto-center map on new events
        </label>
      </div>
      <AutoSizer>
        {({ height, width }) => (
          <Motion
            defaultStyle={{
              x: mapCenter[0],
              y: mapCenter[1],
            }}
            style={{
              x: spring(mapCenter[0], { stiffness: 210, damping: 20 }),
              y: spring(mapCenter[1], { stiffness: 210, damping: 20 }),
            }}
          >
            {({ x, y }) => (
              <WorldMap
                x={x}
                y={y}
                height={height}
                width={width}
                messageList={messageList}
              />
            )}
          </Motion>
        )}
      </AutoSizer>
    </div>
  )
}

export default RsvpStream