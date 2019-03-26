import { useState, useEffect } from 'react'
import _ from 'lodash'

const useViewportWidth = () => {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth)
  const setWidth = _.debounce(() => setViewportWidth(window.innerWidth), 250)
  useEffect(() => {
    window.addEventListener('resize', setWidth)
    return () => window.removeEventListener('resize', setWidth)
  }, [])
  return viewportWidth
}

export default useViewportWidth