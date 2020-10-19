/*!
 * OneSG API Server by TL Bootcamp#6 OneSG Team
 * Copyright(c) 2020 TechLadies
 * MIT Licensed
 */

const OpError = require('./OpError')
const BadRequest = require('./BadRequest')
const Forbidden = require('./Forbidden')
const ResourceNotFound = require('./ResourceNotFound')

module.exports = {
  OpError,
  BadRequest,
  Forbidden,
  ResourceNotFound,
}
