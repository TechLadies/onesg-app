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
  router: { tags },
} = require('../../controllers');

/**
 * Routing for tags endpoints (/v1/tags)
 */
// GET /v1/tags
router.get('/', tags.getAll);

// POST /v1/tags
router.post('/', tags.create);

module.exports = router;
