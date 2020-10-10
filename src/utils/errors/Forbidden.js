/*!
 * OneSG API Server by TL Bootcamp#6 OneSG Team
 * Copyright(c) 2020 TechLadies
 * MIT Licensed
 */

/**
 * Module dependencies
 */
const OpError = require('./OpError')

/**
 * Custom error class for Forbidden (403) errors
 * @param {string} message - custom message from calling function
 */
class Forbidden extends OpError {
  constructor(message) {
    super('FORBIDDEN', 403, message)
  }
}

module.exports = Forbidden
