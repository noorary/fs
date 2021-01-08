import React, { useState } from 'react'

const Blog = ({ blog, user, handleLike, handleDelete }) => {
  const [blogInfo, setBlogInfo] = useState(false)

  const blogStyle = {
    borderStyle: 'solid',
    borderWidth: 'medium',
    padding: '4px',
    margin: '5px'

  }

  const DeleteButton = () => {
    if(user.username === blog.user.username) {
      return (
        <button onClick={() => handleDelete(blog)}>remove</button>
      )
    } else {
      return (
        <div></div>
      )
    }
  }

  if(!blogInfo) {
    return (
      <div style={blogStyle}>
      <p>{blog.title} {blog.author} <button onClick={() => setBlogInfo(true)}>view</button></p>
    </div>
    )
  }
  return (
    <div style={blogStyle}>
      <p>{blog.title} {blog.author}</p>
      <p>{blog.url}</p>
      <p>likes {blog.likes}</p>
      <p>{user.username}</p>
      <button onClick={() => handleLike(blog)}>like</button>
      <button onClick={() => setBlogInfo(false)}>hide</button>
      <p><DeleteButton/></p>
    </div>
  )
}


  


export default Blog
