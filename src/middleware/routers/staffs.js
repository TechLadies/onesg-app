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
  router: { staffs },
} = require('../../controllers');

/**
 * Routing for references endpoints (/v1/staffs)
 */
// GET /v1/staffs
router.get('/', staffs.getAll);

module.exports = router;
