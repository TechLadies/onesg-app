/*!
 * OneSG API Server by TL Bootcamp#6 OneSG Team
 * Copyright(c) 2020 TechLadies
 * MIT Licensed
 */

/**
 * Handlers for beneficiaries endpoints (/v1/beneficiaries)
 */
const jwt = require('jsonwebtoken')

const accessTokenSecret = 'somerandomaccesstoken'

const users = [
  {
    email: 'john',
    password: 'password',
    role: 'admin',
  },
  {
    email: 'anna',
    password: 'password123member',
    role: 'referrer',
  },
]

const getAll = (req, res) => {
  res.status(200).json({ data: 'sample GET /v1/admin data :p' })
}

function login(req, res) {
  const { email, password } = req.body
  const user = users.find((u) => {
    return u.email === email && u.password === password
  })

  if (user) {
    const accessToken = jwt.sign(
      { username: user.username, role: user.role },
      accessTokenSecret
    )
    return res.json({ accessToken })
  }
  return res.status(404).send('No user found.')
}

module.exports = {
  getAll,
  login,
}
