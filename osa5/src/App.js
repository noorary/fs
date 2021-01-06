import React, { useState, useEffect } from 'react'
 
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
 
import blogService from './services/blogs'
import loginService from './services/login'
 
const App = () => {
 const [blogs, setBlogs] = useState([])
 const [username, setUsername] = useState('')
 const [password, setPassword] = useState('')
 const [user, setUser] = useState(null)
 const [newTitle, setNewTitle] = useState('')
 const [newAuthor, setNewAuthor] = useState('')
 const [newUrl, setNewUrl] = useState('')
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

 const addBlog = (event) => {
   event.preventDefault()
   const blogObject = {
     title: newTitle,
     author: newAuthor,
     url: newUrl,
     likes: 0,
     user: user.id
   }

   blogService.create(blogObject).then(returnedBlog => {
     setBlogs(blogs.concat(returnedBlog))
     setNewAuthor('')
     setNewTitle('')
     setNewUrl('')
     showNotification(`A new blog ${returnedBlog.title} by ${returnedBlog.author} was added`, 'success')
   })
   .catch(error => {
     showNotification('Something went wrong and blog was not added', 'failure')
   })

  }
 
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

 const handleTitleChange = (event) => {
   setNewTitle(event.target.value)
 }
const handleAuthorChange = (event) => {
  setNewAuthor(event.target.value)
}
const handleUrlChange = (event) => {
  setNewUrl(event.target.value)
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
       <BlogForm
       blogs={blogs}
       handleAuthorChange={handleAuthorChange}
       handleTitleChange={handleTitleChange}
       handleUrlChange={handleUrlChange}
       newTitle={newTitle}
       newAuthor={newAuthor}
       newUrl={newUrl}
       addBlog={addBlog}/>
   </div>
   }
   </div>
 )
}
 
export default App
