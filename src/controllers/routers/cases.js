/*!
 * OneSG API Server by TL Bootcamp#6 OneSG Team
 * Copyright(c) 2020 TechLadies
 * MIT Licensed
 */

'use strict';

const url = require('url');
const querystring = require('querystring');

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
    // to make include_entities in the [ ] format for .withGraphFetched, and remove in between spaces
    query.include_entities = `[${json.include_entities.replace(/\s/g, '')}]`;
  }
  // to make status uppercase
  if (json.status) {
    query.status = json.status.toUpperCase();
  }
  // to convert applied_on to format YYYY-MM-DD
  if (json.applied_on) {
    if (json.applied_on.length !== 8) {
      query.applied_on = '';
    } else {
      const year = json.applied_on.slice(0, 4);
      const month = json.applied_on.slice(4, 6);
      const day = json.applied_on.slice(6, 8);
      query.applied_on = `${year}-${month}-${day}`;
    }
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
  return query;
}

/**
 * Retrieve all cases
 * @param {Request} req
 * @param {Response} res
 */
const getAll = async (req, res) => {
  // to obtain the full url
  const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
  // to parse the full url to retrieve all query params
  const parsedUrl = url.parse(fullUrl);
  // to break down into individual query params
  // convert from [Object: null prototype] to JSON object
  const parsedQueries = sanitizedQuery(
    JSON.parse(JSON.stringify(querystring.parse(parsedUrl.query)))
  );

  // to set the default values for with_paging, page, per_page and status
  setDefault(parsedQueries);

  const currentPage = parsedQueries.page;
  const limit = parsedQueries.per_page;
  // if offset is undefined, set it to 0
  const offset = limit * currentPage - limit ? limit * currentPage - limit : 0;

  // to retrieve sort field and sort order
  const sortField = parsedQueries.sort.split(':')[0];
  const sortOrder = parsedQueries.sort.split(':')[1];

  // to retrieve case status
  const caseStatus = parsedQueries.status;

  // to retrieve all cases to find the total number of cases for the response object
  const allCases = await Case.query();

  const results = await Case.query()
    .withGraphJoined(parsedQueries.include_entities)
    .where((builder) => {
      if (parsedQueries.beneficiary_name) {
        builder.where('beneficiary.name', parsedQueries.beneficiary_name);
      }
      if (parsedQueries.referee_name) {
        builder.where('referee.name', parsedQueries.referee_name);
      }
      if (parsedQueries.referee_org) {
        builder.where('referee.organisation', parsedQueries.referee_org);
      }
      if (parsedQueries.status !== 'ALL') {
        builder.where('caseStatus', caseStatus);
      }
      if (parsedQueries.case_number) {
        builder.where('caseNumber', parsedQueries.case_number);
      }
      if (parsedQueries.applied_on) {
        builder.where('appliedOn', parsedQueries.applied_on);
      }
    })
    .orderBy(sortField, sortOrder)
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

  // return cases + pages
  return res.status(200).json(returnedObj);
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
