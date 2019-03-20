import * as React from 'react'
import _ from 'lodash'

import styles from './Rsvp.module.css'

export const RSVP_HEIGHT = 100

const Rsvp = ({ message }) => (
  <div>
    <div>{_.get(message, 'event.event_name')}</div>
    <img src={_.get(message, 'member.photo')} />
    <div className={styles.response}>{_.get(message, 'response', '').toUpperCase()}</div>
  </div>
)

export default Rsvp
