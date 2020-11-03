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
 * Custom error class for Unprocessable Entity (422) errors related to resources
 * Unsupported endpoints should not use this class
 * @param {string} message - custom message from calling function
 */
class InvalidInput extends OpError {
  constructor(message) {
    super('INVALID_INPUT', 422, message);
  }
}

module.exports = InvalidInput;
