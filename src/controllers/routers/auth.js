// Assign JWT token
const { ValidationError, UniqueViolationError } = require('objection');
const { issueJWT } = require('../../utils/auth/passport');
// const { isValidateAdminUser } = require('../../helpers/auth/admin');
const { Staff } = require('../../models');

const {
  errors: { BadRequest, InvalidInput, ResourceNotFound },
} = require('../../utils');

// Validate an existing user and issue a JWT
const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // returns a boolean that is true and therefore is logged in.
    const users = await Staff.query()
      .select('*')
      .where('email', email)
      .where('password', password)
      .where('isAdmin', 'true')
      .returning('email', 'password', 'isAdmin');
    // Return 404, if admin user not found
    if (users.length === 0) {
      return next(new ResourceNotFound(`Admin user not found`));
    }
    if (users.password) {
      return next(new InvalidInput(`Password Incorrect`));
    }
  } catch (err) {
    if (err instanceof ValidationError) {
      return next(new InvalidInput(err.message));
    }
    if (err instanceof UniqueViolationError) {
      return next(new BadRequest(err.nativeError.detail));
    }
    return next();
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
