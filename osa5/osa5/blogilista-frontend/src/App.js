import React, { useState, useEffect } from 'react'

import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleNameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }
  return (
    <div>
    {user === null
      ? <LoginForm
        username={username}
        password={password}
        handleLogin={handleLogin}
        handleNameChange={handleNameChange}
        handlePasswordChange={handlePasswordChange} />
      : <div>
        <h2>blogs</h2>
        <p>{user.name} logged in</p>
        <BlogForm blogs={blogs}/>
    </div>
    }
    </div>
  )
}

export default App