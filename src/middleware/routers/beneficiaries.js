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
const isLoggedIn = require('../isLoggedIn');

const router = express.Router();

const {
  router: { beneficiaries },
} = require('../../controllers');

/**
 * Routing for beneficiaries endpoints (/v1/beneficiaries)
 */

// GET /v1/beneficiaries
router.get('/', isLoggedIn, beneficiaries.getAll);

// POST /v1/beneficiaries:id
router.post('/', isLoggedIn, beneficiaries.create);

// PATCH /v1/beneficiaries/:id
router.patch('/:id', isLoggedIn, beneficiaries.update);
// GET /v1/beneficiaries/:id
router.get('/:id', beneficiaries.getBeneficiary);

// POST /v1/beneficiaries
// router.post('/', beneficiaries.create);

module.exports = router;
