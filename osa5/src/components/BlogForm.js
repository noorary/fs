import React, { useState } from 'react'

// import blogService from '../services/blogs'

const BlogForm = ({ createBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  // const addBlog = (event) => {
  //   event.preventDefault()
  //   const blogObject = {
  //     title: title,
  //     author: author,
  //     url: url,
  //     likes: 0,
  //     user: user.id
  //   }
  //   blogFormRef.current.toggleVisibility()
  //   blogService.create(blogObject).then(returnedBlog => {
  //     setBlogs(blogs.concat(returnedBlog))
  //     setAuthor('')
  //     setTitle('')
  //     setUrl('')
  //     showNotification(`A new blog ${returnedBlog.title} by ${returnedBlog.author} was added`, 'success')
  //   })
  //     .catch(error => {
  //       showNotification(`Something went wrong and blog was not added, error: ${error}`, 'failure')
  //     })

  // }

  const handleCreateBlog = (event) => {
    event.preventDefault()
    try {
      const blog = {
        title: title,
        author: author,
        url: url,
        likes: 0
      }

      createBlog(blog)
      setAuthor('')
      setTitle('')
      setUrl('')
    } catch (err) {
      console.log(err)
    }
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  return (
    <div>
      <div>
        <h2>create new blog</h2>
      </div>
      <div>
        <form onSubmit={handleCreateBlog}>
          <div>
            title: <input
              id='title'
              value={title}
              onChange={handleTitleChange} />
          </div>
          <div>
            author: <input
              id='author'
              value={author}
              onChange={handleAuthorChange} />
          </div>
          <div>
            url: <input
              id='url'
              value={url}
              onChange={handleUrlChange} />
          </div>
          <button id="add-blog" type="submit">create</button>
        </form>
      </div>
    </div>
  )
}


export default BlogForm