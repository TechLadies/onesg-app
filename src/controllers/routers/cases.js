/*!
 * OneSG API Server by TL Bootcamp#6 OneSG Team
 * Copyright(c) 2020 TechLadies
 * MIT Licensed
 */

'use strict';

const { Case } = require('../../models');

/**
 * Sanitize data from client. Call before an insert or an update.
 */

/**
 * Retrieve all cases
 * @param {Request} req
 * @param {Response} res
 */
const getAll = async (req, res) => {
  const cases = await Case.query().select();
  return res.status(200).json({ cases });
};

/**
 * Retrieve all cases with joins to beneficiary, referee, staff and request
 * @param {Request} req
 * @param {Response} res
 */
const getJoinedCases = async (req, res) => {
  const cases = await Case.query().select();
  return res.status(200).json({ cases });
};

/**
 * Retrieve cases with combination of selected filters (eg status, ben name, applied on etc)
 * @param {Request} req
 * @param {Response} res
 */
const getFilteredCases = async (req, res) => {
  const cases = await Case.query().select();
  return res.status(200).json({ cases });
};

module.exports = {
  getAll,
  getJoinedCases,
  getFilteredCases,
};
