import * as React from 'react'
import _ from 'lodash'

import BitmapImageWithPlaceholder from './BitmapImageWithPlaceholder'

import styles from './Photo.module.scss'

export const PHOTO_HEIGHT = 545

const Photo = ({ message, photoWidth, style }) => (
  <div style={style} className={styles.root}>
    <div className={styles.header}>
      {_.get(message, 'photo_album.event.name')}
    </div>
    <BitmapImageWithPlaceholder
      height={PHOTO_HEIGHT}
      width={photoWidth}
      imageProps={{
        className: styles.photo,
        src: message.photo_link,
        alt: _.get(message, 'photo_album.event.name'),
      }}
      shape="rect"
    />
    <div className={styles.footer}>
      <span>{new Date(message.mtime).toLocaleString()}</span>
      <span>by {_.get(message, 'member.name')}</span>
    </div>
  </div>
)

export default Photo