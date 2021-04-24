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
  router: { requests },
} = require('../../controllers');

/**
 * Routing for requests endpoints (/v1/requests)
 */

// POST /v1/requests
router.post('/', requests.create);

module.exports = router;
