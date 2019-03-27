import React from 'react'

import ReactPlaceholder from 'react-placeholder'
import 'react-placeholder/lib/reactPlaceholder.css'
import classNames from 'classnames'

import styles from './ImageWithPlaceholder.module.scss'

const ImageWithPlaceholder = ({ height, width, shape, isImageLoaded, ImageComponent }) => (
  <>
    {ImageComponent}
    <ReactPlaceholder
      ready={isImageLoaded}
      showLoadingAnimation
      className={classNames({
        [styles.visible]: !isImageLoaded,
        [styles.hidden]: isImageLoaded,
      })}
      style={{ width, height: isImageLoaded ? '0' : height }}
      type={shape}
    >
      <div />
    </ReactPlaceholder>
  </>
)

export default ImageWithPlaceholder