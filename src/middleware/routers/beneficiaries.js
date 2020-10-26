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

const { isNull } = require('../../../config/isNull');

const router = express.Router();
const {
  router: { beneficiaries },
} = require('../../controllers');

/**
 * Routing for beneficiaries endpoints (/v1/beneficiaries)
 */
// GET /v1/beneficiaries
router.get('/', beneficiaries.getAll);

// POST /v1/beneficiaries
router.post(
  '/',
  isNull,
  beneficiaries.validate,
  beneficiaries.update,
  beneficiaries.create
);

module.exports = router;
