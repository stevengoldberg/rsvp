import * as React from 'react'
import _ from 'lodash'

export const PHOTO_HEIGHT = 300

const Photo = ({ message }) => (
  <div>
    <div>{_.get(message, 'photo_album.event.name')}</div>
    <img src={message.photo_link} />
  </div>
)

export default Photo
