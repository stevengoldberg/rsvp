import * as React from 'react'
import _ from 'lodash'

const Comment = ({ message }) => (
  <div>
    <div>{message.comment}</div>
    <img src={_.get(message, 'member.photo')} />
  </div>
)

export default Comment
