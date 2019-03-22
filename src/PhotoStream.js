import React, { useRef } from 'react'

import { AutoSizer } from 'react-virtualized'

import useStream from './useStream'
import EventList from './EventList'
import Photo, { PHOTO_HEIGHT } from './Photo'

import styles from './PhotoStream.module.css'

const PhotoStream = () => {
  const { messageList } = useStream('photos')
  const listRef = useRef()

  return (
    <div className={styles.root}>
     <div className={styles.header}>
        <div className={styles.title}>Photos</div>
        <button
          onClick={() => {
            listRef.current.scrollToRow(messageList.length - 1)
          }}
        >
          Jump to latest
        </button>
      </div>
      <div className={styles.list}>
        <AutoSizer>
          {({ height, width }) => (
            <EventList
              messageList={messageList}
              rowHeight={PHOTO_HEIGHT}
              containerHeight={height}
              containerWidth={width}
              RenderComponent={Photo}
              photoWidth={width}
              getListRef={ref => {
                listRef.current = ref
              }}
            />
          )}
        </AutoSizer>
      </div>
    </div>
  )
}

export default PhotoStream