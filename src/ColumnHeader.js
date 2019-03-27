import React from 'react'

import classNames from 'classnames'

import Button from './Button'
import MeetupLogo from './MeetupLogo'
import useViewportWidth from './useViewportWidth'

import { MOBILE_BREAKPOINT } from './App'

import styles from './ColumnHeader.module.scss'

const ColumnHeader = ({ title, isScrolledToBottom, scrollToRow }) => {
  const viewportWidth = useViewportWidth()
  return (
    <div
      className={classNames(styles.header, {
        [styles.fixed]: viewportWidth < MOBILE_BREAKPOINT,
      })}
    >
      <div className={styles.title}>
        <MeetupLogo />
        {title}
      </div>
      <Button
        disabled={isScrolledToBottom}
        onClick={scrollToRow}
      >
        {isScrolledToBottom ? 'All caught up' : 'Jump to latest'}
      </Button>
    </div>
  )
}

export default ColumnHeader