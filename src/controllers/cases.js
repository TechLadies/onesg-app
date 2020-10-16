/*!
 * OneSG API Server by TL Bootcamp#6 OneSG Team
 * Copyright(c) 2020 TechLadies
 * MIT Licensed
 */
const Utils = require('../utils/utils')
const { Users } = require('./auth')
/**
 * Retrieve all referees
 * @param {Request} req
 * @param {Response} res
 */
const getAll = (req, res) => {
  res.status(200).json({ data: 'sample GET /v1/cases data :p' })
}

// Validate an existing user and issue a JWT
const validate = (req, res) => {
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
  getAll,
  validate,
}
