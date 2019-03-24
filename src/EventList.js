import React, { useRef, useEffect } from 'react'

import _ from 'lodash'

import { List } from 'react-virtualized'

const EventList = ({
  messageList,
  RenderComponent,
  rowHeight,
  containerHeight,
  containerWidth,
  getListRef,
  getScrolledToBottomRef,
  noRowsRenderer,
  ...otherProps
}) => {
  const scrolledToBottom = useRef(true)
  const listRef = useRef()
  const latestMessageRef = useRef(_.takeRight(messageList))

  useEffect(() => {
    latestMessageRef.current = _.takeRight(messageList)
  }, [messageList])

  const listProps = {
    rowHeight,
    rowCount: messageList.length,
    height: containerHeight,
    width: containerWidth,
    style: { scrollBehavior: 'smooth' },
    scrollToAlignment: 'end',
    noRowsRenderer,
    onRowsRendered: ({ stopIndex }) => {
      const latestId = _.get(latestMessageRef, 'current[0].id')
      scrolledToBottom.current = stopIndex === latestId
      getScrolledToBottomRef(scrolledToBottom.current)
    },
    rowRenderer: ({ index, key, style }) =>
      messageList[index] ? (
        <RenderComponent
          message={messageList[index].message}
          index={index}
          style={style}
          key={messageList[index].id}
          {...otherProps}
        />
      ) : null,
  }

  getListRef(listRef.current)

  if (scrolledToBottom.current && messageList.length) {
    listProps.scrollToIndex = messageList.length - 1
  }

  return <List {...listProps} ref={listRef} />
}

export default EventList