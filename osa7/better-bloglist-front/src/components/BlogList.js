import React from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { like, remove } from '../reducers/blogReducer'

import Notification from '../components/Notification'
import NewBlog from '../components/NewBlog'
import Blog from '../components/Blog'
import Togglable from '../components/Togglable'

const BlogList = (props) => {

  const blogFormRef = React.createRef()

  const byLikes = (b1, b2) => b2.likes - b1.likes

  const handleLike = async (blog) => {
    props.like(blog)
    props.setNotification(`you liked ${blog.title}`)
  }

  const handleRemove = async (blog) => {
    await props.remove(blog.id)
    await props.setNotification(`you removed ${blog.title}`)
  }

  return (
    <div>
      <h2>blogs</h2>
  
      <Notification />

      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <NewBlog />
      </Togglable>
  
      {props.blogs.sort(byLikes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          handleRemove={handleRemove}
          own={props.user.username === blog.user.username}
        />
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  like,
  remove,
  setNotification
}

const ConnectedBlogs = connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogList)

export default ConnectedBlogs
