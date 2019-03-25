import React, { useState } from 'react'

import styles from './MobileView.module.scss'

import StreamingColumn from './StreamingColumn'
import Comment, { COMMENT_HEIGHT } from './Comment'
import Photo, { PHOTO_HEIGHT } from './Photo'
// import RsvpStream from './RsvpStream'
import ViewSelect from './ViewSelect'

const views = [
  {
    label: 'Comments',
    id: 0,
    Component: (
      <StreamingColumn
        title="Comments"
        rowHeight={COMMENT_HEIGHT}
        socketKey="comments"
        RenderComponent={Comment}
      />
    ),
  },
  // {
  //   label: 'RSVPs',
  //   id: 1,
  //   Component: <RsvpStream />,
  // },
  {
    label: 'Photos',
    id: 2,
    Component: (
      <StreamingColumn
        title="Photos"
        rowHeight={PHOTO_HEIGHT}
        socketKey="photos"
        RenderComponent={Photo}
      />
    ),
  },
]

const MobileView = () => {
  const [selectedViewId, setSelectedViewId] = useState(0)

  return (
    <div className={styles.root}>
      <ViewSelect
        handleSelect={id => setSelectedViewId(id)}
        selectedViewId={selectedViewId}
        views={views}
      />
      <div className={styles.columns}>
        {views.map(view => (
          <div
            className={view.id === selectedViewId ? styles.show : styles.hide}
          >
            {view.Component}
          </div>
        ))}
      </div>
    </div>
  )
}

export default MobileView