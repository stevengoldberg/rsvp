import React, { useState } from 'react'

import ReactPlaceholder from 'react-placeholder'
import 'react-placeholder/lib/reactPlaceholder.css'
import classNames from 'classnames'

import styles from './ImageWithPlaceholder.module.scss'

const ImageWithPlaceholder = ({
  height,
  width,
  shape,
  imageProps: { className, src, alt },
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const handleImageLoaded = () => {
    setIsImageLoaded(true)
  }

  return (
    <>
      <img
        src={src}
        alt={alt}
        onLoad={handleImageLoaded}
        className={classNames(className, {
          [styles.visible]: isImageLoaded,
          [styles.hidden]: !isImageLoaded,
        })}
        style={{ height: isImageLoaded ? height : '0' }}
      />

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
}

export default ImageWithPlaceholder