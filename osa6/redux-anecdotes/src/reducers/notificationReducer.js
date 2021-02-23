export const setNotification = ( notification ) => {
  return {
    type: 'SET_NOTIF',
    data: { notification }
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIF'
  }
}

const notificationReducer = (state = '', action) => {
  console.log(action)
  switch (action.type) {
    case 'SET_NOTIF':
      return action.data.notification
    case 'CLEAR_NOTIF':
      return ''
    default:
      return state
  }
}

export default notificationReducer