const storageKey = 'loggedBlogAppUser'

const saveUser = (user) =>
  localStorage.setItem(storageKey, JSON.stringify(user))

const loadUser = async () => {
  const u = await JSON.parse(localStorage.getItem(storageKey))
  return u
}
  

const logoutUser = () =>
  localStorage.removeItem(storageKey)

export default {
  saveUser,
  loadUser,
  logoutUser
}