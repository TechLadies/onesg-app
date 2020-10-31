/*!
 * OneSG API Server by TL Bootcamp#6 OneSG Team
 * Copyright(c) 2020 TechLadies
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 */
const express = require('express');

const router = express.Router();
const {
  router: { referees },
} = require('../../controllers');

/**
 * Routing for references endpoints (/v1/references)
 */
// GET /v1/references
router.get('/', referees.getAll);

// POST /v1/references
router.post('/', referees.validate, function catchError(req, res, next) {
  Promise.resolve()
    .then(referees.create(req, res, next))
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
