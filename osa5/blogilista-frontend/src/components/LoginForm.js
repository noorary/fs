import React from 'react'

const LoginForm = ({ username, password, handleLogin, handleNameChange, handlePasswordChange}) => (
    <div>
      <h2>Log in to blog-application</h2>
      <form onSubmit={handleLogin}>
      <div>
        username
        <input
        type="text"
        value={username}
        name="Username"
        onChange={handleNameChange}
      />
    </div>
    <div>
      password
      <input
      type="password"
      value={password}
      name="Password"
      onChange={handlePasswordChange}
      />
    </div>
    <button type="submit">login</button>
  </form>
  </div>
  )

export default LoginForm