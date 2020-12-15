/*!
 * OneSG API Server by TL Bootcamp#6 OneSG Team
 * Copyright(c) 2020 TechLadies
 * MIT Licensed
 */

'use strict';

const { Case } = require('../../models');
const {
  errors: { ResourceNotFound },
} = require('../../utils');

/**
 * Retrieve all referees
 * @param {Request} req
 * @param {Response} res
 */
const getAll = async (req, res) => {
  const cases = await Case.query().select('*');
  return res.status(200).json({ cases });
};

const getCasebyId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const cases = await Case.query()
      .select('caseId', 'POC', 'amountRequested', 'approval')
      .where('caseId', id)
      .withGraphFetched('[beneficiary, referees]');
    if (cases.length === 0) {
      return next(new ResourceNotFound(`Case ${id} does not exist`));
    }
    return res.status(200).json({ cases });
  } catch (err) {
    return next();
  }
};
module.exports = {
  getAll,
  getCasebyId,
};
