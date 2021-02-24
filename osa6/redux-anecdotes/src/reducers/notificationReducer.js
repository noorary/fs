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
  return {
    type: 'CLEAR_NOTIF'
  }
}

const notificationReducer = (state = { notification: '', timer: null}, action) => {
  switch (action.type) {
    case 'SET_NOTIF':
      console.log('TÄÄ')
      console.log(state.timer)
      if(state.timer !== null) {
        clearTimeout(state.timer)
      }
      
      return {
        notification: action.data.notification,
        timer: action.data.timer
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