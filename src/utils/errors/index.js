/*!
 * OneSG API Server by TL Bootcamp#6 OneSG Team
 * Copyright(c) 2020 TechLadies
 * MIT Licensed
 */

const OpError = require('./OpError');
const BadRequest = require('./BadRequest');
<<<<<<< HEAD
const Forbidden = require('./Forbidden');
const InvalidInput = require('./InvalidInput');
const ResourceNotFound = require('./ResourceNotFound');
=======
const InvalidInput = require('./InvalidInput');
const UnprocessableEntity = require('./UnprocessableEntity');
>>> cleaned error & change fields to camelcase

module.exports = {
  OpError,
  BadRequest,
<<<<<<< HEAD
  Forbidden,
  ResourceNotFound,
=======
  UnprocessableEntity,
>>> cleaned error & change fields to camelcase
  InvalidInput,
};
