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
const auth = require('./auth');
const beneficiaries = require('./beneficiaries');
const cases = require('./cases');
const referees = require('./referees');

const router = express.Router();

/**
 * Main server-side router
 * @param {function} app
 */

router.get('/v1/healthcheck', function healthcheck(req, res) {
  res.status(200).json({ message: `Everything's A-OK on v1!` });
});

router.use('/v1/login', auth);
router.use('/v1/beneficiaries', beneficiaries);
router.use('/v1/cases', cases);
router.use('/v1/referees', referees);

module.exports = router;
