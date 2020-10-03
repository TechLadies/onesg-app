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
const express = require('express');
// ÷const beneficiariesController???/?


const router = express.Router();

// GET /v1/beneficiaries
router.get('/', function (req, res) {
  res.status(200).json({
    message: 'Handling GET requests to /products',
  });
});

// POST /v1/beneficiaries
// router.post('/', beneficiariesController.create);

module.exports = router;
