/*!
 * OneSG API Server by TL Bootcamp#6 OneSG Team
 * Copyright(c) 2020 TechLadies
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

'use strict';

const { OpError } = require('../utils').errors;

/**
 * Handles unsupported endpoints and operational errors
 * @param {function} app
 */

// Unsupported endpoints
const errorHandler = (app) => {
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

    const error = {
      id: 'UNIDENTIFIED_ERROR',
      status: 500,
      message: 'Unidentified server error',
    };
    return res.status(500).json(error);
  });
};

module.exports = errorHandler;
