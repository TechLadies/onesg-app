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
  errors: { BadRequest, InvalidInput, ResourceNotFound },
} = require('../../utils');

/**
 * Sanitize data from client.
 * Call before an insert or an update.
 * @param {Object} json - Unsanitised case
 * @param {Object} cases - Sanitised case
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
 * Retrieve specific case by id
 * @param {Request} req
 * @param {Response} res
 */
const getCase = async (req, res, next) => {
  const { id } = req.params;
  try {
    const casebyNumber = await Case.query()
      .select(
        'caseNumber',
        'appliedOn',
        'pointOfContact',
        'referenceStatus',
        'casePendingReason',
        'amountRequested',
        'amountGranted',
        'documents',
        'updatedBy',
        'updatedAt'
      )
      .withGraphFetched(
        '[beneficiary(beneficiaryNumber), referees(refereeNumber)]'
      )
      .modifiers({
        beneficiaryNumber(builder) {
          builder.select('beneficiaryNumber');
        },
        refereeNumber(builder) {
          builder.select('refereeNumber');
        },
      })
      .where('caseNumber', id);
    if (casebyNumber.length === 0) {
      return next(new ResourceNotFound(`Case ${id} does not exist`));
    }
    return res.status(200).json({ case: casebyNumber[0] });
  } catch (err) {
    return next();
  }
};

/**
 * Create new case
 * @param {Request} req
 * @param {Response} res
 */
const create = async (req, res, next) => {
  const newCase = sanitize(req.body);
  try {
    return await Case.transaction(async (trx) => {
      const cases = await Case.query(trx).insertGraph(newCase).returning('*');
      return res.status(201).json({ cases });
    });
  } catch (err) {
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
    }

    // handles rest of the error
    // from objection's documentation, the structure below should hold
    // if there's need to change, do not send the whole err object as that could lead to disclosing sensitive details; also do not send err.message directly unless the error is of type ValidationError
    return next(err);
  }
};

module.exports = {
  getAll,
  getCase,
  create,
};
