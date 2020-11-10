// Assign JWT token
const { issueJWT } = require('../../utils/auth/passport');
const { validateAdminUser } = require('../../helpers/auth/admin');

// Validate an existing user and issue a JWT
const login = (req, res) => {
  const { email, password } = req.body;
  const hasValidCredentials = validateAdminUser(email, password);

  // Return 404, if admin user not found
  if (!hasValidCredentials) {
    return res
      .status(404)
      .json({ message: 'No user found. Please contact admin.' });
  }

  // Only embed email in jwt payload
  const tokenObject = issueJWT({ email });
  return res.status(200).json({
    token: tokenObject.token,
    expiresIn: tokenObject.expires,
  });
};

module.exports = {
  login,
};
