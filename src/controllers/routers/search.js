/* eslint-disable no-console */
const { raw, ref } = require('objection');
const { Beneficiary, Referee, Case } = require('../../models');
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

const search = (req, res) => {
  // Step: Extract all query params
  const { q, type } = req.query;
  // Step: Choose database based on `type` query param
  let model;
  if (type === 'beneficiary') {
    model = Beneficiary;
  } else if (type === 'case') {
    model = Case;
  } else {
    model = Referee;
  }
  // Step: Construct SQL query, basically whatever you need to put into `raw`
  // The query will change based on page, per_page values; look into LIMIT, OFFSET in sql
  // & string interpolationn
  const sqlQuery = `similarity (':searchBody:', "name" || ' ' || "beneficiaryId" || ' ' || "email") > 0.10`;
  const limit = 5;
  const currentPage = parseInt(req.query.page, 10) || 1;
  const offset = limit * currentPage - limit;
  const entities = () => {
    if (req.query.include_entities === true) {
      // const include_entities = Model;
    } else {
      req.query.include_entities = 'none';
    }
  };
  // Step: Execute the transaction
  const results = model
    .query()
    .select(raw(`*`))
    .where(
      raw(sqlQuery, { searchBody: q }),
      ref('model.name', 'model.organisation')
    )
    .limit(limit)
    .offset(offset);

  // Step: Envelope the results with paging information
  const response = {
    page: currentPage,
    perPage: limit,
    results,
    include_entities: entities,
  };
  res.status(200).json(response);
};

module.exports = {
  search,
};
