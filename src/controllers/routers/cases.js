/*!
 * OneSG API Server by TL Bootcamp#6 OneSG Team
 * Copyright(c) 2020 TechLadies
 * MIT Licensed
 */

'use strict';

// const url = require('url');
// const querystring = require('querystring');

const { Case } = require('../../models');

/**
 * Retrieve all cases
 * @param {Request} req
 * @param {Response} res
 */
const getAll = async (req, res) => {
  //   // to obtain the full url
  //   const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
  //   // to parse the full url to retrieve all query params
  //   const parsedUrl = url.parse(fullUrl);
  //   // to break down into individual query params
  //   const parsedQueries = querystring.parse(parsedUrl.query);

  //   if (parsedQueries.include_entities) {
  //     const includeEntities = parsedQueries.include_entities.split(',');
  //     console.log(includeEntities);
  //   }

  //   console.log(parsedQueries.include_entities);

  const cases = await Case.query();
  // return res.status(200).json({ cases });

  const beneficiary = await cases.$relatedQuery('beneficiary');
  //   const referee = await cases.$relatedQuery('referee');
  //   const requests = await cases.$relatedQuery('request');
  return res.status(200).json({ beneficiary });
};

module.exports = {
  getAll,
};
