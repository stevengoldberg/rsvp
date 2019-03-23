import React, { useState, useEffect, useRef } from 'react'
import _ from 'lodash'

import { AutoSizer } from 'react-virtualized'
import { Motion, spring } from 'react-motion'

import WorldMap from './WorldMap'
import useStream from './useStream'

import { getCoordinates } from './WorldMap'

import styles from './RsvpStream.module.scss'

const CHICAGO = [-87, 41]

const RsvpStream = () => {
  const { messageList } = useStream('rsvp', 25)
  const [mapCenter, setMapCenter] = useState(CHICAGO)
  const [snapToEvent, setSnapToEvent] = useState(false)
  const snapNext = useRef(false)

  useEffect(() => {
    const latestMessage = _.takeRight(messageList)[0]
    if (!latestMessage || !snapToEvent) return
    if (!snapNext.current) {
      snapNext.current = true
      return
    }
    setMapCenter(getCoordinates(latestMessage.message))
    snapNext.current = false
  }, [messageList])
  return (
    <div className={styles.mapContainer}>
      <div className={styles.title}>
        RSVP
        <div className={styles.toggle}>
          <input
            type="checkbox"
            value={snapToEvent}
            onChange={() => setSnapToEvent(prevValue => !prevValue)}
          />
          Snap to latest
        </div>
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