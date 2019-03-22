import * as React from 'react'
import _ from 'lodash'

import styles from './Photo.module.scss'

export const PHOTO_HEIGHT = 545

const Photo = ({ message, photoWidth, style }) => (
  <div style={style} className={styles.root}>
    <div className={styles.header}>
      {_.get(message, 'photo_album.event.name')}
    </div>
    <img
      className={styles.photo}
      src={message.photo_link}
      alt={_.get(message, 'photo_album.event.name')}
    />
    <div className={styles.footer}>
      <span>{new Date(message.mtime).toLocaleString()}</span>
      <span>by {_.get(message, 'member.name')}</span>
    </div>
  </div>
)

export default Photo
