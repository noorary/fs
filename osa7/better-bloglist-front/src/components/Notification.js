import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  console.log(props)
  if ( props.notification.notification === '' ) {
    return null
  }

  const style = {
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    color: 'black',
    background: 'lightgrey'
  }
  console.log('päästääks tänne')

  return <div style={style}>
    {props.notification.notification}
  </div>
}

const mapStateToProps = state => {
  return {
    notification: state.notification
  }
}


export default connect(mapStateToProps, null)(Notification)

// tallessa

// color: notification.type === 'success' ? 'green' : 'red',