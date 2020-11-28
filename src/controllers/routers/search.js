/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
/* eslint-disable camelcase */
const { raw } = require('objection');
const { safeResource } = require('../../helpers/cleandata/removeid');
const { Beneficiary, Referee, Case } = require('../../models');
const {
  errors: { BadRequest },
} = require('../../utils');

const search = async (req, res) => {
  // Extract all query params
  const { q, type, page, per_page, include_entities } = req.query;

  // Choose database based on `type` query param
  let model;
  let searchFields;
  if (type === 'beneficiary') {
    model = Beneficiary;
    searchFields = ['beneficiary."name"', 'beneficiary."email"'];
  } else if (type === 'case') {
    model = Case;
    searchFields = ['"caseId"'];
  } else if (type === 'referee') {
    model = Referee;
    searchFields = [
      'referees."name"',
      'referees."email"',
      'referees."organisation"',
    ];
  } else {
    return res.json(new BadRequest(`Type is missing.`));
  }

  // TODO : create custom join login based on entities.
  const searchBody = searchFields.join(`||`);
  const entities = include_entities ? include_entities.split('&') : [];
  const sqlQuery = `similarity (':searchBody:', ${searchBody}) > 0.08`;
  let joinFrom;
  let joinTable1;
  let joinOn1;
  let joinWith1;
  let joinTable2;
  let joinOn2;
  let joinWith2;
  let order;
  if (type === 'beneficiary' && entities.includes('cases')) {
    joinFrom = 'beneficiary';
    joinTable1 = 'cases';
    joinOn1 = 'beneficiary.beneficiaryId';
    joinWith1 = 'cases.beneficiaryId';
    joinTable2 = 'referees';
    joinOn2 = 'referees.refereeId';
    joinWith2 = 'cases.refereeId';
    order = `similarity(beneficiary."name", '${q}') DESC`;
  }

  if (type === 'referee' && entities.includes('cases')) {
    joinFrom = 'referees';
    joinTable1 = 'cases';
    joinOn1 = 'referees.id';
    joinWith1 = 'cases.id';
    joinTable2 = 'beneficiary';
    joinOn2 = 'beneficiary.beneficiaryId';
    joinWith2 = 'cases.beneficiaryId';
    order = `similarity(referees."name", '${q}') DESC`;
  }
  if (type === 'case' && entities.includes('beneficiary')) {
    joinFrom = 'cases';
    joinTable1 = 'beneficiary';
    joinOn1 = 'beneficiary.beneficiaryId';
    joinWith1 = 'cases.beneficiaryId';
    joinTable2 = 'referees';
    joinOn2 = 'referees.id';
    joinWith2 = 'cases.id';
    order = `similarity("caseId", '${q}') DESC`;
  }

  if (type === 'case' && entities.includes('referees')) {
    joinFrom = 'cases';
    joinTable1 = 'referees';
    joinOn1 = 'referees.id';
    joinWith1 = 'cases.id';
    joinTable2 = 'beneficiary';
    joinOn2 = 'beneficiary.beneficiaryId';
    joinWith2 = 'cases.beneficiaryId';
    order = `similarity("caseId", '${q}') DESC`;
  }

  // Setting up params for limit, offset and per_page
  const limit = parseInt(per_page, 10) || 10;
  const currentPage = parseInt(page, 10) || 1;
  const offset = limit * currentPage - limit;

  // Execute the transaction
  let results;
  if (entities.length) {
    results = await model
      .query()
      .select(raw(`*`))
      .from(joinFrom)
      .innerJoin(joinTable1, joinOn1, `=`, joinWith1)
      .leftJoin(joinTable2, joinOn2, `=`, joinWith2)
      .where(raw(sqlQuery, { searchBody: q }))
      .orderByRaw(order)
      .limit(limit)
      .offset(offset);
  } else {
    results = await model
      .query()
      .select(raw(`*`))
      .where(raw(sqlQuery, { searchBody: q }))
      .limit(limit)
      .offset(offset);
  }

  const cleanedResults = results.map(safeResource);

  // Envelope the results with paging information
  const response = {
    page: currentPage,
    per_page: limit,
    cleanedResults,
    include_entities: entities,
  };
  return res.status(200).json(response);
};

module.exports = {
  search,
};
