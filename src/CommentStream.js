import React, { useRef } from 'react'

import useStream from './useStream'
import EventList from './EventList'
import Comment, { COMMENT_HEIGHT } from './Comment'

import styles from './CommentStream.module.css'

const CommentStream = () => {
  const containerRef = useRef(null)

  return (
    <div className={styles.root} ref={containerRef}>
      <EventList
        {...useStream('comments')}
        elementHeight={COMMENT_HEIGHT}
        containerRef={containerRef}
        title="Comments"
        RenderComponent={Comment}
      />
    </div>
  )
}

export default CommentStream