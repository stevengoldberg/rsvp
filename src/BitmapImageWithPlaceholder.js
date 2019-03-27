import React, { useState } from 'react'
import classNames from 'classnames'

import ImageWithPlaceholder from './ImageWithPlaceholder'

import styles from './ImageWithPlaceholder.module.scss'

const BitmapImageWithPlaceholder = ({
  height,
  width,
  shape,
  imageProps: { className, src, alt },
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const handleImageLoaded = () => {
    setIsImageLoaded(true)
  }

  const ImageComponent = (
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
  )

  return (
    <ImageWithPlaceholder
      ImageComponent={ImageComponent}
      height={height}
      width={width}
      isImageLoaded={isImageLoaded}
      shape={shape}
    />
  )
}

export default BitmapImageWithPlaceholder