/* eslint-disable camelcase */
const JwtStrategy = require('passport-jwt').Strategy
const { ExtractJwt } = require('passport-jwt')
const fs = require('fs')
const path = require('path')

const pathToKey = path.join(__dirname, '..', 'id_rsa_pub.pem')
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8')
const { Users } = require('../src/controllers/auth')

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ['RS256'],
}

module.exports = (passport) => {
  const passportCallbackFn = (jwt_payload, done) => {
    // there is email in jwt_payload.sub. we can check what we submitted in the payload in utils which we used in login to issue to user .
    const userfromArray = Users.find((User) => User.email === jwt_payload.sub)
    if (userfromArray) {
      return done(null, userfromArray)
    }
    return done(new Error('user not found'), false)
  }

  passport.use(new JwtStrategy(options, passportCallbackFn))
}
