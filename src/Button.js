import React from 'react'

import styles from './Button.module.scss'

const Button = ({ onClick, children, disabled }) => (
  <button
    onClick={onClick}
    type="button"
    className={styles.root}
    disabled={disabled}
  >
    {children}
  </button>
)

export default Button