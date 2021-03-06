import * as React from 'react'

import classNames from 'classnames'
import _ from 'lodash'

import Member from './Member'
import Bubble from './Bubble'

import styles from './Comment.module.scss'

export const COMMENT_HEIGHT = 170

const Comment = ({ message, index, style }) => {
  const city = _.get(message, 'group.city')
  const eventName = _.get(message, 'event.event_name')

  return (
    <div style={style}>
      <div className={styles.title}>
        <div className={styles.eventName}>
          {`${eventName}, `}
        </div>
        <div className={styles.eventLocation}>
          {city}
        </div>
        <div className={styles.dateTime}>
          {new Date(message.mtime).toLocaleString()}
        </div>
      </div>
      <div
        className={classNames({
          [styles.commentLeft]: index % 2 === 0,
          [styles.commentRight]: index % 2 !== 0,
        })}
      >
        <Member member={message.member} />
        <Bubble comment={message.comment} index={index} />
      </div>
    </div>
  )
}

export default Comment