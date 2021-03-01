import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case 'LIKE':
      const blog = action.data
      const blogToLike = state.find((b) => b.id === blog.id)
      const likedBlog = {
        ...blogToLike,
        likes: blogToLike.likes + 1
      }
      return state
      .map((b) => b.id !== blog.id ? b : likedBlog)
      .sort((b1, b2) => b2.likes - b1.likes)
    case 'REMOVE':
      const { blogId } = action.data
      return state.filter(b => b.id !== blogId)
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'INIT_BLOGS':
      return action.data.sort((blog1, blog2) => blog2.likes - blog1.likes)
    default:
      return state
  }
}

export const like = (liked) => {
  return async dispatch => {
    const likedBlog = {
      ...liked,
      user: liked.user.id,
      likes: liked.likes + 1
    }
    console.log(likedBlog)
    const updatedblog = await blogService.update(likedBlog)
    await dispatch({
      type: 'LIKE',
      data: updatedblog
    })
  }
}

export const remove = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    await dispatch({
      type: 'REMOVE',
      data: { blogId: id }
    })
  }
}

export const createBlog = ({ title, author, url }) => {
  return async dispatch => {
    const blogObject = {
      title: title,
      author: author,
      url: url,
      likes: 0
    }
    const newBlog = await blogService.create(blogObject)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export default blogReducer