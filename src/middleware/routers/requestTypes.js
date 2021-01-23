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
  router: { requestTypes },
} = require('../../controllers');

/**
 * Routing for cases endpoints (/v1/cases)
 */
// GET /v1/request-types
router.get('/', requestTypes.getAll);

// POST /v1/request-types
router.post('/', requestTypes.create);

module.exports = router;
