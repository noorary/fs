import React, {useState} from 'react'

import blogService from '../services/blogs'
 
const BlogForm = ({ showNotification, user, blogs, setBlogs, blogFormRef}) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
 

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url,
      likes: 0,
      user: user.id
    }
    blogFormRef.current.toggleVisibility()
    blogService.create(blogObject).then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      setAuthor('')
      setTitle('')
      setUrl('')
      showNotification(`A new blog ${returnedBlog.title} by ${returnedBlog.author} was added`, 'success')
    })
    .catch(error => {
      showNotification('Something went wrong and blog was not added', 'failure')
    })
 
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
     <form onSubmit={addBlog}>
      <div>
        title: <input
        value={title}
        onChange={handleTitleChange} />
      </div>
      <div>
        author: <input
        value={author}
        onChange={handleAuthorChange} />
      </div>
      <div>
        url: <input
        value={url}
        onChange={handleUrlChange} />
      </div>
        <button type="submit">create</button>
     </form>
   </div>
   </div>
)}
 
 
export default BlogForm