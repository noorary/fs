import axios from 'axios'
const baseUrl = '/api/login'

const login = async (credentials) => {
  console.log(credentials)
  const userCredentials = {
    username: credentials.username.value,
    password: credentials.password.value
  }
  console.log('CREDENTIALS')
  console.log(userCredentials)
  const response = await axios.post(baseUrl, userCredentials)
  console.log(response.data)
  return response.data
}

export default { login }