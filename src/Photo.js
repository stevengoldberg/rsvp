import * as React from 'react'
import _ from 'lodash'

import styles from './Photo.module.scss'

export const PHOTO_HEIGHT = 421

const Photo = ({ message, photoWidth, style }) => (
  <div>
    <div>{_.get(message, 'photo_album.event.name')}</div>
    <img
      className={styles.photo}
      src={message.photo_link}
      style={{
        ...style,
        width: photoWidth,
        height: photoWidth,
      }}
    />
  </div>
)

export default Photo
