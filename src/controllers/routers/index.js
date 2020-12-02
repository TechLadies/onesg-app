/*!
 * OneSG API Server by TL Bootcamp#6 OneSG Team
 * Copyright(c) 2020 TechLadies
 * MIT Licensed
 */

'use strict';

const beneficiaries = require('./beneficiaries');
const cases = require('./cases');
const referees = require('./referees');
const requestTypes = require('./requestTypes');

module.exports = {
  beneficiaries,
  cases,
  referees,
  requestTypes,
};
