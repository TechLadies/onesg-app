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
    if (json.referenceStatus === '') {
      cases.referenceStatus = 'UNVERIFIED';
    } else {
      cases.referenceStatus = json.referenceStatus.toUpperCase().trim();
    }
  }
  if (json.casePendingReason) {
    cases.casePendingReason = json.casePendingReason.trim();
  }
  if (json.amountRequested || json.amountRequested === '') {
    if (typeof json.amountRequested === 'string') {
      // if amountRequested is an empty string, set to 0
      if (Number.isNaN(parseFloat(json.amountRequested)) === true) {
        cases.amountRequested = 0;
      } else {
        cases.amountRequested = parseFloat(json.amountRequested);
      }
    }
  }
  if (json.amountGranted || json.amountGranted === '') {
    if (typeof json.amountGranted === 'string') {
      // if amountGranted is an empty string, set to 0
      if (Number.isNaN(cases.amountGranted)) {
        cases.amountGranted = 0;
      } else {
        cases.amountGranted = parseFloat(json.amountGranted);
      }
    }
  }
  if (
    json.refereeId ||
    json.refereeId === '' ||
    json.refereeId === null ||
    json.refereeId === undefined
  ) {
    // if refereeId is not present, null or undefined, remove from req body to default to null
    if (
      json.refereeId === '' ||
      json.refereeId === null ||
      json.refereeId === undefined
    ) {
      delete cases.refereeId;
    } else {
      cases.refereeId = parseInt(json.refereeId, 10);
    }
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
  if (json.include_entities && json.include_entities !== '') {
    const entities = ['beneficiary', 'referee', 'request', 'staff'];
    const queryInput = json.include_entities.replace(/\s/g, '').split(',');
    const array = [];

    // eslint-disable-next-line no-plusplus
    for (let x = 0; x < queryInput.length; x++) {
      if (entities.includes(queryInput[x]) === true) {
        array.push(queryInput[x]);
      }
    }

    const queryArray = array.toString();

    // if staff exists in include_entities
    if (queryArray.includes('staff') === true) {
      // to make include_entities in the [ ] format for .withGraphFetched, and remove in between spaces
      // to remove 'staff' and replace with 'createdby' and 'updatedby'
      query.include_entities = `[${queryArray
        .replace(/\s/g, '')
        .replace(',staff', '')},createdby,updatedby]`;
    } else {
      // to make include_entities in the [ ] format for .withGraphFetched, and remove in between spaces
      query.include_entities = `[${queryArray.replace(/\s/g, '')}]`;
    }
  }

  // to make status uppercase
  if (json.status) {
    query.status = json.status.toUpperCase();
  }

  // to retrieve sort field and sort order
  if (json.sort) {
    const array = json.sort.split(':');

    let sortKey;
    switch (array[0].trim().toLowerCase()) {
      case 'beneficiaryname':
        sortKey = 'beneficiary.name';
        break;
      case 'referencestatus':
        sortKey = 'referenceStatus';
        break;
      case 'refereename':
        sortKey = 'referee.name';
        break;
      case 'refereeorganisation':
        sortKey = 'referee.organisation';
        break;
      case 'poc':
        sortKey = 'poc';
        break;
      case 'appliedon':
        sortKey = 'appliedOn';
        break;
      case 'updatedby':
        sortKey = 'updatedAt';
        break;
      default:
        sortKey = array[0].trim();
    }

    [query.sort_field, query.sort_order] = [sortKey, array[1].trim()];
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
  // if with_paging is true
  if (json.with_paging === 'true') {
    // if page is defined in query param, otherwise default to 1
    if (!json.page || Number.isNaN(parseInt(json.page, 10)) === true) {
      query.page = 1;
    } else {
      query.page = parseInt(json.page, 10);
    }
    // if per_page is defined in query param, otherwise default to 10
    if (!json.per_page || Number.isNaN(parseInt(json.per_page, 10)) === true) {
      query.per_page = 10;
    } else {
      query.per_page = parseInt(json.per_page, 10);
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

  // to set the default values for with_paging, page, per_page and status
  setDefault(parsedQueries);

  const currentPage = parsedQueries.page;
  const limit = parsedQueries.per_page;
  // if offset is undefined, set it to 0
  // const offset = limit * currentPage - limit ? limit * currentPage - limit : 0;

  try {
    const requests = await Case.query()
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
          builder.where(
            'referee.name',
            'like',
            `%${parsedQueries.referee_name}%`
          );
        }
        if (parsedQueries.referee_organisation) {
          builder.where(
            'referee.organisation',
            'like',
            `%${parsedQueries.referee_organisation}%`
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
      .orderBy(parsedQueries.sort_field, parsedQueries.sort_order);

    const totalRecords = requests.length;

    const results =
      parsedQueries.with_paging === 'true'
        ? requests.slice(
            (currentPage - 1) * limit,
            (currentPage - 1) * limit + limit
          )
        : requests;

    let returnedObj;
    if (
      parsedQueries.with_paging === 'true' ||
      parsedQueries.with_paging === 'false'
    ) {
      returnedObj = {
        results,
        page: parsedQueries.with_paging === 'true' ? currentPage : 1,
        per_page: parsedQueries.with_paging === 'true' ? limit : totalRecords,
        total_records: totalRecords,
        more: totalRecords > (currentPage - 1) * limit + results.length,
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

    // if sort field does not exist or empty but with a sort order
    if (err.nativeError.code === '42601' || err.nativeError.code === '42703') {
      return next(
        new InvalidInput(
          `${parsedQueries.sort_field} is not a valid sort field`
        )
      );
    }

    // if beneficiary/referee is not found in include_entities for beneficiary/referee related filters
    if (err.nativeError.code === '42P01') {
      const lastDash = err.message.lastIndexOf('table');
      const message = `${err.message
        .substring(lastDash + 5)
        .trim()} should be included in the include_entities search parameter`;
      return next(new BadRequest(message));
    }

    // handles rest of the error
    // from objection's documentation, the structure below should hold
    // if there's need to change, do not send the whole err object as that could lead to disclosing sensitive details; also do not send err.message directly unless the error is of type ValidationError
    return next(new BadRequest(err.nativeError.detail));
  }
};

/**
 * Create new case
 * @param {Request} req
 * @param {Response} res
 */
const create = async (req, res, next) => {
  const newCase = sanitizedCase(req.body);

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

    // if DBError (error not from objection js), eg fields that are not present
    if (err.nativeError.code === '42703') {
      const lastDash = err.message.lastIndexOf('column');
      const errorMessage = err.message.substring(lastDash + 8);
      // to get the field name that is invalid
      const errorWord = errorMessage.substring(0, errorMessage.indexOf('"'));
      return next(new BadRequest(`${errorWord} is not a valid field`));
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
