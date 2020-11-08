/* eslint-disable camelcase */
/* eslint-disable no-console */
const { raw } = require('objection');
const { Beneficiary, Referee, Case } = require('../../models');
const {
  errors: { BadRequest },
} = require('../../utils');
/**

/**
 * Retrieve beneficiaries by Name with fuzzy search
 * @param {Request} req
 * @param {Response} res

const getSearch = async (req, res) => {
  console.log(req.url);
  const benresult = await Beneficiary.query()
    .select(raw(`*`))
    .where(
      raw(
        `similarity (':searchBody:', "name" || ' ' || "beneficiaryId" || ' ' || "email") > 0.10`,
        {
          searchBody: req.query.p,
        }
      )
    );
  res.status(200).json({ benresult });
};
 */

const search = async (req, res) => {
  // Step: Extract all query params
  const { q, type, page, per_page, include_entities } = req.query;
  // Step: Choose database based on `type` query param
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
  console.log(include_entities);
  const entities = include_entities ? include_entities.split('&') : [];
  console.log(entities);
  // TODO : create custom join login based on entities.
  // Step: Construct SQL query, basically whatever you need to put into `raw`
  // The query will change based on page, per_page values; look into LIMIT, OFFSET in sql
  // & string interpolation
  const searchBody = searchFields.join(`||`);
  const sqlQuery = `similarity (':searchBody:', ${searchBody}) > 0.08`;
  const limit = parseInt(per_page, 10) || 10;
  const currentPage = parseInt(page, 10) || 1;
  const offset = limit * currentPage - limit;
  // Step: Execute the transaction
  /* select * from beneficiary 
inner join "cases" on beneficiary."benId" = cases."beneficiaryId" 
where similarity ('ziz', "name"|| "email") > 0.08 */
  const results = await model
    .query()
    .select(raw(`*`))
    .where(raw(sqlQuery, { searchBody: q }))
    // ref(`model.name`, `model.organisation`
    .limit(limit)
    .offset(offset);

  if (entities.indexOf('cases') > -1) {
    results.join(`cases`, `beneficiary.benId`, `cases.beneficiaryId`);
    // Cases.id is not included.
  }
  // Step: Envelope the results with paging information
  const response = {
    page: currentPage,
    per_page: limit,
    results,
    // include_entities: entities,
  };
  console.log(per_page);
  return res.status(200).json(response);
};

module.exports = {
  search,
};
