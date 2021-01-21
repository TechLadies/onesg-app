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
 * Sanitize data from client.
 * Call before an insert or an update.
 * @param {Object} json - Unsanitised case
 * @return {Object} cases - Sanitised case
 */

function sanitizedCase(json) {
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
  if (json.amountRequested) {
    if (typeof json.amountRequested === 'string') {
      // if amountRequested is an empty string, set to 0
      if (Number.isNaN(cases.amountRequested)) {
        cases.amountRequested = 0;
      } else {
        cases.amountRequested = parseFloat(json.amountRequested);
      }
    }
  }
  if (json.amountGranted) {
    if (typeof json.amountGranted === 'string') {
      // if amountGranted is an empty string, set to 0
      if (Number.isNaN(cases.amountGranted)) {
        cases.amountGranted = 0;
      } else {
        cases.amountGranted = parseFloat(json.amountGranted);
      }
    }
  }
  if (json.refereeId) {
    cases.refereeId = parseInt(json.refereeId, 10);
  }
  if (json.beneficiaryId) {
    cases.beneficiaryId = parseInt(json.beneficiaryId, 10);
  }
  if (json.createdBy) {
    cases.createdBy = parseInt(json.createdBy, 10);
  }
  if (json.updatedBy) {
    cases.updatedBy = parseInt(json.updatedBy, 10);
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
  const newCase = sanitizedCase(req.body);
  if (newCase.referenceStatus === '') {
    newCase.referenceStatus = 'UNVERIFIED';
  }
  try {
    return await Case.transaction(async (trx) => {
      const cases = await Case.query(trx).insertGraph(newCase).returning('*');
      return res.status(201).json({ cases });
    });
  } catch (err) {
    console.log(err);
    // ValidationError based on jsonSchema (eg refereeId, beneficiaryId, createdBy or updatedBy not in int format,
    // casePendingReason is empty/null when caseStatus is pending)
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

    // ForeignKeyViolationError for beneficiaryId, refereeId, createdBy and updatedBy that are not present
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
      if (err.constraint === 'case_createdby_foreign') {
        return next(
          new BadRequest(`Staff account id ${newCase.createdBy} is not present`)
        );
      }
      if (err.constraint === 'case_updatedby_foreign') {
        return next(
          new BadRequest(`Staff account id ${newCase.updatedBy} is not present`)
        );
      }
      if (err.constraint === 'request_requesttypeid_foreign') {
        return next(new BadRequest(`Request type id is/are invalid`));
      }
    }

    // handles rest of the error
    // from objection's documentation, the structure below should hold
    // if there's need to change, do not send the whole err object as that could lead to disclosing sensitive details; also do not send err.message directly unless the error is of type ValidationError
    return next(new BadRequest(err.nativeError.detail));
  }
};

module.exports = {
  getAll,
  create,
};
