import React, { useRef } from 'react'

import { AutoSizer } from 'react-virtualized'

import useStream from './useStream'
import EventList from './EventList'

import styles from './StreamingColumn.module.scss'

const StreamingColumn = ({ rowHeight, RenderComponent, socketKey, title }) => {
  const { messageList } = useStream(socketKey)
  const listRef = useRef()

  return (
    <div className={styles.root}>
     <div className={styles.header}>
        <div className={styles.title}>{title}</div>
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
              rowHeight={rowHeight}
              containerHeight={height}
              containerWidth={width}
              RenderComponent={RenderComponent}
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

export default StreamingColumn