import React from 'react'
import { ReactComponent as Logo } from './meetup.svg'

import styles from './MeetupLogo.module.scss'

const MeetupLogo = () => (
  <span className={styles.root}>
    <Logo height={'100%'} width={60} />
  </span>
)

export default MeetupLogo