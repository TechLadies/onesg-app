/*!
 * OneSG API Server by TL Bootcamp#6 OneSG Team
 * Copyright(c) 2020 TechLadies
 * MIT Licensed
 */

'use strict';

const beneficiaries = require('./beneficiaries');
<<<<<<< HEAD
const referees = require('./referees');
// const cases = require('./cases');
=======
const cases = require('./cases');
>>>>>>> mapping

const search = require('./search');
const referees = require('./referees');

module.exports = {
  beneficiaries,
<<<<<<< HEAD
  referees,
  // cases,
=======
  search,
<<<<<<< HEAD
>>>>>>> add search
=======
  cases,
  referees,
>>>>>>> mapping
};
