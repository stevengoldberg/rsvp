import { useState, useEffect } from 'react'

const useElementHeight = (ref) => {
  const [height, setHeight] = useState()

  useEffect(() => {
    setHeight(ref.current.clientHeight)
  })

  return height
}

export default useElementHeight
