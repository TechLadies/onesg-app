/*!
 * OneSG API Server by TL Bootcamp#6 OneSG Team
 * Copyright(c) 2020 TechLadies
 * MIT Licensed
 */

'use strict';

const beneficiaries = require('./beneficiaries');
const referees = require('./referees');
const cases = require('./cases');

module.exports = {
  beneficiaries,
  referees,
  cases,
};
