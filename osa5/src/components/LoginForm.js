import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ username, password, handleLogin, handleNameChange, handlePasswordChange }) => (
  <div>
    <h2>Log in to blog-application</h2>
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={handleNameChange}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={handlePasswordChange}
        />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>
  </div>
)

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleLogin: PropTypes.func.isRequired,
  handleNameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired
}

export default LoginForm