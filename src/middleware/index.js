/*!
 * OneSG API Server by TL Bootcamp#6 OneSG Team
 * Copyright(c) 2020 TechLadies
 * MIT Licensed
 */

const errorHandler = require('./errorHandler');
const routers = require('./routers');

module.exports = {
  errorHandler,
  routers,
};
