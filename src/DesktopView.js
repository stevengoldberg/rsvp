import React from 'react'

import StreamingColumn from './StreamingColumn'
import Comment, { COMMENT_HEIGHT } from './Comment'
import Photo, { PHOTO_HEIGHT } from './Photo'
import RsvpStream from './RsvpStream'

import styles from './DesktopView.module.scss'

const DesktopView = () => (
  <div className={styles.root}>
    <div className={styles.columns}>
      <div className={styles.sideColumn}>
        <StreamingColumn
          title="Comments"
          rowHeight={COMMENT_HEIGHT}
          socketKey="comments"
          RenderComponent={Comment}
        />
      </div>
      <div className={styles.centerColumn}>
        <RsvpStream />
      </div>
      <div className={styles.sideColumn}>
        <StreamingColumn
          title="Photos"
          rowHeight={PHOTO_HEIGHT}
          socketKey="photos"
          RenderComponent={Photo}
        />
      </div>
    </div>
  </div>
)

export default DesktopView