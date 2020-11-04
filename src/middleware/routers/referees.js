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
 * Routing for references endpoints (/v1/referees)
 */
// GET /v1/referees
router.get('/', referees.getAll);

// POST /v1/referees
router.post('/', referees.create);

module.exports = router;
