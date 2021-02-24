import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  let style
  if (notification === '' || notification.notification === '') {
    style = undefined
  } else {
    style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
  }

  return (
    <div style={style}>
      {notification.notification}
    </div>
  )
}

export default Notification