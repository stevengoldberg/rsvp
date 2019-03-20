import * as React from 'react'
import _ from 'lodash'

export const COMMENT_HEIGHT = 120

const Comment = ({ message }) => (
  <div>
    <div>{message.comment}</div>
    <img src={_.get(message, 'member.photo')} />
  </div>
)

export default Comment
