/*!
 * OneSG API Server by TL Bootcamp#6 OneSG Team
 * Copyright(c) 2020 TechLadies
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

'use strict';

const express = require('express');

const router = express.Router();
const {
  router: { beneficiaries },
} = require('../../controllers');

const passport = require('passport')

/**
 * Routing for beneficiaries endpoints (/v1/beneficiaries)
 */
// GET /v1/beneficiaries
/* router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.send(beneficiaries.getAll)
  }
) */

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  beneficiaries.getAll
)

// POST /v1/beneficiaries
// router.post('/', beneficiaries.create);

module.exports = router;
