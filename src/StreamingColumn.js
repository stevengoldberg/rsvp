import React, { useRef, useState } from 'react'

import { AutoSizer } from 'react-virtualized'
import classNames from 'classnames'

import useViewportWidth from './useViewportWidth'
import useStream from './useStream'
import EventList from './EventList'
import EmptyColumn from './EmptyColumn'
import ColumnHeader from './ColumnHeader'

import { MOBILE_BREAKPOINT } from './App'

import styles from './StreamingColumn.module.scss'

const StreamingColumn = ({ rowHeight, RenderComponent, socketKey, title }) => {
  const { messageList } = useStream(socketKey)
  const listRef = useRef()
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(true)
  const viewportWidth = useViewportWidth()

  return (
    <div className={styles.root}>
      <ColumnHeader
        title={title}
        isScrolledToBottom={isScrolledToBottom}
        messageList={messageList}
        listRef={listRef}
      />
      <div
        className={classNames(styles.list, {
          [styles.fixed]: viewportWidth < MOBILE_BREAKPOINT,
        })}
      >
        <AutoSizer>
          {({ height, width }) => (
            <EventList
              isScrolledToBottom={isScrolledToBottom}
              setIsScrolledToBottom={setIsScrolledToBottom}
              messageList={messageList}
              rowHeight={rowHeight}
              title={title}
              containerHeight={height}
              containerWidth={width}
              RenderComponent={RenderComponent}
              photoWidth={width}
              getListRef={ref => {
                listRef.current = ref
              }}
              noRowsRenderer={() => <EmptyColumn title={title} />}
            />
          )}
        </AutoSizer>
      </div>
    </div>
  )
}

export default StreamingColumn