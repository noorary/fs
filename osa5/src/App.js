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
 
 useEffect(() => {
   const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
   if(loggedUserJSON) {
     const user = JSON.parse(loggedUserJSON)
     setUser(user)
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
     console.log(window.localStorage)
 
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
     ? <LoginForm
       username={username}
       password={password}
       handleLogin={handleLogin}
       handleNameChange={handleNameChange}
       handlePasswordChange={handlePasswordChange} />
     : <div>
       <h2>blogs</h2>
       <p>{user.name} logged in</p><button onClick={handleLogout}>logout</button>
       <BlogForm blogs={blogs}/>
   </div>
   }
   </div>
 )
}
 
export default App
