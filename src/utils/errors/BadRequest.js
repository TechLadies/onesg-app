/*!
 * OneSG API Server by TL Bootcamp#6 OneSG Team
 * Copyright(c) 2020 TechLadies
 * MIT Licensed
 */

/**
 * Module dependencies
 */
const OpError = require('./OpError');

/**
 * Custom error class for Bad Request (400) errors
 * @param {string} message - custom message from calling function
 */
class BadRequest extends OpError {
  constructor(message) {
    super('BAD_REQUEST', 400, message);
  }
}

module.exports = BadRequest;
