// Assign JWT token
const { issueJWT } = require('../../utils/auth/passport');
const { isValidateAdminUser } = require('../../helpers/auth/admin');

const {
  errors: { ResourceNotFound },
} = require('../../utils');

// Validate an existing user and issue a JWT
const login = (req, res, next) => {
  const { email, password } = req.body;
  // returns a boolean that is true and therefore is logged in.
  const hasValidCredentials = isValidateAdminUser(email, password);

  // Return 404, if admin user not found !hasValidCredential means false boolean
  if (!hasValidCredentials) {
    return next(new ResourceNotFound(`Admin user not found`));
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
