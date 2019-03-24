import React, { useRef } from 'react'

import { AutoSizer } from 'react-virtualized'

import useStream from './useStream'
import EventList from './EventList'
import Button from './Button'
import MeetupLogo from './MeetupLogo'
import EmptyColumn from './EmptyColumn'

import styles from './StreamingColumn.module.scss'

const StreamingColumn = ({ rowHeight, RenderComponent, socketKey, title }) => {
  const { messageList } = useStream(socketKey)
  const listRef = useRef()
  const scrolledToBottom = useRef()

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.title}>
          <MeetupLogo />
          {title}
        </div>
        <Button
          disabled={scrolledToBottom.current}
          onClick={() => {
            listRef.current.scrollToRow(messageList.length - 1)
          }}
        >
          {scrolledToBottom.current ? 'All caught up' : 'Jump to latest'}
        </Button>
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
              noRowsRenderer={() => <EmptyColumn title={title} />}
              getScrolledToBottomRef={ref => {
                scrolledToBottom.current = ref
              }}
            />
          )}
        </AutoSizer>
      </div>
    </div>
  )
}

export default StreamingColumn