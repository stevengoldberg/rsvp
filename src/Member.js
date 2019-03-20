import * as React from 'react'

import styles from './Member.module.css'

const Member = ({ member: { member_name: memberName, photo: memberPhoto } }) => (
  <div className={styles.root}>
    <img src={memberPhoto} className={styles.photo} alt={`Avatar for ${memberName}`} />
    <div className={styles.name}>{memberName}</div>
  </div>
)

export default Member