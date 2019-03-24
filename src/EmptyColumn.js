import React from 'react'

import styles from './EmptyColumn.module.scss'

const EmptyColumn = ({ title }) => (
  <div className={styles.root}>{title} will display here...</div>
)

export default EmptyColumn
