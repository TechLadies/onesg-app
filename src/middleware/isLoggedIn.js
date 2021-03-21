const passport = require('passport');
const { Forbidden } = require('../utils/errors');

const isLoggedIn = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    // err === 'user not found' || user === false || user === undefined
    if (err || !user) {
      return next(new Forbidden(' You are forbidden to enter.'));
    }
    req.user = user;
    return next();
  })(req, res, next);
};

module.exports = isLoggedIn;
