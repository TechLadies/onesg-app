const Utils = require('../utils/utils')

const { getAdminUser } = require('../helpers/auth')

const getAll = (req, res) => {
  res.status(200).json({ data: 'sample GET /v1/admin data :p' })
}

// Validate an existing user and issue a JWT
const login = (req, res) => {
  if (getAdminUser(req.body.email)) {
    const tokenObject = Utils.issueJWT(getAdminUser(req.body.email))

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
}
