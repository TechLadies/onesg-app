/*!
 * OneSG API Server by TL Bootcamp#6 OneSG Team
 * Copyright(c) 2020 TechLadies
 * MIT Licensed
 */

const OpError = require('./OpError');
const BadRequest = require('./BadRequest');
const UnprocessableEntity = require('./UnprocessableEntity');

module.exports = {
  OpError,
  BadRequest,
  UnprocessableEntity,
};
