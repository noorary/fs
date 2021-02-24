import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  console.log(props)
  const notification = props.notification
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
      {notification}
    </div>
  )
}

const mapStateToProps = state => {
  return { notification: state.notification.notification}
}

export default connect(mapStateToProps, null)(Notification)