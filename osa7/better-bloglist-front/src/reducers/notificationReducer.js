export const setNotification = ( notification ) => {
  console.log('set notification')
  return async dispatch => {
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
    dispatch({
      type: 'SET_NOTIF',
      data: { notification}
    })
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIF'
  }
}

const notificationReducer = (state = { notification: ''}, action) => {
  switch (action.type) {
    case 'SET_NOTIF':
      return {
        notification: action.data.notification,
      }
    case 'CLEAR_NOTIF':
      return {
        notification: ''
      }
    default:
      return state
  }
}

export default notificationReducer