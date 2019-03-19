import * as React from 'react'
import _ from 'lodash'

const Photo = ({ message }) => (
  <div>
    <div>{_.get(message, 'photo_album.event.name')}</div>
    <img src={message.photo_link} />
  </div>
)

export default Photo
