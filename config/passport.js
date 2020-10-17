/* eslint-disable camelcase */
const JwtStrategy = require('passport-jwt').Strategy
const { ExtractJwt } = require('passport-jwt')
const fs = require('fs')
const path = require('path')

const pathToKey = path.join(__dirname, '../src/utils/scripts/id_rsa_pub.pem')
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8')
const { getAdminUser } = require('../src/helpers/auth')

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ['RS256'],
}

module.exports = (passport) => {
  const passportCallbackFn = (jwt_payload, done) => {
    const user = getAdminUser(jwt_payload.sub)
    if (user) {
      return done(null, user)
    }
    return done('user not found', false)
  }

  passport.use(new JwtStrategy(options, passportCallbackFn))
}
