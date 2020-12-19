/*!
 * OneSG API Server by TL Bootcamp#6 OneSG Team
 * Copyright(c) 2020 TechLadies
 * MIT Licensed
 */

'use strict';

const url = require('url');
const querystring = require('querystring');

const { Case } = require('../../models');

/**
 * Sanitize data from client. Call before an insert or an update.
 */

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
  const parsedQueries = querystring.parse(parsedUrl.query);
  console.log(parsedQueries.include_entities);
  const cases = await Case.query().select();
  return res.status(200).json({ cases });
};

module.exports = {
  getAll,
};
