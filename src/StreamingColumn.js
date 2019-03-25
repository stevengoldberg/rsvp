import React, { useRef } from 'react'

import { AutoSizer } from 'react-virtualized'

import useStream from './useStream'
import EventList from './EventList'
import EmptyColumn from './EmptyColumn'
import ColumnHeader from './ColumnHeader'

import styles from './StreamingColumn.module.scss'

const StreamingColumn = ({
  rowHeight,
  RenderComponent,
  socketKey,
  title,
}) => {
  const { messageList } = useStream(socketKey)
  const listRef = useRef()
  const scrolledToBottom = useRef()

  return (
    <div className={styles.root}>
      <ColumnHeader
        title={title}
        scrolledToBottom={scrolledToBottom}
        messageList={messageList}
        listRef={listRef}
      />
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