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
const passport = require('passport');
const {
  router: { beneficiaries },
} = require('../../controllers');
const { Forbidden } = require('../../utils/errors');

/**
 * Routing for beneficiaries endpoints (/v1/beneficiaries)
 */

// GET /v1/beneficiaries
function isLoggedIn(req, res, next) {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    // err === 'user not found' || user === false || user === undefined
    if (err || !user) {
      return next(new Forbidden(' You are forbidden to enter.'));
    }

    return next();
  })(req, res, next);
}

router.get('/', isLoggedIn, beneficiaries.getAll);

// POST /v1/beneficiaries
// router.post('/', beneficiaries.create);

module.exports = router;
