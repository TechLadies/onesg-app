/*!
 * OneSG API Server by TL Bootcamp#6 OneSG Team
 * Copyright(c) 2020 TechLadies
 * MIT Licensed
 */

'use strict';

const express = require('express');

const router = express.Router();

router.get('/', async (_req, res) => {
  const healthcheck = {
    message: 'Status is 200',
  };
  try {
    res.send(healthcheck);
  } catch (err) {
    healthcheck.message = err;
    res.sendStatus(503)();
  }
});

module.exports = router;
