import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'

import Notification from './components/Notification'
import BlogList from './components/BlogList'

import loginService from './services/login'
import storage from './utils/storage'

const App = () => {
  
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const user = storage.loadUser()
    setUser(user)
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      setUsername('')
      setPassword('')
      setUser(user)
      setNotification(`${user.name} welcome back!`)
      storage.saveUser(user)
    } catch (exception) {
      setNotification('wrong username/password')
    }
  }
  const handleLogout = () => {
    setUser(null)
    storage.logoutUser()
  }

  if (!user) {
    return (
      <div>
        <h2>login to application</h2>

        <Notification />

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id='username'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='login'>login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <BlogList user={user} />
    </div>
  )
}

export default App