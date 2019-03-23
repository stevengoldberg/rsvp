import React, { useEffect, useRef } from 'react'
import _ from 'lodash'

import styles from './WorldMap.module.scss'

import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker,
} from 'react-simple-maps'
import tooltip from 'wsdm-tooltip'

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

const WorldMap = ({ height, width, x, y, messageList }) => {
  const tooltipRef = useRef()
  useEffect(() => {
    tooltipRef.current = tooltip()
    tooltipRef.current.create()
  }, [])

  const handleMouseEnter = (rsvp, marker, evt) => {
    tooltipRef.current.show(`
      <div class="${styles.tooltip}">
        ${rsvp.member.member_name}
        <span class="${styles.attending}">
          ${rsvp.response === 'yes' ? 'will' : "won't"}
        </span>
        attend ${rsvp.event.event_name}
      </div>
    `)
    tooltipRef.current.position({ pageX: evt.pageX, pageY: evt.pageY })
  }
  const handleMouseLeave = marker => {
    tooltipRef.current.hide()
  }

  return (
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
              <Marker
                key={id}
                marker={{ coordinates }}
                onMouseEnter={(...args) =>
                  handleMouseEnter(rsvp.message, ...args)
                }
                onMouseLeave={(...args) =>
                  handleMouseLeave(rsvp.message, ...args)
                }
              >
                <defs>
                  <clipPath id="circleView">
                    <circle cx="40" cy="40" r="30" fill="#FFFFFF" />
                  </clipPath>
                </defs>
                <g>
                  <a
                    href={rsvp.message.event.event_url}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <circle
                      cx="40"
                      cy="40"
                      r="35"
                      fill={message.response === 'yes' ? 'green' : 'red'}
                    />
                    <image
                      clipPath="url(#circleView)"
                      xlinkHref={_.get(message, 'member.photo')}
                      width={80}
                      height={80}
                      style={{ background: 'white', cursor: 'pointer' }}
                    />
                  </a>
                </g>
              </Marker>
            )
          })}
        </Markers>
      </ZoomableGroup>
    </ComposableMap>
  )
}

export default WorldMap