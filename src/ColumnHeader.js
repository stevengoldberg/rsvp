import React from 'react'

import Button from './Button'
import MeetupLogo from './MeetupLogo'

import styles from './ColumnHeader.module.scss'

const ColumnHeader = ({ title, scrolledToBottom, messageList, listRef }) => (
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
)

export default ColumnHeader