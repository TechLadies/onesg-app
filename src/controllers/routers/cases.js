/*!
 * OneSG API Server by TL Bootcamp#6 OneSG Team
 * Copyright(c) 2020 TechLadies
 * MIT Licensed
 */

'use strict';

const {
  DataError,
  ForeignKeyViolationError,
  ValidationError,
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
    cases.caseStatus = json.caseStatus.toUpperCase().trim();
  }
  if (json.pointOfContact) {
    cases.pointOfContact = json.pointOfContact.trim();
  }
  if (json.referenceStatus) {
    cases.referenceStatus = json.referenceStatus.toUpperCase().trim();
  }
  if (json.casePendingReason) {
    cases.casePendingReason = json.casePendingReason.trim();
  }
  if (typeof json.amountRequested === 'string') {
    cases.amountRequested = parseFloat(json.amountRequested);
  }
  if (typeof json.amountGranted === 'string') {
    cases.amountGranted = parseFloat(json.amountGranted);
  }
  if (json.documents) {
    if (json.documents === null || json.documents === '') {
      cases.documents = {};
    }
  }
  if (json.refereeId) {
    cases.refereeId = Number(json.refereeId);
  }
  if (json.beneficiaryId) {
    cases.beneficiaryId = Number(json.beneficiaryId);
  }
  if (json.createdBy) {
    cases.createdBy = Number(json.createdBy);
  }
  if (json.updatedBy) {
    cases.updatedBy = Number(json.updatedBy);
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
    const cases = await Case.query().insertGraph(newCase).returning('caseId');
    return res.status(201).json({ cases });
  } catch (err) {
    // ValidationError based on jsonSchema (eg beneficiaryId or refereeId > 11 characters, createdBy or updatedBy not in int format,
    // amountRequested > amountGranted or casePendingReason is empty/null when caseStatus is pending)
    if (err instanceof ValidationError) {
      return next(new InvalidInput(err.message));
    }

    // DataError for invalid types based on table (eg date format)
    if (err instanceof DataError) {
      if (err.nativeError.routine === 'DateTimeParseError') {
        return next(
          new InvalidInput(
            `${newCase.appliedOn} is not a valid date in YYYY-MM-DD format`
          )
        );
      }
      return next(new InvalidInput(err.message));
    }

    // ForeignKeyViolationError for beneficiaryId or refereeId that are not present
    if (err instanceof ForeignKeyViolationError) {
      if (err.constraint === 'case_beneficiaryid_foreign') {
        return next(
          new BadRequest(
            `Benficiary id ${newCase.beneficiaryId} is not present`
          )
        );
      }
      if (err.constraint === 'case_refereeid_foreign') {
        return next(
          new BadRequest(`Referee id ${newCase.refereeId} is not present`)
        );
      }
    }

    // handles rest of the error
    // from objection's documentation, the structure below should hold
    // if there's need to change, do not send the whole err object as that could lead to disclosing sensitive details; also do not send err.message directly unless the error is of type ValidationError
    return next(err);
  }
};

module.exports = {
  getAll,
  create,
};
