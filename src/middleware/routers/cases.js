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
const isLoggedIn = require('../isLoggedIn');

const router = express.Router();
const {
  router: { comments },
} = require('../../controllers');

/**
 * Routing for cases endpoints (/v1/cases)
 */

// GET /v1/cases/:id/comments
router.get('/:id/comments', comments.getCommentsbyCaseNumber);

// POST /v1/cases/:id/comments
router.post('/:id/comments', isLoggedIn, comments.create);

module.exports = router;
