/*!
 * OneSG API Server by TL Bootcamp#6 OneSG Team
 * Copyright(c) 2020 TechLadies
 * MIT Licensed
 */

const OpError = require('./OpError');
const BadRequest = require('./BadRequest');
const Forbidden = require('./Forbidden');
const ResourceNotFound = require('./ResourceNotFound');
const UnprocessableEntity = require('./UnprocessableEntity');

module.exports = {
  OpError,
  BadRequest,
  Forbidden,
  ResourceNotFound,
  UnprocessableEntity,
};
