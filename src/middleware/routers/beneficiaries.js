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

const { isLoggedIn } = require('../../../src/helpers/auth/admin');
/**
 * Routing for beneficiaries endpoints (/v1/beneficiaries)
 */

// GET /v1/beneficiaries

router.get('/', isLoggedIn, beneficiaries.getAll);

// POST /v1/beneficiaries
// router.post('/', beneficiaries.create);

module.exports = router;
