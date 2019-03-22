import React from 'react'
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
} from 'react-simple-maps'
import { AutoSizer } from 'react-virtualized'

import useStream from './useStream'

import styles from './RsvpStream.module.css'

const RsvpStream = () => {
  const { messageList } = useStream('rsvp')
  return (
    <div className={styles.mapContainer}>
      <AutoSizer>
        {({ height, width }) => (
          <ComposableMap height={height} width={width} projection="miller">
            <ZoomableGroup zoom={2}>
              <Geographies geography={`${process.env.PUBLIC_URL}/world-50m.json`}>
                {(geographies, projection) =>
                  geographies.map((geography, i) => (
                    <Geography
                      key={`geography-${i}`}
                      cacheId={`geography-${i}`}
                      geography={geography}
                      projection={projection}
                      style={{
                        default: {
                          fill: 'gray',
                          stroke: '#FFF',
                          strokeWidth: 0.5,
                          outline: 'none',
                        },
                      }}
                    />
                  ))
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
        )}
      </AutoSizer>
    </div>
  )
}

export default RsvpStream