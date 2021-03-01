import React from 'react'
import blogService from '../services/blogs'
import { useSelector } from 'react-redux'

const Users = (users) => {

  console.log('TOIMI PASKA')
  console.log(users)

  return (
    <div>
      <div>
        <h2>Users</h2>
      </div>
      <div>
        {users.map(user =>
          <div key={user.id}>
            {user.username}
          </div>
        )}
      </div>
    </div>
  )
}

export default Users