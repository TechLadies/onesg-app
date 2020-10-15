const utils = require('../utils/utils')

const users = [
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
function login(req, res) {
  const { email, password } = req.body
  const user = users.find((u) => {
    return u.email === email && u.password === password
  })
  if (user) {
    const tokenObject = utils.issueJWT(user)

    res.status(200).json({
      success: true,
      token: tokenObject.token,
      expiresIn: tokenObject.expires,
    })
  } else {
    res
      .status(401)
      .json({ success: false, msg: 'No user found. Please contact admin.' })
  }
}

/* Register a new user
router.post('/register', function (req, res, next) {
  const saltHash = utils.genPassword(req.body.password)

  const salt = saltHash.salt
  const hash = saltHash.hash

  const newUser = new User({
    username: req.body.username,
    hash: hash,
    salt: salt,
  })

  try {
    newUser.save().then((user) => {
      res.json({ success: true, user: user })
    })
  } catch (err) {
    res.json({ success: false, msg: err })
  }
}) */

module.exports = {
  getAll,
  login,
  users,
}
