/*!
 * OneSG API Server by TL Bootcamp#6 OneSG Team
 * Copyright(c) 2020 TechLadies
 * MIT Licensed
 */

'use strict';

const { CheckViolationError, DataError } = require('objection');

const { Case } = require('../../models');

const {
  errors: { BadRequest, InvalidInput },
} = require('../../utils');

/**
 * Sanitize data from client. Call before an insert or an update.
 */
function sanitize(json) {
  const cases = json;
  if (json.requestType) {
    cases.requestType = json.requestType.trim();
  }
  if (json.fulfilment) {
    cases.fulfilment = json.fulfilment.trim();
  }
  if (json.POC) {
    cases.POC = json.POC.trim();
  }
  if (json.description) {
    cases.description = json.description.trim();
  }
  if (json.caseStatus) {
    cases.caseStatus = json.caseStatus.toLowerCase().trim();
  }
  if (json.approval) {
    cases.approval = json.approval.toLowerCase().trim();
  }
  if (json.referenceStatus) {
    cases.approval = json.approval.toLowerCase().trim();
  }
  if (json.amountRequested && typeof json.amountRequested === 'string') {
    cases.amountRequested = parseFloat(json.amountRequested);
  }
  if (json.amountGranted && typeof cases.amountGranted === 'string') {
    cases.amountGranted = parseFloat(json.amountGranted);
  }
  return cases;
}
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
 * Create new case
 * @param {Request} req
 * @param {Response} res
 */
const create = async (req, res, next) => {
  const newCase = sanitize(req.body);
  try {
    const cases = await Case.query().insert(newCase).returning('caseId');
    return res.status(201).json({ cases });
  } catch (err) {
    console.log(err);
    // DataError for invalid types, CheckViolationError for not in enum
    if (err instanceof DataError || CheckViolationError) {
      return next(new InvalidInput(err.message));
    }
    // handles rest of the error
    // from objection's documentation, the structure below should hold
    // if there's need to change, do not send the whole err object as that could lead to disclosing sensitive details; also do not send err.message directly unless the error is of type ValidationError
    return next(new BadRequest(err.message));
  }
};

module.exports = {
  getAll,
  create,
};
