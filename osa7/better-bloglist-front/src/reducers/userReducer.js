import userService from '../services/users'

const userReducer =(state=null, action) => {
  switch(action.type){
  case 'SET_USER':
    state = { ...state, username:action.username, name:action.name }
    return state
  case 'REMOVE_USER':
    state = { ...state, user:null }
    return state
  case 'INIT_USERS':
    return action.data
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

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    console.log('ENTÄS TÄÄL')
    console.log(users)
    dispatch({
      type: 'INIT_USERS',
      data: users,
    })
  }
}
export default userReducer