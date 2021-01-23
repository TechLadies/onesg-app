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
  router: { cases },
} = require('../../controllers');
const isLoggedIn = require('../isLoggedIn');

const {
  router: { comments },
} = require('../../controllers');

/**
 * Routing for cases endpoints (/v1/cases)
 */
// GET /v1/cases
router.get('/', cases.getAll);

// POST /v1/cases
router.post('/', cases.create);

// GET /v1/cases/:id/comments
router.get('/:id/comments', comments.getCommentsbyCaseNumber);

// POST /v1/cases/:id/comments
router.post('/:id/comments', isLoggedIn, comments.create);

module.exports = router;
