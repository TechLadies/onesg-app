/* eslint-disable camelcase */
/* eslint-disable no-console */
const { raw } = require('objection');
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
    searchFields = ['"name"', '"email"'];
  } else if (type === 'case') {
    model = Case;
    searchFields = ['"caseId"'];
  } else if (type === 'referee') {
    model = Referee;
    searchFields = ['"name"', '"refereeId"', '"email"', '"organisation"'];
  } else {
    return res.json(new BadRequest(`Type is missing.`));
  }

  // TODO : create custom join login based on entities.
  const entities = include_entities ? include_entities.split('&') : [];

  // Setting up params for limit, offset and per_page
  const searchBody = searchFields.join(`||`);
  const sqlQuery = `similarity (':searchBody:', ${searchBody}) > 0.08`;
  const limit = parseInt(per_page, 10) || 10;
  const currentPage = parseInt(page, 10) || 1;
  const offset = limit * currentPage - limit;

  // Execute the transaction
  const results = await model
    .query()
    .select(raw(`*`))
    .from('cases')
    .innerJoin(
      `beneficiary`,
      `cases.beneficiaryId`,
      `=`,
      `beneficiary.beneficiaryId`
    )
    .where(raw(sqlQuery, { searchBody: q }))
    .limit(limit)
    .offset(offset);

  console.log(results);
  // if (entities.indexOf('cases') > -1) {
  const caseEntities = await model
    .knex()
    .from('beneficiary')
    .innerJoin(`cases`, `beneficiary.beneficiaryId`, `=`, `cases.beneficiaryId`)
    .select(`cases.caseId`)
    .where(`beneficiary.beneficiaryId`, results[0].beneficiaryId);
  // }

  if (entities.includes('cases')) {
    entities.push(caseEntities[0]);
  }

  // Envelope the results with paging information
  const response = {
    page: currentPage,
    per_page: limit,
    results,
    include_entities: entities,
  };
  return res.status(200).json(response);
};

module.exports = {
  search,
};
