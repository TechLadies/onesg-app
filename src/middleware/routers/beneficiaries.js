/* eslint-disable no-console */
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
const { isNull } = require('../../../config/isNull');

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
router.post('/', isNull, beneficiaries.create);

// PATCH /v1/beneficiaries/:id
router.patch('/:id', beneficiaries.update);

router.delete('/:beneficiaryId', beneficiaries.del);

router.put(
  '/:BeneficiaryId',
  isNull,
  beneficiaries.validate,
  beneficiaries.update
);

router.delete('/:BeneficiaryId', beneficiaries.del);

module.exports = router;
