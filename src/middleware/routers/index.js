'use strict';

const express = require('express');
const search = require('./search');
const auth = require('./auth');

const router = express.Router();
const beneficiaries = require('./beneficiaries');
const cases = require('./cases');
const referee = require('./referees');

/**
 * Main server-side router
 * @param {function} app
 */

router.get('/v1/healthcheck', function healthcheck(req, res) {
  res.status(200).json({ message: `Everything's A-OK on v1!` });
});

router.use('/v1/login', auth);
router.use('/v1/beneficiaries', beneficiaries);
router.use('/v1/search', search);
router.use('/v1/cases', cases);
router.use('/v1/referee', referee);

module.exports = router;
