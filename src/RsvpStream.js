import React from 'react'
import _ from 'lodash'
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Annotations,
  Annotation,
} from 'react-simple-maps'
import { AutoSizer } from 'react-virtualized'

import useStream from './useStream'

import styles from './RsvpStream.module.css'

const CHICAGO = [-87, 41]

const RsvpStream = () => {
  const { messageList } = useStream('rsvp', 20)
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
              <Annotations>
                {messageList.map(({ message: rsvp, id }) => {
                  const coordinates = []
                  if (rsvp.venue) {
                    coordinates.push(rsvp.venue.lon, rsvp.venue.lat)
                  } else {
                    coordinates.push(rsvp.group.group_lon, rsvp.group.group_lat)
                  }
                  return (
                    <Annotation
                      key={id}
                      subject={coordinates}
                      dx={40}
                      dy={20}
                      strokeWidth={0.5}
                    >
                      <text className={styles.mapLabel} alignment-baseline="central" dx="1px">
                        {_.get(rsvp, 'member.member_name')}
                      </text>
                    </Annotation>
                  )
                })}
              </Annotations>
            </ZoomableGroup>
          </ComposableMap>
        )}
      </AutoSizer>
    </div>
  )
}

export default RsvpStream