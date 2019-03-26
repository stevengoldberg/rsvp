import React from 'react'

import styles from './EmptyColumn.module.scss'

const EmptyColumn = ({ title }) => (
  <div className={styles.root}>Waiting to receive {title}...</div>
)

export default EmptyColumn
