import React from 'react'

import { AutoSizer } from 'react-virtualized'

import useStream from './useStream'

import styles from './RsvpStream.module.css'

const RsvpStream = () => {
  const { messageList } = useStream('rsvp')
  return (
    <div className={styles.mapContainer}>
      <AutoSizer disableWidth>
        {({ height }) => <div id="js-map" style={{ height }} />}
      </AutoSizer>
    </div>
  )
}

export default RsvpStream