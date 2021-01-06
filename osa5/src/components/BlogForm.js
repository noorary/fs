import React from 'react'
import Blog from './Blog'
 
const BlogForm = ({ blogs, addBlog, newTitle, handleTitleChange, newAuthor, handleAuthorChange, newUrl, handleUrlChange }) => (
  <div>
   <div>
     {blogs.map(blog =>
       <Blog key={blog.id} blog={blog} />
     )}
   </div>
   <div>
     <form onSubmit={addBlog}>
      <div>
        title: <input
        value={newTitle}
        onChange={handleTitleChange} />
      </div>
      <div>
        author: <input
        value={newAuthor}
        onChange={handleAuthorChange} />
      </div>
      <div>
        url: <input
        value={newUrl}
        onChange={handleUrlChange} />
      </div>
        <button type="submit">create</button>
     </form>
   </div>
   </div>
 )
 
 
export default BlogForm