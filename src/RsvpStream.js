import React from 'react'
import _ from 'lodash'
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker,
} from 'react-simple-maps'
import { AutoSizer } from 'react-virtualized'

import useStream from './useStream'

import styles from './RsvpStream.module.scss'

const CHICAGO = [-87, 41]
const LAND_COLORS = ['#09BC8A', '#92AA83', '#79B473', '#86BAA1', '#A0E8AF']

const RsvpStream = () => {
  const { messageList } = useStream('rsvp', 25)
  return (
    <div className={styles.mapContainer}>
      <AutoSizer>
        {({ height, width }) => (
          <ComposableMap height={height} width={width} projection="miller">
            <ZoomableGroup zoom={4} center={CHICAGO}>
              <Geographies
                geography={`${process.env.PUBLIC_URL}/world-50m.json`}
              >
                {(geographies, projection) =>
                  geographies.map((geography, i) => {
                    const style = {
                      fill: LAND_COLORS[_.random(0, LAND_COLORS.length - 1)],
                      stroke: '#FFF',
                      strokeWidth: 0.5,
                      outline: 'none',
                    }
                    return (
                      <Geography
                        key={`geography-${i}`}
                        cacheId={`geography-${i}`}
                        geography={geography}
                        projection={projection}
                        style={{
                          default: style,
                          hover: style,
                          pressed: style,
                        }}
                      />
                    )
                  })
                }
              </Geographies>
              <Markers>
                {messageList.map(({ message: rsvp, id }) => {
                  const coordinates = []
                  if (rsvp.venue) {
                    coordinates.push(rsvp.venue.lon, rsvp.venue.lat)
                  } else {
                    coordinates.push(rsvp.group.group_lon, rsvp.group.group_lat)
                  }
                  return (
                    <Marker key={id} marker={{ coordinates }}>
                      <defs>
                        <clipPath id="circleView">
                          <circle cx="40" cy="20" r="20" fill="#FFFFFF" />
                        </clipPath>
                      </defs>
                      <image
                        clipPath="url(#circleView)"
                        xlinkHref={_.get(rsvp, 'member.photo')}
                        width={80}
                        height={80}
                        style={{ background: 'white' }}
                      />
                    </Marker>
                  )
                })}
              </Markers>
            </ZoomableGroup>
          </ComposableMap>
        )}
      </AutoSizer>
    </div>
  )
}

export default RsvpStream