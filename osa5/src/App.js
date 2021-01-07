import React, { useState, useEffect } from 'react'
 
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
   blogService.getAll().then(blogs =>
     setBlogs( blogs )
   ) 
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
 
 const handleLogout = async (event) => {
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
       <Blog key={blog.id} blog={blog} />
       )}
      </div>
      <Togglable buttonLabel='new blog'>
      <BlogForm
      blogs={blogs}
      setBlogs={setBlogs}
       user={user}
       showNotification={showNotification}/>
      </Togglable>
   </div>
   }
   </div>
 )
}
 
export default App
