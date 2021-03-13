/*!
 * OneSG API Server by TL Bootcamp#6 OneSG Team
 * Copyright(c) 2020 TechLadies
 * MIT Licensed
 */

'use strict';

const beneficiaries = require('./beneficiaries');
const cases = require('./cases');
const referees = require('./referees');
const staffs = require('./staffs');
const requestTypes = require('./requestTypes');
const search = require('./search');
const comments = require('./comments');
const tags = require('./tags');

module.exports = {
  beneficiaries,
  cases,
  referees,
  staffs,
  requestTypes,
  search,
  comments,
  tags,
};
