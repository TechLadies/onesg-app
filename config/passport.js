/* eslint-disable no-console */
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const fs = require('fs');
const path = require('path');

const pathToKey = `${path.resolve()}/keys/id_rsa_pub.pem`;
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');

const { getAdminUser } = require('../src/helpers/auth/admin');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ['RS256'],
};

module.exports = (passport) => {
  const passportCallbackFn = (jwtPayload, done) => {
    const user = getAdminUser(jwtPayload.sub);
    if (user) {
      return done(null, user);
    }

    return done('user not found', false);
  };

  passport.use(new JwtStrategy(options, passportCallbackFn));
};
