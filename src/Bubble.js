import * as React from 'react'

import Dotdotdot from 'react-dotdotdot'

import styles from './Bubble.module.scss'

const Bubble = ({ comment, index }) => (
  <div className={index % 2 === 0 ? styles.bubbleLeft : styles.bubbleRight}>
    <Dotdotdot clamp="auto">
      {comment}
    </Dotdotdot>
  </div>
)

export default Bubble