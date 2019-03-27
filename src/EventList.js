import React, { useState, useEffect, useRef } from 'react'

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
  title,
  setIsScrolledToBottom,
  isScrolledToBottom,
  ...otherProps
}) => {
  const listRef = useRef()
  const [lastIndex, setLastIndex] = useState()

  useEffect(() => {
    const latestId = _.get(_.takeRight(messageList), '[0].id')
    setIsScrolledToBottom(latestId === lastIndex)
  }, [lastIndex])

  const listProps = {
    rowHeight,
    rowCount: messageList.length,
    height: containerHeight,
    width: containerWidth,
    style: { scrollBehavior: 'smooth' },
    scrollToAlignment: 'end',
    noRowsRenderer,
    onRowsRendered: ({ stopIndex }) => {
      setLastIndex(stopIndex)
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

  if (isScrolledToBottom && messageList.length) {
    listProps.scrollToIndex = messageList.length - 1
  }

  return <List {...listProps} ref={listRef} />
}

export default EventList