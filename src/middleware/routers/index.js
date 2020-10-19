/*!
 * OneSG API Server by TL Bootcamp#6 OneSG Team
 * Copyright(c) 2020 TechLadies
 * MIT Licensed
 */

/**
 * Module dependencies.
 */
const express = require('express')

const router = express.Router()

const beneficiaries = require('./beneficiaries')
const referees = require('./referees')
// const cases = require('./cases');

/**
 * Main server-side router
 * @param {function} app
 */

router.use('/v1/healthcheck', (req, res) => {
  res.status(200).json({ message: `Everything's A-OK on v1!` })
})

// app.use('/v1/cases', cases);
router.use('/v1/beneficiaries', beneficiaries)

router.use('/v1/references', referees)

module.exports = router
