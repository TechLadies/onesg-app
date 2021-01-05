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
    query.include_entities = `[${json.include_entities.split(',')}]`;
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

  const cases = await Case.query().withGraphFetched(
    parsedQueries.include_entities
  );
  return res.status(200).json({ cases });
};

module.exports = {
  getAll,
};
