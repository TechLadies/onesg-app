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
  router: { cases, comments },
} = require('../../controllers');
const isLoggedIn = require('../isLoggedIn');

/**
 * Routing for cases endpoints (/v1/cases)
 */
// GET /v1/cases
router.get('/', cases.getAll);

// POST /v1/cases
router.post('/', cases.create);

// GET /v1/cases/:id
router.get('/:id', cases.getById);

// PATCH /v1/cases/:id
router.patch('/:id', cases.update);

// GET /v1/cases/:id/comments
router.get('/:id/comments', comments.getCommentsbyCaseId);

// POST /v1/cases/:id/comments
router.post('/:id/comments', isLoggedIn, comments.create);

module.exports = router;
