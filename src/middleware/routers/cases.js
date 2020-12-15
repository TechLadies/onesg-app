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
  router: { cases },
} = require('../../controllers');

/**
 * Routing for references endpoints (/v1/referees)
 */
// GET /v1/cases
router.get('/', cases.getAll);

// GET /v1/cases/:id
router.get('/:id', cases.getCasebyId);

module.exports = router;
