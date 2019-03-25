import React from 'react'

import styles from './ViewSelect.module.scss'

const ViewSelect = ({ handleSelect, views, selectedViewId }) => (
  <div className={styles.root}>
    {views.map(view => (
      <label key={view.id}>
        <input
          onChange={() => handleSelect(view.id)}
          value={view.id}
          type="radio"
          checked={view.id === selectedViewId}
        />
        {view.label}
      </label>
    ))}
  </div>
)

export default ViewSelect