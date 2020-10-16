/*!
 * OneSG API Server by TL Bootcamp#6 OneSG Team
 * Copyright(c) 2020 TechLadies
 * MIT Licensed
 */

/**
 * Module dependencies.
 */
const express = require('express')

const router = express.Router()
const { references } = require('../controllers')

/**
 * Routing for references endpoints (/v1/references)
 */
// GET /v1/references
router.get('/', references.getAll)

// POST /v1/references
router.post('/', references.validate, references.create)

module.exports = router
