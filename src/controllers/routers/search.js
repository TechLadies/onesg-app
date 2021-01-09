const { raw } = require('objection');
const removeResourceId = require('../../helpers/cleandata/removeResourceId');
const { Beneficiary, Referee, Case } = require('../../models');
const {
  errors: { BadRequest },
} = require('../../utils');

const search = async (req, res) => {
  // Extract all query params
  const {
    q,
    type,
    // eslint-disable-next-line camelcase
    with_paging,
    page,
    // eslint-disable-next-line camelcase
    per_page,
    fields,
    // eslint-disable-next-line camelcase
    include_entities,
  } = req.query;
  // Choose database based on `type` query param
  // eslint-disable-next-line camelcase
  const entities = include_entities ? include_entities.split('&') : [];
  let fetchWith;
  let order;
  let model;
  let searchFields;
  if (type === 'beneficiary') {
    model = Beneficiary;
    searchFields = ['beneficiary."name"', 'beneficiary."email"'];

    if (entities.includes('cases')) {
      fetchWith = `cases(caseNumber)`;
      order = `similarity(beneficiary."name", '${q}') DESC`;
    }
    if (entities.includes('referees')) {
      fetchWith = '[referees]';
      order = `similarity(beneficiary."name", '${q}') DESC`;
    }
  } else if (type === 'case') {
    model = Case;
    searchFields = ['"caseNumber"'];

    if (entities.includes('beneficiary')) {
      fetchWith = '[beneficiary]';
      order = `similarity("caseNumber", '${q}') DESC`;
    }

    if (entities.includes('referees')) {
      fetchWith = '[referees]';
      order = `similarity("caseNumber", '${q}') DESC`;
    }
  } else if (type === 'referee') {
    model = Referee;
    searchFields = [
      'referee."name"',
      'referee."email"',
      'referee."organisation"',
    ];
    if (entities.includes('cases')) {
      fetchWith = `cases(caseNumber)`;
      order = `similarity(referee."name", '${q}') DESC`;
    }
    if (entities.includes('beneficiary')) {
      fetchWith = '[beneficiary]';
      order = `similarity(referee."name", '${q}') DESC`;
    }
  } else {
    return res.json(
      new BadRequest(`Valid Type is required: beneficiary, referee or case`)
    );
  }

  // TODO : create custom join login based on entities.
  const searchBody = searchFields.join(`||`);
  const sqlQuery = `similarity (':searchBody:', ${searchBody}) > 0.08`;

  // Setting up params for limit, offset and per_page
  const limit = parseInt(per_page, 10) || 10;
  const currentPage = parseInt(page, 10) || 1;
  const offset = limit * currentPage - limit;

  // Execute the transaction
  let results;
  if (entities.length) {
    // eslint-disable-next-line camelcase
    if (with_paging === 'true') {
      results = await model
        .query()
        .select(raw(`${type}.${fields.split(`,`)}`))
        .withGraphFetched(fetchWith)
        .where(raw(sqlQuery, { searchBody: q }))
        .orderByRaw(order)
        .limit(limit)
        .offset(offset);
    } else {
      results = await model
        .query()
        .select(raw(`${type}.${fields.split(`,`)}`))
        .withGraphFetched(fetchWith)
        .where(raw(sqlQuery, { searchBody: q }))
        .orderByRaw(order);
    }
    // eslint-disable-next-line camelcase
  } else if (with_paging === 'true') {
    results = await model
      .query()
      .select(raw(`${type}.${fields.split(`,`)}`))
      .where(raw(sqlQuery, { searchBody: q }))
      .limit(limit)
      .offset(offset);
  } else {
    results = await model
      .query()
      .select(raw(`${type}.${fields.split(`,`)}`))
      .where(raw(sqlQuery, { searchBody: q }));
  }
  const cleanedResults = results.map(removeResourceId);

  let response;
  // eslint-disable-next-line camelcase
  if (with_paging === 'true') {
    response = {
      page: currentPage,
      per_page: limit,
      more: cleanedResults.length >= limit,
      results: cleanedResults,
      include_entities: entities,
    };
  } else {
    response = {
      page: currentPage,
      results: cleanedResults,
      include_entities: entities,
    };
  }
  return res.status(200).json(response);
};

module.exports = {
  search,
};
