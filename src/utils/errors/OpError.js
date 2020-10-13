/*!
 * OneSG API Server by TL Bootcamp#6 OneSG Team
 * Copyright(c) 2020 TechLadies
 * MIT Licensed
 */

/**
 * Parent class for custom error types
 * @param {string} id - error identifier
 * @param {number} statusCode - corresponding HTTP status code
 * @param {string} message - custom message from calling function
 */
class OpError extends Error {
  constructor(id, statusCode, message) {
    super();
    this.error = {
      id,
      statusCode,
      message,
    };
  }
}

module.exports = OpError;
