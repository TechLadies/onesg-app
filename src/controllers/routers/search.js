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
  const { q, type, page, per_page } = req.query;
  // Step: Choose database based on `type` query param
  let model;
  let searchFields;
  if (type === 'beneficiary') {
    model = Beneficiary;
    searchFields = ['"name"', '"beneficiaryId"', '"email"'];
  } else if (type === 'case') {
    model = Case;
    searchFields = ['"caseId"'];
  } else if (type === 'referee') {
    model = Referee;
    searchFields = ['"name"', '"refereeId"', '"email"', '"organisation"'];
  } else {
    return res.json(new BadRequest(`Type is missing.`));
  }
  // Step: Construct SQL query, basically whatever you need to put into `raw`
  // The query will change based on page, per_page values; look into LIMIT, OFFSET in sql
  // & string interpolation
  const searchBody = searchFields.join(`||`);
  const sqlQuery = `similarity (':searchBody:', ${searchBody}) > 0.08`;
  const limit = parseInt(per_page, 10) || 10;
  const currentPage = parseInt(page, 10) || 1;
  const offset = limit * currentPage - limit;
  /* const entities = () => {
      if (include_entities === true) {
        // const include_entities = Model;
      } else {
        req.query.include_entities = 'none';
      }
    }; */
  // Step: Execute the transaction
  const results = await model
    .query()
    .select(raw(`*`))
    .where(raw(sqlQuery, { searchBody: q }))
    // ref(`model.name`, `model.organisation`
    .limit(limit)
    .offset(offset);
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
