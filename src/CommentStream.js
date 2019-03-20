import React, { useRef } from 'react'

import { AutoSizer } from 'react-virtualized'

import useStream from './useStream'
import EventList from './EventList'
import Comment, { COMMENT_HEIGHT } from './Comment'

import styles from './CommentStream.module.css'

const CommentStream = () => {
  const { messageList } = useStream('comments')
  const listRef = useRef()

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.title}>Comments</div>
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
              rowHeight={COMMENT_HEIGHT}
              containerHeight={height}
              containerWidth={width}
              RenderComponent={Comment}
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

export default CommentStream