/*!
 * OneSG API Server by TL Bootcamp#6 OneSG Team
 * Copyright(c) 2020 TechLadies
 * MIT Licensed
 */

/**
 * Module dependencies.
 */
const BENEFICIARIES = require('./beneficiaries')
// const cases = require('./cases');
const AUTHROUTES = require('./auth')
const REFEREESROUTE = require('./referees')
const CASESROUTE = require('./cases')
/**
 * Main server-side router
 * @param {function} app
 */
const routes = (app) => {
  app.get('/v1/healthcheck', function healthcheck(req, res) {
    res.status(200).json({ message: `Everything's A-OK on v1!` })
  })

  app.use('/v1/login', AUTHROUTES)
  app.use('/v1/beneficiaries', BENEFICIARIES)
  app.use('/v1/referees', REFEREESROUTE)
  app.use('/v1/cases', CASESROUTE)
}

module.exports = routes
