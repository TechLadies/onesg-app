/*!
 * OneSG API Server by TL Bootcamp#6 OneSG Team
 * Copyright(c) 2020 TechLadies
 * MIT Licensed
 */

/**
 * Main server-side router
 * @param {*} app
 */

const beneficiaryRoutes = require('./beneficiaries')
// const caseRoutes = require('./cases');

const adminRoutes = require('./admin')

const routes = (app) => {
  app.get('/v1/healthcheck', function healthcheck(req, res) {
    res.status(200).json({ message: `Everything's A-OK on v1!` })
  })

  app.use('/v1/beneficiaries', beneficiaryRoutes)
  app.use('/v1/auth', adminRoutes)
  // app.use('/v1/cases', caseRoutes);
}

module.exports = routes
