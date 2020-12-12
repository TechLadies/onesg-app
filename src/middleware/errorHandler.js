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
const { ValidationError, UniqueViolationError } = require('objection');
const { BadRequest, InvalidInput } = require('../utils/errors');

const app = express();

const {
  errors: { OpError },
} = require('../utils');

/**
 * Handles unsupported endpoints and operational errors
 * @param {function} app
 */

// Unsupported endpoints
app.use(function pageNotFoundHandler(req, res) {
  const error = {
    id: 'PAGE_NOT_FOUND',
    status: 404,
    message: 'Unsupported Endpoint',
  };
  res.status(404).json(error);
});

// Other operational errors
// eslint-disable-next-line no-unused-vars
app.use(function opErrorHandler(err, req, res, next) {
  if (err instanceof OpError) {
    const { error } = err;
    return res.status(error.statusCode).json(error);
  }

  if (err instanceof ValidationError) {
    return res.json(new InvalidInput(err.message));
  }

  if (err instanceof UniqueViolationError) {
    return res.json(new BadRequest(err.nativeError.detail));
  }

  const error = {
    id: 'UNIDENTIFIED_ERROR',
    status: 500,
    message: 'Unidentified server error',
  };
  return res.status(500).json(error);
});

module.exports = app;
