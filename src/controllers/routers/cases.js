/*!
 * OneSG API Server by TL Bootcamp#6 OneSG Team
 * Copyright(c) 2020 TechLadies
 * MIT Licensed
 */

'use strict';

const {
  CheckViolationError,
  DataError,
  ForeignKeyViolationError,
} = require('objection');

const { Case } = require('../../models');

const {
  errors: { BadRequest, InvalidInput },
} = require('../../utils');

/**
 * Sanitize data from client. Call before an insert or an update.
 */

function sanitize(json) {
  const cases = json;
  if (json.caseStatus) {
    cases.caseStatus = json.caseStatus.toLowerCase().trim();
  }
  if (json.pointOfContact) {
    cases.pointOfContact = json.pointOfContact.trim();
  }
  if (json.referenceStatus) {
    cases.referenceStatus = json.referenceStatus.toLowerCase().trim();
  }
  if (json.casePendingReason) {
    cases.casePendingReason = json.casePendingReason.trim();
  }
  // if (
  //   json.amountRequested &&
  //   Number.isNaN(parseFloat(json.amountRequested)) === false
  // ) {
  //   cases.amountRequested = json.amountRequested.trim();
  // }
  // if (
  //   json.amountGranted &&
  //   Number.isNaN(parseFloat(json.amountGranted)) === false
  // ) {
  //   cases.amountGranted = json.amountGranted.trim();
  // }
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
    // DataError for invalid types
    if (err instanceof DataError) {
      return next(new InvalidInput(err));
    }
    // CheckViolationError for input not in enum
    if (err instanceof CheckViolationError) {
      return next(new InvalidInput(err));
    }
    // ForeignKeyViolationError for beneficiaryId or refereeId that are not present
    if (err instanceof ForeignKeyViolationError) {
      if (err.constraint === 'cases_beneficiaryid_foreign') {
        return next(
          new BadRequest(
            `Benficiary id ${newCase.beneficiaryId} is not present`
          )
        );
      }
      if (err.constraint === 'cases_refereeid_foreign') {
        return next(
          new BadRequest(`Referee id ${newCase.refereeId} is not present`)
        );
      }
    }
    // handles rest of the error
    // from objection's documentation, the structure below should hold
    // if there's need to change, do not send the whole err object as that could lead to disclosing sensitive details; also do not send err.message directly unless the error is of type ValidationError
    console.log(err);
    return next(err);
  }
};

module.exports = {
  getAll,
  create,
};
