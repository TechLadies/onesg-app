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
 * Custom error class for Not Found (400) errors related to resources
 * Unsupported endpoints should not use this class
 * @param {string} message - custom message from calling function
 */
class ResourceNotFound extends OpError {
  constructor(message) {
    super('RESOURCE_NOT_FOUND', 404, message)
  }
}

module.exports = ResourceNotFound
