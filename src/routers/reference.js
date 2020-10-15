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
const { reference } = require('../controllers')

/**
 * Routing for references endpoints (/v1/reference)
 */
// GET /v1/reference
router.get('/', reference.getAll)

// POST /v1/reference/create
router.post('/create', reference.validate, reference.create)

module.exports = router
