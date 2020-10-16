const Utils = require('../utils/utils')

const Users = [
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

// Validate an existing user and issue a JWT
const login = (req, res) => {
  const { email, password } = req.body
  const user = Users.find(() => {
    return user.email === email && user.password === password
  })
  if (user) {
    const tokenObject = Utils.issueJWT(user)

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
  login,
  Users,
}
