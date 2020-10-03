/*!
 * OneSG API Server by TL Bootcamp#6 OneSG Team
 * Copyright(c) 2020 TechLadies
 * MIT Licensed
 */

'use strict';

const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  res.status(200).json({ message: 'This is the homepage' });
});

module.exports = router;
