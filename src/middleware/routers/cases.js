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

/**
 * Routing for cases endpoints (/v1/cases)
 */
// GET /v1/cases
router.get('/', cases.getAll);

// GET /v1/cases/:id
router.get('/:id', cases.getCase);

// GET /v1/cases/:id/comments
router.get('/:id/comments', comments.getCommentsbyCaseNumber);

// POST /v1/cases
router.post('/', cases.create);

// POST /v1/cases/:id/comments
// router.post('/:id/comments', comments.create);

module.exports = router;
