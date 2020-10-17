/*!
 * OneSG API Server by TL Bootcamp#6 OneSG Team
 * Copyright(c) 2020 TechLadies
 * MIT Licensed
 */

/**
 * Module dependencies.
 */
const beneficiariesRoute = require('./beneficiaries')
// const cases = require('./cases');
const authRoute = require('./auth')
const refereesRoute = require('./referees')
const casesRoute = require('./cases')
/**
 * Main server-side router
 * @param {function} app
 */
const routes = (app) => {
  app.get('/v1/healthcheck', function healthcheck(req, res) {
    res.status(200).json({ message: `Everything's A-OK on v1!` })
  })

  app.use('/v1/login', authRoute)
  app.use('/v1/beneficiaries', beneficiariesRoute)
  app.use('/v1/referees', refereesRoute)
  app.use('/v1/cases', casesRoute)
}

module.exports = routes
