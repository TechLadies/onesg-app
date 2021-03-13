/*!
 * OneSG API Server by TL Bootcamp#6 OneSG Team
 * Copyright(c) 2020 TechLadies
 * MIT Licensed
 */

'use strict';

const {
  UniqueViolationError,
  ForeignKeyViolationError,
  ValidationError,
  NotNullViolationError,
} = require('objection');

const { Request } = require('../../models');

const {
  errors: { BadRequest, InvalidInput },
} = require('../../utils');

/**
 * Sanitize data from client.
 * Call before an insert or an update.
 * @param {Object} json - Unsanitised requests
 * @return {Object} requests - Sanitised requests
 */
function sanitizeRequests(json) {
  const requests = json;

  if (json.description) {
    requests.description = json.description.trim();
  }

  if (json.requestTypeId) {
    requests.requestTypeId = parseInt(json.requestTypeId, 10);
  }
  if (json.caseId) {
    requests.caseId = parseInt(json.caseId, 10);
  }
  if (json.fulfilmentType) {
    requests.fulfilmentType = json.fulfilmentType.trim();
  }
  if (json.completedFulfilmentItems) {
    requests.completedFulfilmentItems = json.completedFulfilmentItems
      .trim()
      .split(',');
  }
  if (json.requestStatus === '') {
    requests.requestStatus = 'UNDER_REVIEW';
  } else {
    requests.requestStatus = json.requestStatus.toUpperCase().trim();
  }

  return requests;
}

/**
 * Create new requests
 * @param {Request} req
 * @param {Response} res
 */
const create = async (req, res, next) => {
  const obj = JSON.parse(JSON.stringify(req.body));

  const newRequests = sanitizeRequests(obj);

  try {
    return await Request.transaction(async (trx) => {
      const requests = await Request.query(trx)
        .insertGraph(newRequests)
        .returning('*');
      return res.status(201).json({ requests });
    });
  } catch (err) {
    // ValidationError based on jsonSchema (eg refereeId, beneficiaryId, createdBy or updatedBy not in int format,
    if (err instanceof NotNullViolationError) {
      return next(new InvalidInput(`${err.nativeError.column} cannot be null`));
    }

    if (err instanceof ValidationError) {
      return next(new InvalidInput(err.message));
    }
    // if there are already existing request types
    if (err instanceof UniqueViolationError) {
      return next(new BadRequest(err.nativeError.detail));
    }

    // ForeignKeyViolationError for requesttypeid that is not present
    if (err instanceof ForeignKeyViolationError) {
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
  create,
};
