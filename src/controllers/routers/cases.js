/*!
 * OneSG API Server by TL Bootcamp#6 OneSG Team
 * Copyright(c) 2020 TechLadies
 * MIT Licensed
 */

'use strict';

const url = require('url');
const querystring = require('querystring');

const { Case } = require('../../models');

function sanitize(json) {
  const query = json;
  if (json.include_entities) {
    // to make include_entities in the [ ] format for .withGraphFetched, and remove in between spaces
    query.include_entities = `[${json.include_entities.replace(/\s/g, '')}]`;
  }
  if (json.status) {
    query.status = json.status.toUpperCase();
  }
  if (json.applied_on) {
    if (json.applied_on.length !== 8) {
      query.applied_on = '';
    } else {
      const year = json.applied_on.slice(0, 4);
      const month = json.applied_on.slice(4, 6);
      const day = json.applied_on.slice(6, 8);
      const dateString = `${year}-${month}-${day}`;
      console.log(dateString, typeof dateString);
    }
  }
  return query;
}

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
  const parsedQueries = sanitize(
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

  // let results;
  // if (caseStatus === 'ALL') {
  //   results = await Case.query()
  //     .withGraphFetched(parsedQueries.include_entities)
  //     .orderBy(sortField, sortOrder)
  //     .limit(limit)
  //     .offset(offset);
  // } else {
  //   results = await Case.query()
  //     .withGraphFetched(
  //       // '[beneficiary(filterBeneficiaryName), referee(filterRefereeName, filterRefereeOrg)]'
  //       parsedQueries.include_entities
  //     )
  //     .modifiers({
  //       filterBeneficiaryName(builder) {
  //         builder.where('name', 'Ziza');
  //       },
  //     })
  //     .where('caseStatus', caseStatus)
  //     .orderBy(sortField, sortOrder)
  //     .limit(limit)
  //     .offset(offset);
  // }

  // const whereCondition = " 'beneficiary.name', 'Ziza' ";

  const results = await Case.query()
    // .whereRaw('beneficiary.name = ?', 'Ziza')
    .withGraphJoined(parsedQueries.include_entities)
    // .withGraphJoined('[beneficiary(filterBeneficiaryName), referee]')
    // .modifiers({
    //   filterBeneficiaryName(builder) {
    //     builder.where('name', 'Ziza');
    //   },
    // })
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

  let response;
  // if with_paging is true or false, provide a response after results
  if (
    parsedQueries.with_paging === 'true' ||
    parsedQueries.with_paging === 'false'
  ) {
    response = {
      page: currentPage,
      per_page: limit,
      total_records: allCases.length,
      more: results.length >= limit,
    };
  }

  const returnedObj = {
    results,
    response,
  };

  // return cases + pages
  return res.status(200).json(returnedObj);
};

module.exports = {
  getAll,
};
