import React, { useState, useEffect, useRef } from 'react'

import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({
    content: null,
    style: null
  })

  useEffect(() => {
    const getBlogs = async () => {
      const response = await blogService.getAll()
      setBlogs(response.sort((blog1, blog2) => blog2.likes - blog1.likes ))
    }
    getBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      showNotification('Wrong username or password', 'failure')
    }
  }

  const showNotification = (content, style) => {
    setNotification({
      content: content,
      style: style
    })
    setTimeout(() => {
      setNotification({
        content: null,
        style: null
      })
    }, 5000)
  }

  const handleLike = async (blog) => {
    try {
      blog.likes += 1
      const updatedBlog = await blogService.like(blog.id, blog)
      const sorted = blogs.map(blog => blog.id !== updatedBlog.id ? blog : updatedBlog).sort((blog1, blog2) => blog2.likes - blog1.likes)
      setBlogs(sorted)
    } catch (error) {
      showNotification('something went wrong', 'failure')
    }
  }

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      await blogService.create(blogObject)
      const updatedBlogs = await blogService.getAll()
      setBlogs(updatedBlogs)
      showNotification(`A new blog ${blogObject.title} by ${blogObject.author} was added`, 'success')

    } catch (err) {
      showNotification(`Something went wrong and blog was not added, error: ${err}`, 'failure')
    }
  }

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)) {
      try {
        await blogService.remove(blog.id)
        showNotification(`${blog.title} deleted`, 'success')
        setBlogs(blogs.filter(b => b.id !== blog.id))
      } catch (error) {
        showNotification('Error when deleting blog', 'failure')
      }
    }

  }

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    console.log(window.localStorage)
  }

  const handleNameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const blogFormRef = useRef()


  return (
    <div>
      {user === null
        ? <div>
          <Notification notification={notification} />
          <LoginForm
            username={username}
            password={password}
            handleLogin={handleLogin}
            handleNameChange={handleNameChange}
            handlePasswordChange={handlePasswordChange} />
        </div>
        : <div>
          <h2>blogs</h2>
          <Notification notification={notification} />
          <p>{user.name} logged in</p><button onClick={handleLogout}>logout</button>
          <div>
            {blogs.map(blog =>
              <Blog
                key={blog.id}
                blog={blog}
                user={user}
                handleLike={handleLike}
                handleDelete={handleDelete}
                 />
            )}
          </div>
          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <BlogForm
              createBlog={addBlog}/>
          </Togglable>
        </div>
      }
    </div>
  )
}


export default App
