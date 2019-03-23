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

const LAND_COLORS = ['#09BC8A', '#92AA83', '#79B473', '#86BAA1', '#A0E8AF']

export const getCoordinates = rsvp => {
  const coordinates = []
  if (rsvp.venue) {
    coordinates.push(rsvp.venue.lon, rsvp.venue.lat)
  } else {
    coordinates.push(rsvp.group.group_lon, rsvp.group.group_lat)
  }
  return coordinates
}

const WorldMap = ({ height, width, x, y, messageList }) => (
  <ComposableMap height={height} width={width} projection="miller">
    <ZoomableGroup zoom={6} center={[x, y]}>
      <Geographies geography={`${process.env.PUBLIC_URL}/world-50m.json`}>
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
        {messageList.map(rsvp => {
          const { message, id } = rsvp
          const coordinates = getCoordinates(message)
          return (
            <Marker key={id} marker={{ coordinates }}>
              <defs>
                <clipPath id="circleView">
                  <circle cx="40" cy="20" r="20" fill="#FFFFFF" />
                </clipPath>
              </defs>
              <g>
                <circle
                  cx="40"
                  cy="20"
                  r="25"
                  fill={message.response === 'yes' ? 'green' : 'red'}
                />
                <image
                  clipPath="url(#circleView)"
                  xlinkHref={_.get(message, 'member.photo')}
                  width={80}
                  height={80}
                  style={{ background: 'white' }}
                />
              </g>
            </Marker>
          )
        })}
      </Markers>
    </ZoomableGroup>
  </ComposableMap>
)

export default WorldMap