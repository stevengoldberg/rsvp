import * as React from 'react'

import ImageWithPlaceholder from './ImageWithPlaceholder'

import styles from './Member.module.css'

const MEMBER_PHOTO_HEIGHT = 70

const Member = ({
  member: { member_name: memberName, photo: memberPhoto },
}) => (
  <div className={styles.root}>
    <ImageWithPlaceholder
      imageProps={{
        className: styles.photo,
        src: memberPhoto,
        alt: `Avatar for ${memberName}`,
      }}
      shape="round"
      height={MEMBER_PHOTO_HEIGHT}
      width={MEMBER_PHOTO_HEIGHT}
    />
    <div className={styles.name}>{memberName}</div>
  </div>
)

export default Member