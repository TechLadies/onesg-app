/*!
 * OneSG API Server by TL Bootcamp#6 OneSG Team
 * Copyright(c) 2020 TechLadies
 * MIT Licensed
 */

'use strict';

const beneficiaries = require('./beneficiaries');
const cases = require('./cases');

const search = require('./search');
const referees = require('./referees');

module.exports = {
  beneficiaries,
  search,
  cases,
  referees,
};
