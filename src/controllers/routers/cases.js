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
 * Sanitize data from query params.
 * Call before an insert or an update.
 * @param {Object} json - Unsanitised query params
 * @return {Object} query - Sanitised query params
 */
function sanitizedQuery(json) {
  const query = json;
  if (json.include_entities) {
    // if staff exists in include_entities
    if (json.include_entities.search('staff') >= 0) {
      // to make include_entities in the [ ] format for .withGraphFetched, and remove in between spaces
      // to remove 'staff' and replace with 'createdby' and 'updatedby'
      query.include_entities = `[${json.include_entities
        .replace(/\s/g, '')
        .replace('staff', '')}createdby,updatedby]`;
    } else {
      // to make include_entities in the [ ] format for .withGraphFetched, and remove in between spaces
      query.include_entities = `[${json.include_entities.replace(/\s/g, '')}]`;
    }
  }
  // to make status uppercase
  if (json.status) {
    query.status = json.status.toUpperCase();
  }
  // to retrieve sort field and sort order
  if (json.sort) {
    const array = json.sort.split(':');
    [query.sort_field, query.sort_order] = [array[0], array[1]];
  }
  // to check if applied_on is in YYYY-MM-DD format
  if (
    json.applied_on &&
    /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/.test(
      json.applied_on
    ) === true
  ) {
    const year = json.applied_on.slice(0, 4);
    const month = json.applied_on.slice(5, 7);
    const day = json.applied_on.slice(8, 10);
    query.applied_on = `${year}-${month}-${day}`;
  }
  return query;
}

/**
 * Set default values based on query params.
 * Call before an insert or an update.
 * @param {Object} json - Query params without default values
 * @return {Object} query - Query params with default values
 */
function setDefault(json) {
  const query = json;
  // if with_paging is not available or false, set page and per_page to null
  if (!json.with_paging || json.with_paging !== 'true') {
    query.page = null;
    query.per_page = null;
  }
  // if with_paging is true
  else {
    // if page is defined in query param, otherwise default to 1
    if (json.page !== undefined || json.page !== null) {
      query.page = parseInt(json.page, 10);
    } else {
      query.page = 1;
    }
    // if per_page is defined in query param, otherwise default to 10
    if (json.per_page !== undefined || json.per_page !== null) {
      query.per_page = parseInt(json.per_page, 10);
    } else {
      query.per_page = 10;
    }
  }
  // if status is not present, set default to 'ALL'
  if (!json.status) {
    query.status = 'ALL';
  }
  // if sort is not present, set default to arrange id in asc
  if (!json.sort) {
    query.sort_field = 'id';
    query.sort_order = 'asc';
  }
  return query;
}

/**
 * Retrieve all cases
 * @param {Request} req
 * @param {Response} res
 */
const getAll = async (req, res, next) => {
  const parsedQueries = sanitizedQuery(req.query);
  console.log(parsedQueries);

  // to set the default values for with_paging, page, per_page and status
  setDefault(parsedQueries);

  const currentPage = parsedQueries.page;
  const limit = parsedQueries.per_page;
  // if offset is undefined, set it to 0
  const offset = limit * currentPage - limit ? limit * currentPage - limit : 0;

  // to retrieve all cases to find the total number of cases for the response object
  const allCases = await Case.query();
  try {
    const results = await Case.query()
      .withGraphJoined(parsedQueries.include_entities)
      .where((builder) => {
        if (parsedQueries.beneficiary_name) {
          builder.where(
            'beneficiary.name',
            'like',
            `%${parsedQueries.beneficiary_name}%`
          );
        }
        if (parsedQueries.referee_name) {
          builder.where('referee.name', 'like', `%parsedQueries.referee_name%`);
        }
        if (parsedQueries.referee_org) {
          builder.where(
            'referee.organisation',
            'like',
            `%${parsedQueries.referee_org}%`
          );
        }
        if (parsedQueries.status !== 'ALL') {
          builder.where('caseStatus', parsedQueries.status);
        }
        if (parsedQueries.case_number) {
          builder.where('caseNumber', parsedQueries.case_number);
        }
        if (parsedQueries.applied_on) {
          builder.where('appliedOn', parsedQueries.applied_on);
        }
      })
      .orderBy(parsedQueries.sort_field, parsedQueries.sort_order)
      .limit(limit)
      .offset(offset);

    let returnedObj;
    if (
      parsedQueries.with_paging === 'true' ||
      parsedQueries.with_paging === 'false'
    ) {
      returnedObj = {
        results,
        page: currentPage,
        per_page: limit,
        total_records: allCases.length,
        more: results.length >= limit,
      };
    } else {
      returnedObj = {
        results,
      };
    }
    return res.status(200).json(returnedObj);
  } catch (err) {
    if (err instanceof DataError) {
      if (err.nativeError.routine === 'DateTimeParseError') {
        return next(
          new InvalidInput(
            `${parsedQueries.applied_on} is not a valid date in YYYY-MM-DD format`
          )
        );
      }
    }
    // handles rest of the error
    // from objection's documentation, the structure below should hold
    // if there's need to change, do not send the whole err object as that could lead to disclosing sensitive details; also do not send err.message directly unless the error is of type ValidationError
    return next(err.message);
    // return next(new BadRequest(err.nativeError.detail));
  }
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
            `${newCase.applied_on} is not a valid date in YYYY-MM-DD format`
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
