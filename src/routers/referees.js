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
const passport = require('passport')

const { referees } = require('../controllers')

/**
 * Routing for beneficiaries endpoints (/v1/referees)
 */
// GET /v1/referees
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  referees.getAll
)

// POST /v1/beneficiaries
// router.post('/', beneficiaries.create);

module.exports = router
