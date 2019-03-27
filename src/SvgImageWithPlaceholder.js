import React, { useState } from 'react'
import classNames from 'classnames'

import ImageWithPlaceholder from './ImageWithPlaceholder'

import styles from './ImageWithPlaceholder.module.scss'

const SvgImageWithPlaceholder = ({
  height,
  width,
  shape,
  imageProps: { className, src },
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const handleImageLoaded = () => {
    setIsImageLoaded(true)
  }

  const ImageComponent = (
    <image
      clipPath="url(#circleView)"
      xlinkHref={src}
      width={width}
      height={isImageLoaded ? height : 0}
      style={{ background: 'white', cursor: 'pointer' }}
      className={classNames(className, {
        [styles.visible]: isImageLoaded,
        [styles.hidden]: !isImageLoaded,
      })}
      onLoad={handleImageLoaded}
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

export default SvgImageWithPlaceholder