const Utils = require('../utils/utils')

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

const getAll = (req, res) => {
  res.status(200).json({ data: 'sample GET /v1/admin data :p' })
}

// Validate an existing user and issue a JWT
const login = (req, res) => {
  const { email, password } = req.body
  const users = USERS.find(
    (user) => user.email === email && user.password === password
  )
  if (users) {
    const tokenObject = Utils.issueJWT(users)

    res.status(200).json({
      success: true,
      token: tokenObject.token,
      expiresIn: tokenObject.expires,
    })
  } else {
    res
      .status(404)
      .json({ success: false, msg: 'No user found. Please contact admin.' })
  }
}

module.exports = {
  getAll,
  login,
  USERS,
}
