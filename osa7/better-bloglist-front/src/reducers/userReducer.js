const userReducer =(state=null, action) => {
  switch(action.type){
  case 'SET_USER':
    state = { ...state, username:action.username, name:action.name }
    return state
  case 'REMOVE_USER':
    state = { ...state, user:null }
    return state
  default:
    return state
  }
}

export const setUser = (user) => {
  console.log(user)
  return async dispatch => {
    console.log(user.username)
    console.log(user.name)
    await dispatch({
      type: 'SET_USER',
      username:user.username,
      name:user.name
    })
  }
}

export const removeUser = () => {
  return async dispatch => {
    await dispatch({
      type:'REMOVE_USER'
    })
  }
}


export default userReducer