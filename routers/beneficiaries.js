/*!
 * OneSG API Server by TL Bootcamp#6 OneSG Team
 * Copyright(c) 2020 TechLadies
 * MIT Licensed
 */

/**
 * Routing for beneficiaries endpoints (/v1/beneficiaries)
 */

/**
 * Module dependencies.
 */
const express = require('express')
const { beneficiariesController } = require('../controllers')

const router = express.Router()

// GET /v1/beneficiaries
router.get('/', beneficiariesController.getAll)

// POST /v1/beneficiaries
// router.post('/', beneficiariesController.create);

module.exports = router
