import React, { useState, useEffect } from 'react'
import { useDispatch, connect } from 'react-redux'
import {
  Switch, Route, Link
} from 'react-router-dom'
import { setNotification } from './reducers/notificationReducer'
import { setUser, removeUser, initializeUsers } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogReducer'
import useField from './hooks/index'

import Notification from './components/Notification'
import BlogList from './components/BlogList'
import Header from './components/Header'

import loginService from './services/login'
import blogService from './services/blogs'

const NavBar = (props) => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <div>
        <Link style={padding} to='/'>blogs</Link>
        <Link style={padding} to='/users'>users</Link>
      </div>

      <Switch>
        <Route path='/'>
          <BlogList user={props.user}/>
        </Route>
      </Switch>
    </div>
  )
}



const App = (props) => {

  
  const username = useField('text')
  const password = useField('text')

  useEffect(() => {
    props.initializeBlogs()
    props.initializeUsers()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      props.setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try{
      const user = await loginService.login({ username, password })
      console.log(user)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      props.setUser(user)
      props.setNotification('Login successful')
    } catch (exception) {
      props.setNotification('käyttäjätunnus tai salasana virheellinen')
    }


  }
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    props.removeUser()
    window.location.reload()
  }

  if (!props.user) {
    return (
      <div>
        <h2>login to application</h2>

        <Notification />

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              {...username}
            />
          </div>
          <div>
            password
            <input
              {...password}
            />
          </div>
          <button id='login'>login</button>
        </form>
      </div>
    )
  }
  return (
    <div>
      
      <Header />
      <p>
        {props.user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <NavBar />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    notification: state.notification,
    user: state.user
  }
}

const mapDispatchToProps = { setNotification, setUser, removeUser, initializeBlogs, initializeUsers}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)

export default ConnectedApp