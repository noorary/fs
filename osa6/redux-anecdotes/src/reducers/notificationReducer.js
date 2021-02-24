export const setNotification = ( notification, time ) => {
  return async dispatch => {
    const timer = setTimeout(() => {
      dispatch(clearNotification())
    }, time * 1000)
    dispatch({
      type: 'SET_NOTIF',
      data: { notification, timer}
    })
  }
}

export const clearNotification = () => {
  const notification = ''
  const timer = null
  return {
    type: 'CLEAR_NOTIF',
    data: { notification, timer}
  }
}

const notificationReducer = (state = '', action) => {
  console.log(action)
  switch (action.type) {
    case 'SET_NOTIF':
      return {
        notification: action.data.notification,
        timer: action.data.timeout
      }
    case 'CLEAR_NOTIF':
      return {
        notification: '',
        timer: null
      }
    default:
      return state
  }
}

export default notificationReducer