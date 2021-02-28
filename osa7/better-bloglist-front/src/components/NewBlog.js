import React from 'react'
import { connect } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const NewBlog = (props) => {
  console.log('PROPS')
  console.log(props)

  const handleNewBlog = async (event) => {
    event.preventDefault()

    const title = event.target.title.value
    const author = event.target.author.value
    const url = event.target.url.value

    props.createBlog({
      title, author, url
    })
    props.setNotification(`you added ${title}`)

  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleNewBlog}>
        <div>
          author
          <input
            id='author'
          />
        </div>
        <div>
          title
          <input
            id='title'
          />
        </div>
        <div>
          url
          <input
            id='url'
          />
        </div>
        <button type="submit" id="create">create</button>
      </form>
    </div>
  )
}


const mapDispatchToProps = {
  createBlog,
  setNotification
}

export default connect(
  null,
  mapDispatchToProps
)(NewBlog)