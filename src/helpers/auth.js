const USERS = [
  {
    id: 1,
    email: 'john',
    password: 'password',
    role: 'admin',
  },
  {
    id: 2,
    email: 'anna',
    password: 'password123member',
    role: 'referrer',
  },
]

const getAdminUser = (userEmail) => {
  const user = USERS.find((users) => users.email === userEmail)
  return user
}
module.exports = {
  getAdminUser,
}
