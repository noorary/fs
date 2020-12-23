import React from 'react'
import Blog from './Blog'
 
const BlogForm = ({ blogs }) => (
   <div>
     {blogs.map(blog =>
       <Blog key={blog.id} blog={blog} />
     )}
   </div>
 )
 
 
export default BlogForm